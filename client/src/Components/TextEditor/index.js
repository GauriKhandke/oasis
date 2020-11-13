import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../../Context/UserContext';
import API from '../../utils/API';
import Input from '../EditorTitle';
import FormBtn from '../FormBtn';
import Alert from '../../Components/Alert';
import './style.css';
import { Row, Col } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import moment from 'moment';

// Material UI styles

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function JournalEntryForm() {
  // Styles of Material UI
  const classes = useStyles();

  // Converting the date format to yyyy-mm-dd
  const today = moment().format('YYYY MM DD').split(' ').join('-');
  console.log("today's date is : " + today);

  // Initial States
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [date, setDate] = useState(today);
  const [successAlert, setSuccessAlert] = useState();

  //Fetching the values of user
  const { userData } = useContext(UserContext);

  useEffect(() => {
    todayEntryCheck();
  }, []);

  //Fetch the data if the user had already entry with current date
  async function todayEntryCheck() {
    const todaysEntry = await API.checkAJournalEntry(today, userData.user.id);

    console.log('todays Entry : ' + JSON.stringify(todaysEntry));

    if (JSON.stringify(todaysEntry.data) !== '{}') {
      setTitle(todaysEntry.data.title);
      setBody(todaysEntry.data.body);
    }
  }

  // Render the ondateChange when the user is trying to change the date
  const onDateChange = async (event) => {
    setTitle('');
    setBody('');

    let dateVal = event.target.value;
    dateVal = dateVal.split(' ').join('-');
    console.log('--- date changed: ', dateVal.toString());
    setDate(dateVal);

    const journalEntryCheck = await API.checkAJournalEntry(
      dateVal,
      userData.user.id
    );
    console.log(
      '\n\nJournal Entry Check: ' + JSON.stringify(journalEntryCheck)
    );

    setTitle(journalEntryCheck.data.title);
    setBody(journalEntryCheck.data.body);
    console.log('body: ' + body);
  };

  // Render this function when user clicks on submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (title === '' || body === '') return;

    //Check to see if user had already submitted the note for the day
    const journalEntryCheck = await API.checkAJournalEntry(
      date,
      userData.user.id
    );

    console.log(
      '\n\nJournal Entry Check after submit: ' +
        JSON.stringify(journalEntryCheck)
    );

    if (JSON.stringify(journalEntryCheck.data) === '{}') {
      console.log('Test for a empty object');

      // Journal Entry obj
      const journalEntry = {
        title: title,
        body: body,
        entryDate: date,
        userId: userData.user.id,
      };

      // Call API to create jounal entry
      const newEntry = await API.createJournalEntry(journalEntry);
      console.log('\n\nCreate New Entry : ' + JSON.stringify(newEntry));

      if (JSON.stringify(newEntry) !== {}) {
        setSuccessAlert('Journal Entry Created successfully!!');
      }

      setTitle('');
      setBody('');
      console.log('Body: ' + body);
    } else {
      const updateEntry = {
        title: title,
        body: body,
      };

      const noteId = journalEntryCheck.data._id;
      const userId = userData.user.id;
      console.log('Note id for update entry: ' + journalEntryCheck.data._id);

      // Call API to update jounal entry
      const updatedEntry = await API.updateOneJournalEntry(
        noteId,
        userId,
        updateEntry
      );
      console.log('\n\nUpdated Entry : ' + JSON.stringify(updatedEntry));

      if (JSON.stringify(updatedEntry) !== {}) {
        setSuccessAlert('Journal Entry Updated!! ');
      }

      setTitle('');
      setBody('');
      console.log('Body: ' + body);
    }
  };

  // JSX to render the page
  return (
    <div>
      <div className="text-center">
        <h2>Enter your Journal Entry</h2>
      </div>

      <div className="borderStyle">
        {/* <EditorTitle value = {title} name = {title} onChange={(event) => setTitle(event.target.value) }/> */}
        <Row>
          <Col md={8}>
            <Input
              onChange={(event) => setTitle(event.target.value)}
              name="title"
              value={title}
              placeholder="Title"
            />
          </Col>
          <Col md={4}>
            {/* <DatePickers /> */}
            <form className={classes.container} noValidate>
              <TextField
                id="date"
                value={date}
                label="Date"
                type="date"
                variant="outlined"
                // defaultValue={date}
                className={classes.textField}
                onChange={onDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
          </Col>
        </Row>
        <br />

        <div className="form-group">
          <textarea
            className="form-control"
            rows="10"
            cols="100"
            value={body}
            onChange={(event) => setBody(event.target.value)}
          />
        </div>
        <div className="text-center">
          <FormBtn disabled={!title || !body} onClick={handleFormSubmit}>
            Submit
          </FormBtn>
        </div>
      </div>
      <br />
      {successAlert && (
        <Alert
          message={successAlert}
          type="success"
          clearSuccessAlert={() => setSuccessAlert(undefined)}
        />
      )}
    </div>
  );
}
