import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../Context/UserContext';
import Header from '../Components/Header'

export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem('auth-token', '');
    history.push('/');
  };

  const searchPage = () => {
    history.push('/searchresults');
  };

  return (
    <div>
      {userData.user ? (
        <>
          <button
            className=" btn btn-outline-dark btn-md float-right"
            onClick={searchPage}
          >
            Search 
          </button>
          <button
            className=" btn btn-outline-dark btn-md float-right"
            onClick={logout}
          >
            Logout
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
