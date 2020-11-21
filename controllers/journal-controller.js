const db = require('../models');
const mongoose = require('mongoose');

module.exports = {
	
	// Insert new journal entry in database
	createEntry: async (req, res) => {
		try {

			// Create new journal entry
			const newNote = new db.Journal(req.body);

			// Create journal entry in database
			const note = await db.Journal.create(newNote);
			
			// Send back created entry
			return res.json(note);
		} catch (error) {
			res.status(422).json({ msg: 'Error creating Journal Entry' });
		}
	},

	// Get one journal entry by notedId and userId
	getOneEntry: async (req, res) => {
		try {

			// Find one journal entry by notedId and userId
			const findNote = await db.Journal.findOne({
				$and: [
					{ _id: req.params.noteId },
					{ userId: req.query.userId },
				],
			});
			
			// Send found journal entry
			return res.json(findNote);
		} catch (error) {
			res.status(422).json(error);
		}
	},

	// Check Journal entry with entry date and userID
	checkJournalEntry: async (req, res) => {
	
		try {
			
			// Check journal entry by entryDate and userId
			const findNote = await db.Journal.findOne({
				$and: [
					{ entryDate: req.params.entryDate },
					{ userId: req.query.userId },
				],
			});
		
			// If journal entry not found, send empty object
			if (findNote === null) return res.json({});

			// If journal entry is found, send that entry in response
			else return res.json(findNote);
		} catch (error) {
			res.status(422).json(error);
		}
	},

	//update the journal entry If the user would like to update
	updateOneEntry: async (req, res) => {
		try {

			// Find one journal entry by noteId and userId
			const note = await db.Journal.findOne({
				$and: [
					{ _id: req.params.noteId },
					{ userId: req.query.userId },
				],
			});
			
			// update title and body
			note.title = req.body.title;
			note.body = req.body.body;

			//save the updated note in DB
			const updatedNote = await note.save();
			
			// Send back updated entry
			return res.json(updatedNote);
		} catch (error) {
			res.status(422).json(err);
		}
	},

	
	// Deletes the journal entry if the user wants to delete
	removeOneEntry: async (req, res) => {
		try {
			
			// Delete one entry by noteId and userId
			const deletedNote = await db.Journal.findOneAndDelete({
				_id: req.params.noteId,
				userId: req.query.userId,
			});

			//sends back deleted entry
			return res.json(deletedNote);
		} catch (error) {
			res.status(422).json(error);
		}
	},

	// Search journal entries by month and year of that user
	checkSearchedJournalEntries: async (req, res) => {
	
		try {
			
			//  start date of the month to search the entries in a month
			const start = new Date(req.query.year, req.query.month, 1);
			
			// End date of the month to search the entries a month
			let end = new Date(req.query.year, req.query.month, 1);
			    end = new Date(end.setMonth(end.getMonth() + 1));
			 
			// finds users entries in a  searched month
			const searchedEntries = await db.Journal.find({
				
				entryDate: { $gte: start, $lt: end },
				userId: mongoose.Types.ObjectId(req.query.userId),
				
			}).sort({
				entryDate: 1,
			});
			
			// If no entries found, send empty object
			if (searchedEntries === null) return res.json({});
			
			// Send found entries in that month, year
			else return res.json(searchedEntries);
		} catch (error) {
			res.status(422).json(error);
		}
	},
};
