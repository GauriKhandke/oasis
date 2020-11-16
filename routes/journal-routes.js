const express = require('express');
const router = express.Router();
const journalController = require('../controllers/journal-controller');
const Journal = require('../models');

router
	.route('/')
	.get(journalController.findAllEntries)
	.post(journalController.createEntry);
// Matches with "/api/books/:id"
router
	.route('/:noteId')
	.get(journalController.getOneEntry)
	.put(journalController.updateOneEntry)
	.delete(journalController.removeOneEntry);

router.route('/entrydate/:entryDate').get(journalController.checkJournalEntry);

module.exports = router;
