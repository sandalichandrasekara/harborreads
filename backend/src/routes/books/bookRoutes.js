const express = require('express');
const router = express.Router();
const searchController = require('../../controllers/searchController');
const previewController = require('../../controllers/previewController');


router.post('/history', searchController.getSearchHistoryByUserId);
router.post('/query', searchController.searchBooks);
router.post('/preview', previewController.previewBooks);


module.exports = router;
