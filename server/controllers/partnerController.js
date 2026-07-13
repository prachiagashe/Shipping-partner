const pool = require('../config/db');

const uploadDocuments = async (req, res) => {
    const partnerId = req.params.partner_id;

    if (!req.files || !req.files['aadhaar_file'] || !req.files['pan_file'] || !req.files['license_file']) {
        return res.status(400).json({ message: 'All documents (Aadhaar, PAN, License) are required.' });
    }

    const aadhaarPath = req.files['aadhaar_file'][0].path.replace(/\\/g, '/');
    const panPath = req.files['pan_file'][0].path.replace(/\\/g, '/');
    const licensePath = req.files['license_file'][0].path.replace(/\\/g, '/');

    try {
        const [result] = await pool.query(
            `INSERT INTO shipping_documents (shipping_partner_id, aadhaar_file, pan_file, license_file) 
             VALUES (?, ?, ?, ?)`,
            [partnerId, aadhaarPath, panPath, licensePath]
        );

        res.status(201).json({ 
            message: 'Documents uploaded successfully',
            document_id: result.insertId
        });
    } catch (error) {
        console.error('Upload documents error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getProfile = async (req, res) => {
    const userId = req.user.id; // from auth middleware

    try {
        // Fetch partner details
        const [partners] = await pool.query('SELECT * FROM shipping_partner_details WHERE user_id = ?', [userId]);
        
        if (partners.length === 0) {
            return res.status(404).json({ message: 'Shipping partner profile not found' });
        }

        const partner = partners[0];

        // Fetch documents
        const [documents] = await pool.query('SELECT * FROM shipping_documents WHERE shipping_partner_id = ?', [partner.id]);

        res.status(200).json({
            partner,
            documents: documents.length > 0 ? documents[0] : null
        });

    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateProfile = async (req, res) => {
    const userId = req.user.id;
    const {
        address, city, state, pincode,
        bank_name, account_number, ifsc_code
    } = req.body;

    try {
        const [result] = await pool.query(
            `UPDATE shipping_partner_details 
             SET address = ?, city = ?, state = ?, pincode = ?, 
                 bank_name = ?, account_number = ?, ifsc_code = ?
             WHERE user_id = ?`,
            [address, city, state, pincode, bank_name, account_number, ifsc_code, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Shipping partner profile not found' });
        }

        // Fetch updated profile
        const [partners] = await pool.query('SELECT * FROM shipping_partner_details WHERE user_id = ?', [userId]);
        
        res.status(200).json({
            message: 'Profile updated successfully',
            partner: partners[0]
        });

    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { uploadDocuments, getProfile, updateProfile };
