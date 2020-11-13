import axios from 'axios';
// import { findAllEntries } from '../../../controllers/journal-controller';

export default {

  // imported from App.js (check for a valid token)
  checkValidToken: function(token){
    return axios.post('/isValidToken', null, {
        headers: { 'x-auth-token': token } });
  },
  
  // imported from App js (after checking the token is valid,fetching the user information)
  authenticateUser: function(token) {
    return axios.post('/', { headers: { 'x-auth-token': token } });
  },
 
  // imported login page(End Point to pass the user entered information to backend and to check the login validations)
  loginRes : function(loginUser){
      return axios.post('/api/login', loginUser);
  },

  // imported from Signup page(End Point to pass the user signed up info to backend and store it)
  SignUpRes: function(newUser){
      return axios.post('/api/signup', newUser);
  },

  // Journal API calls :

  checkAJournalEntry: function(entryDate, userId){
    console.log("Entry Date : "+entryDate+ " UserId : "+userId);
    return axios.get('/api/notes/entrydate/'+ entryDate, { params : {userId} });
  },

  // API call to fetch all journal entries of logged in user
  findAllJournalEntries : function(userId){
    return axios.get('/api/notes',userId);
  },

  // Create journal entry
  createJournalEntry: function(journalEntry){
    return axios.post('/api/notes', journalEntry);
  },

  // Get one entry by noteId and userId
  getOneJournalEntry : function(noteId, userId){
    return axios.get('/api/notes/' + noteId, { params : {userId} });
  },

  // Update one entry by noteId, userId
  updateOneJournalEntry : function(noteId, userId, updatedEntry){
    return axios.put('/api/notes/'+noteId, updatedEntry, {params : {userId } });
  },

  // updateJournalEntry : function(entryDate, userId){
  //   console.log("Entry Date : "+entryDate+ " UserId : "+userId);
  //   return axios.get('/api/notes/'+ entryDate, { params : {userId} });
  // }

  // Delete one entry by noteId, userId
  removeOneJournalEntry : function(noteId, userId){
    return axios.delete('/api.notes/'+noteId, { params : { userId } } );
  }

};