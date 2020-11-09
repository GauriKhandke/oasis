const db = require('../models');

module.exports = {
  // Fetching all the journal entries of user
  findAllEntries: function (req, res) {
    console.log('User Id :' + req.body.id);
    db.Journal.find({ userId: req.body.id })
      .sort({ date: -1 })
      .then((dbData) => res.json(dbData))
      .catch((err) => res.status(422).json(err));
  },

  createEntry: function (req, res) {
    const newNote = new db.Journal(req.body);
    // newNote.User = req.user.id;
    db.Journal.create(newNote)
      .then((dbData) => res.json(dbData))
      .catch((err) => res.status(422).json(err));
  },

  getOneEntry: function (req, res) {
    console.log(
      'noteId:' + req.params.noteId + 'userid test : ' + req.query.userId
    );
    //db.Journal.findOne({_id: req.params.noteId, userId: req.body.id })

    db.Journal.findOne({
      $and: [{ _id: req.params.noteId }, { userId: req.query.userId }],
    })
      .then((dbData) => res.json(dbData))
      .catch((err) => res.status(422).json(err));
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

  removeOneEntry: function (req, res) {
    db.Journal.findOneAndDelete({
      _id: req.params.noteId,
      userId: req.query.userId,
    })
      .then((dbData) => dbData.remove())
      .then((dbData) => res.json(dbData))
      .catch((err) => res.status(422).json(err));
  },
};
