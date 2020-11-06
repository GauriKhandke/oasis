import axios from 'axios';

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
  }

};