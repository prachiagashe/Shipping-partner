const express = require('express');
const { uploadDocuments, getProfile, updateProfile } = require('../controllers/partnerController');
const { verifyToken } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

// Upload requires files processing
router.post('/upload/:partner_id', upload.fields([
    { name: 'aadhaar_file', maxCount: 1 },
    { name: 'pan_file', maxCount: 1 },
    { name: 'license_file', maxCount: 1 }
]), uploadDocuments);

// Profile is protected route
router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, updateProfile);

module.exports = router;
