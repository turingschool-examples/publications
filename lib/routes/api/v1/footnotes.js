// lib/routes/api/v1/footnotes
const express = require('express');
const router  = express.Router();
const footnotesController = require('../../../controllers/footnotes_controller')

router.get('/', footnotesController.index);
router.post('/', footnotesController.create);

module.exports = router
