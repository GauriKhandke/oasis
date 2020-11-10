import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header';
import UserContext from '../../Context/UserContext';
import Calendario from '../../Components/Calendar';
import RecentNotes from '../../Components/RecentNotes';
import { Input, TextArea, FormBtn } from '../../Components/TextField';

export default function Journal() {
  const { userData } = useContext(UserContext);

  return (
    <div>
      <Header />
      {userData.user ? (
        <div>
          <h3>Contact page</h3>
        
        </div>
      ) : (
        <>

          <Link to="/login">Please login</Link>
        </>
      )}
    </div>
  );
}
