const express = require('express');
const router = express.Router();
const { checkAdmission } = require('../controllers/check.controller');
const validateDocument = require('../middleware/validateDocument');

router.post('/check', validateDocument, checkAdmission);

module.exports = router;
