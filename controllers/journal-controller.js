const db = require("../models");

module.exports = {
    
  findAllEntries: async function(req, res) {
       console.log("User Id :" + req.id);
        db.Journal
          .find({ user: req.id })
          .sort({ date: -1 })
          .then(dbData => res.json(dbData))
          .catch(err => res.status(422).json(err));
      },

      createEntry: function(req, res) {
        const newNote = new Note(req.body);
        newNote.user = req.id;
        db.Journal
          .create(newNote)
          .then(dbData => res.json(dbData))
          .catch(err => res.status(422).json(err));
      },

      getOneEntry: function(req,res){
          db.Journal
          .findOne({ _id: req.params.noteId, user: req.id } )
          .then(dbData => res.json(dbData))
          .catch(err => res.status(422).json(err));
      },

      updateOneEntry : function(req, res) {

        db.Journal
          .findOneAndUpdate({ _id: req.params.noteId, user: req.id } )
          .then(dbData => res.json(dbData))
          .catch(err => res.status(422).json(err));
      },

      removeOneEntry : function(req, res) {
        db.Journal
          .findOneAndDelete({ _id: req.params.noteId ,user: req.id})
          .then(dbData => dbData.remove())
          .then(dbData => res.json(dbData))
          .catch(err => res.status(422).json(err));
      }
  
}

module.exports = router;