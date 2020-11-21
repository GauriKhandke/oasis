const express = require('express');
const router = express.Router();
const journalController = require('../controllers/journal-controller');
const Journal = require('../models');

// '/api/notes' route
router
  .route('/')
  // .get(journalController.findAllEntries)
  .get(journalController.checkSearchedJournalEntries)
  .post(journalController.createEntry);


// Matches with '/api/notes/:noteId'
router
  .route('/:noteId')
  .get(journalController.getOneEntry)
  .put(journalController.updateOneEntry)
  .delete(journalController.removeOneEntry);

// Matches the '/api/entrydate/:entryDate'
router.route('/entrydate/:entryDate').get(journalController.checkJournalEntry);

module.exports = router;
