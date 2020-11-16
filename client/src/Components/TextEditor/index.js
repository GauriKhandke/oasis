import React, { useState, useContext, useEffect } from 'react';

// importing Grid from react bootstrap
import { Row, Col, Container } from 'react-bootstrap';

// custom react hook
import UserContext from '../../Context/UserContext';

// components
import API from '../../utils/API';
import FormBtn from '../FormBtn';
import Alert from '../Alert';

//react-draft-wysiwyg
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';


//imported material UI for styles
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

// moment js
import moment from 'moment';

// text editor style
import './react-draft-wysiwyg.css';
import './style.css';


// Material UI styles for calendar
const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	calendarTextField: {
		margin: theme.spacing(1),
		width: '30ch',
	},
	titleTextField: {
		margin: theme.spacing(1),
		width: '70ch',
	},
}));

export default function JournalEntryForm() {
	// Styles of Material UI
	const classes = useStyles();
	// const titleClasses = titleStyles();

	// Converting the date format to yyyy-mm-dd
	const today = moment().format('YYYY MM DD').split(' ').join('-');
	console.log("today's date is : " + today);

	// Initializes text editor with empty content
	let editorContent = EditorState.createEmpty();

	// Initial States
	const [title, setTitle] = useState('');

	//local state of editor which changes when the user enters a content in the Text area
	const [editorState, setEditorState] = useState({
		editorState: editorContent,
	});

	// local state of date which changes when the user changes a date in the calendar
	const [date, setDate] = useState(today);

	// Bootstrap alert for showing success message for create and update entry
	const [error, setError] = useState();

	//Fetching the values of user
	const { userData } = useContext(UserContext);

	// Fetch content for current date if already entered journal entry
	useEffect(() => {
		todayEntryCheck()
	},[]);

	//Fetch the data if the user had already entry with current date
	async function todayEntryCheck() {
		// retrieve a content for current date's journal entry from Database
		const todaysEntry = await API.checkAJournalEntry(
			today,
			userData.user.id
		);

		//validation to check if the user had a entry for currnt date
		if (JSON.stringify(todaysEntry.data) !== '{}') {
			setTitle(todaysEntry.data.title);

			//parsing the content
			const convertedState = convertFromRaw(
				JSON.parse(todaysEntry.data.body)
			);

			// pushing a journal entry to the editorContent
			const editorContent = EditorState.createWithContent(
				convertedState
			);
			// changes the state of the editorState
			setEditorState({ editorState: editorContent });
		}
	}

	// Render the ondateChange when the user is trying to change the date
	const onDateChange = async (event) => {
		// On date change make title and text editor empty
		setTitle('');
		setEditorState({ editorState: EditorState.createEmpty() });

		// Fecthing the date user selected and changes the format of the date
		let dateVal = event.target.value;
		dateVal = dateVal.split(' ').join('-');
		setDate(dateVal);

		//AN API call to backend to check whether there is a journal entry for the date the user entered
		const journalEntryCheck = await API.checkAJournalEntry(
			dateVal,
			userData.user.id
		);

		// If there is entry for selected date
		if (JSON.stringify(journalEntryCheck.data) !== '{}') {
			setTitle(journalEntryCheck.data.title);

			// Applying fetched data on to editor
			const convertedState = convertFromRaw(
				JSON.parse(journalEntryCheck.data.body)
      );
      
     //pushing a journal entry to the editorContent
			const editorContent = EditorState.createWithContent(
				convertedState
			);
			// changes the state of the editorState
			setEditorState({ editorState: editorContent });
		}
	};

	//change local state of editor
	const handleEditorChange = (editorState) => {
		setEditorState({ editorState });
	};

	// Render this function when user clicks on submit
	const handleFormSubmit = async (event) => {
		event.preventDefault();
		//If the user had not entered title and content in text area
		if (title === '' || editorState === '') return;

		//Check to see if user had already submitted the note for the day
		const journalEntryCheck = await API.checkAJournalEntry(
			date,
			userData.user.id
		);

		//Check to see whether the user aready had an entry for that date
		if (JSON.stringify(journalEntryCheck.data) === '{}') {
			// body for creating a journal Entry
			const journalEntry = {
				title: title,
				body: JSON.stringify(
					convertToRaw(
						editorState.editorState.getCurrentContent()
					)
				),
				entryDate: date,
				userId: userData.user.id,
			};

			// Call API to create jounal entry
			const newEntry = await API.createJournalEntry(journalEntry);

			// Success to show if the Journal entry is posted successfully
			if (JSON.stringify(newEntry) !== {}) {
				setError('Journal Entry Created successfully!!');
			}
		} else {
			//body for updating the journal Entry
			const updateEntry = {
				title: title,
				body: JSON.stringify(
					convertToRaw(
						editorState.editorState.getCurrentContent()
					)
				),
			};

			//Fetches the note ID and User Id
			const noteId = journalEntryCheck.data._id;
			const userId = userData.user.id;

			//  API call to update jounal entry if the user had an Entry already for the date
			const updatedEntry = await API.updateOneJournalEntry(
				noteId,
				userId,
				updateEntry
			);

			// show success alert if journal updated successfully
			if (JSON.stringify(updatedEntry) !== {}) {
				setError('Journal Entry Updated!! ');
			}
		}
	};

	// JSX to render the page
	return (
		<div>
			<div className="text-center">
				<h2>Enter your Journal Entry</h2>
			</div>

			<Container fluid="md">
				<div className="borderStyle">
					<Row>
						<Col md={8} s={6}>
							<form
								className={classes.container}
								noValidate
								autoComplete="off"
							>
								{/* Title Field */}
								<TextField
									id="outlined-basic"
									label="Title"
									variant="outlined"
									name="title"
									value={title}
									className={classes.titleTextField}
									onChange={(event) =>
										setTitle(event.target.value)
									}
								/>
							</form>
						</Col>
						<Col md={4} s={6}>
							<form
								className={classes.root}
								noValidate
								autoComplete="off"
							>
								{/* Date Picker */}
								<TextField
									id="date"
									value={date }
									label="Date"
									type="date"
									variant="outlined"
									className={
										classes.calendarTextField
									}
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
						{/* Text Editor */}
						<Editor
							editorState={editorState.editorState}
							onEditorStateChange={handleEditorChange}
							wrapperClassName="wrapper-class"
							editorClassName="editor-class"
							toolbarClassName="toolbar-class"
						/>
					</div>
					<div className="text-center">
						{/* Submit Button */}
						<FormBtn
							// disabled={!title || !body}
							onClick={handleFormSubmit}
						>
							Submit
						</FormBtn>
					</div>
				</div>
				<br />
				{/* Success alert */}
				{error && (
					<Alert
						message={error}
						type="success"
						clearError={() => setError(undefined)}
					/>
				)}
			</Container>
		</div>
	);
}
