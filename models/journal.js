const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const journalSchema = new Schema({
	// Title of the Journal Entry
	title: {
		type: String,
		trim: true,
		// required:'Journal Title cannot be Empty'
	},

	// Journal body
	body: {
		type: String,
		trim: true,
	},
	
	// Entry date of the journal Entry
	entryDate: {
		type: Date,
		// default: null,
	},

	// Date when entry is created
	date: {
		type: Date,
		default: Date.now(),
	},

	// userID of the journal entry 
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
});

const Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal;
