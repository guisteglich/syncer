const express = require('express');
const controller = require('../controllers/import');

const router = express();

// POST /import -> Run import
router.post('/', controller.run);
// GET /export/{instance} -> List exports by instance
// router.get('/:instance', controller.listByInstance);
// // GET /export/{instance}/{iteration} -> Get S3 download link for export by instance and iteration
// router.get('/:instance/:iteration', controller.getDownloadURLFromInstanceAndIteration);

module.exports = router;
