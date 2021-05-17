const express = require('express');
const controller = require('../controllers/export');

const router = express();

router.post('/', controller.run);
router.get('/:instance', controller.listByInstance);
router.get('/:instance/:iteration', controller.getDownloadURLFromInstanceAndIteration);

module.exports = router;

// POST /export -> Run export
// GET /export/{instance} -> List exports by instance
// GET /export/{instance}/{iteration} -> Get S3 download link for export by instance and iteration