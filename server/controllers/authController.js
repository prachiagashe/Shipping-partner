const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const register = async (req, res) => {
    const { 
        email, mobile, password,
        full_name, address, city, state, pincode,
        aadhaar_number, pan_number, license_number,
        account_holder_name, bank_name, account_number, ifsc_code
    } = req.body;

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        // 1. Check if user exists
        const [existingUsers] = await connection.query(
            'SELECT * FROM users WHERE email = ? OR mobile = ?', 
            [email, mobile]
        );

        if (existingUsers.length > 0) {
            await connection.rollback();
            return res.status(400).json({ message: 'User with email or mobile already exists' });
        }

        // 2. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Insert into users
        const [userResult] = await connection.query(
            'INSERT INTO users (email, mobile, password, role) VALUES (?, ?, ?, ?)',
            [email, mobile, hashedPassword, 'partner']
        );
        
        const userId = userResult.insertId;

        // 4. Insert into shipping_partner_details
        const [partnerResult] = await connection.query(
            `INSERT INTO shipping_partner_details 
            (user_id, full_name, mobile, email, address, city, state, pincode, aadhaar_number, pan_number, license_number, account_holder_name, bank_name, account_number, ifsc_code) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [userId, full_name, mobile, email, address, city, state, pincode, aadhaar_number, pan_number, license_number, account_holder_name, bank_name, account_number, ifsc_code]
        );

        await connection.commit();

        res.status(201).json({ 
            message: 'Registration successful. Proceed to upload documents.',
            partner_id: partnerResult.insertId,
            user_id: userId
        });

    } catch (error) {
        await connection.rollback();
        console.error('Registration error:', error);
        
        if (error.code === 'ER_DUP_ENTRY') {
            // Extract the duplicated value or key from the error message if possible
            // Format is usually: Duplicate entry 'value' for key 'key_name'
            const match = error.sqlMessage.match(/for key '(.+)'/);
            const keyName = match ? match[1] : 'field';
            return res.status(400).json({ message: `The ${keyName} is already registered.` });
        }

        res.status(500).json({ message: 'Internal server error', error: error.message });
    } finally {
        connection.release();
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Fetch full_name from shipping_partner_details
        let full_name = '';
        if (user.role === 'partner') {
            const [partnerDetails] = await pool.query('SELECT full_name FROM shipping_partner_details WHERE user_id = ?', [user.id]);
            if (partnerDetails.length > 0) {
                full_name = partnerDetails[0].full_name;
            }
        }

        res.status(200).json({ 
            message: 'Login successful', 
            token,
            user: { id: user.id, email: user.email, role: user.role, full_name }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { register, login };
