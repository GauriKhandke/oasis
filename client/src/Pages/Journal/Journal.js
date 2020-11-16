import React, { useContext, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header';
import UserContext from '../../Context/UserContext';
import { YearPicker, MonthPicker, DayPicker } from 'react-dropdown-date';
import FormBtn from '../../Components/FormBtn';
// import RecentNotes from '../../Components/RecentNotes';
import TextEditor from '../../Components/TextEditor';
// import SearchBar from '../../Components/SearchBar';
import './style.css';

export default function Journal() {
  //Fetches the user data
  const { userData } = useContext(UserContext);

  //Drop down for Year,Month for the user to fetch the Journal Entries from Search Criteria
  const [year, setYear] = useState(undefined);
  const [month, setMonth] = useState(undefined);

  return (
    <>
      <Header />
      {userData.user ? (
        <>
          <div className="text-right">
            {/* <SearchBar /> */}
            <MonthPicker
              defaultValue={'select month'}
              short // default is full name
              endYearGiven // mandatory if end={} is given in YearPicker
              year={year} // mandatory
              required={true} // default is false
              value={month} // mandatory
              onChange={(month) => {
                setMonth(month);
                console.log('month : ' + JSON.stringify(month));
              }}
              id={'month'}
              name={'month'}
              classes={'classes btn btn-secondary dropdown-toggle ml-2 mr-1 mt-2'}
              optionClasses={'option classes'}
            />

            <YearPicker
              defaultValue={'select year'}
              start={2010} // default is 1900
              end={2030} // default is current year
              reverse // default is ASCENDING
              required={true} // default is false
              value={year} // mandatory
              onChange={(year) => {
                setYear(year);
                console.log('year : ' + JSON.stringify(year));
              }}
              id={'year'}
              name={'year'}
              classes={'classes btn btn-secondary dropdown-toggle mr-1 mt-2'}
              optionClasses={'option classes'}
            />
            <FormBtn
            // onClick={handleFormSubmit}
            >
              Search
            </FormBtn>
          </div>
          <Container fluid="xs">
            <Row>
              <Col md={2}></Col>
              <Col md={8}>
                <TextEditor />
                {/* <RecentNotes /> */}
              </Col>
              <Col md={2}></Col>
            </Row>
          </Container>
        </>
      ) : (
        <>
          <h2 className="text-center">
            <Link to="/login">Please login</Link>
          </h2>
        </>
      )}
    </>
  );
}
