import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../Context/UserContext';

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

  return (
    <div>
      {userData.user ? (
        <>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
