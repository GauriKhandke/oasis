const db = require('../models');
const mongoose = require('mongoose');

module.exports = {
  //Fetching all the journal entries of user
  // findAllEntries: async (req, res) => {
  //   try {
  //     console.log('User ID : ' + req.body.id);
  //     const allEntries = await db.Journal.find({
  //       userId: req.body.id,
  //     });
  //     return res.json(allEntries);
  //   } catch (error) {
  //     res.status(422).json(error);
  //   }
  // },""

  // Insert new journal entry in database
  createEntry: async (req, res) => {
    try {
      console.log('user info' + JSON.stringify(req.body));
      const newNote = new db.Journal(req.body);
      console.log('New Note : ' + JSON.stringify(newNote));
      const note = await db.Journal.create(newNote);
      console.log('Saved Note: ' + JSON.stringify(note));
      return res.json(note);
    } catch (error) {
      console.log('Create Entry Error: ' + error);
      res.status(422).json({ msg: 'Error creating Journal Entry' });
    }
  },

  getOneEntry: async (req, res) => {
    console.log(
      'noteId:' + req.params.noteId + 'userid test : ' + req.query.userId
    );
    try {
      const findNote = await db.Journal.findOne({
        $and: [{ _id: req.params.noteId }, { userId: req.query.userId }],
      });
      return res.json(findNote);
    } catch (error) {
      res.status(422).json(error);
    }
  },

  checkJournalEntry: async (req, res) => {
    console.log(
      'Entry date:' + req.params.entryDate + 'userid test : ' + req.query.userId
    );
    try {
      const findNote = await db.Journal.findOne({
        $and: [
          { entryDate: req.params.entryDate },
          { userId: req.query.userId },
        ],
      });
      console.log(
        '\n\nFind Note in checkJournalEntry: ' + JSON.stringify(findNote)
      );

      if (findNote === null) return res.json({});
      else return res.json(findNote);
    } catch (error) {
      res.status(422).json(error);
    }
  },

  updateOneEntry: async (req, res) => {
    console.log('title :' + req.body.title + 'body :' + req.body.body);
    try {
      const note = await db.Journal.findOne({
        $and: [{ _id: req.params.noteId }, { userId: req.query.userId }],
      });
      note.title = req.body.title;
      note.body = req.body.body;
      const updatedNote = await note.save();
      return res.json(updatedNote);
    } catch (error) {
      res.status(422).json(err);
    }
  },

  removeOneEntry: async (req, res) => {
    try {
      const deletedNote = await db.Journal.findOneAndDelete({
        _id: req.params.noteId,
        userId: req.query.userId,
      });
      // const deletedNote = await note.remove();
      return res.json(deletedNote);
    } catch (error) {
      res.status(422).json(error);
    }
  },

  checkSearchedJournalEntries: async (req, res) => {

	console.log("body request : " + JSON.stringify(req.body));
    console.log(
      'Month:' +
        req.query.month +
        'Year: ' +
        req.query.year +
        ' userId: ' +
        req.query.userId
    );

    try {
	  const monthAdjustment = req.query.month - 1;
    
    console.log("monthAdjustment : " + monthAdjustment);
    
    const start = new Date(req.query.year,monthAdjustment, 1);
    
    let end = new Date(req.query.year, monthAdjustment, 1);
	  end = new Date(end.setMonth(end.getMonth() + 1));
    
    const searchedEntries = await db.Journal.find(
        {
          entryDate: { $gte: start, $lt: end },
         userId: mongoose.Types.ObjectId(req.query.userId)
        },
      );
      console.log(
        '\n\nSearched Entry in checkSearchedJournalEntries: ' +
          JSON.stringify(searchedEntries)
    );
    
	  console.log("start : " + start);
	   console.log('End : ' + end);

      if (searchedEntries === null) return res.json({});
      else return res.json(searchedEntries);
      
    } catch (error) {
      console.log('error:' + error);
      res.status(422).json(error);
    }
  },
};
