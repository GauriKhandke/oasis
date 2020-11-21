import React, { useState, useContext, useEffect } from 'react';

// custom react hook
import UserContext from '../../Context/UserContext';

// components
import API from '../../utils/API';
import FormBtn from '../FormBtn';
import Alert from '../Alert';

//react-draft-wysiwyg
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';

// moment js
import moment from 'moment';
 
// importing Grid from react bootstrap
import { Row, Col, Container, Card } from 'react-bootstrap';

//imported material UI for styles
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

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
		width: '100%',
		paddingLeft: '0',
	    margin: '5',
	},

	titleTextField: {
		width: '70ch',
		paddingRight: '0',
		margin: '5',
	},
}));

export default function JournalEntryForm(props) {
	
	// Styles of Material UI
	const classes = useStyles();

	//Fetching the values of user
	const { userData } = useContext(UserContext);

	// Check to see the the user wants to edit the data from search results page
	const editId = props.editId ? props.editId : '';

	let today;

	// Calendar max Date set to today 
	let maxDate = moment().format('YYYY MM DD').split(' ').join('-');

	// let minDate = moment().subtract(10, 'years').calendar();

	// Initializes text editor with empty content
	let editorContent = EditorState.createEmpty();

	// Initial States
	const [title, setTitle] = useState('');

	//local state of editor which changes when the user enters a content in the Text area
	const [editorState, setEditorState] = useState({
		editorState: editorContent,
	});

	// local state of date which changes when the user changes a date in the calendar
	const [date, setDate] = useState();

	// Bootstrap alert for showing success message for create and update entry
	const [error, setError] = useState();

	// Fetch content for current date if already entered journal entry
	useEffect(() => {
		todayEntryCheck();
	}, []);



	//Fetch the data if the user had already entry with current date
	async function todayEntryCheck() {
		
		// If the user has to edit his entry
		if (editId !== '') {
			
			// From search results edit ,the data which the user likes to edit will be fetched
			const editEntryData = await API.getOneJournalEntry(
				editId,
				userData.user.id
			);

			today = editEntryData.data.entryDate.substring(0, 10);

			// Sets the Date to the user search results edit date
			setDate(today);
		}

		// Fetch the data if the user has an entry already after login
		else {
			
			// Converting the date format to yyyy-mm-dd
			today = moment().format('YYYY MM DD').split(' ').join('-');

			// sets the Date to the current date to fetch the data if the user has an entry already
			setDate(today);
		}

		// Retrieve a content for current date's journal entry from Database
		const todaysEntry = await API.checkAJournalEntry(
			today,
			userData.user.id
		);

		// Validation to check if the user had a entry for currnt date
		if (JSON.stringify(todaysEntry.data) !== '{}') {
			
			//If the user has already an entry for the current date,sets the title to the tile which the user entered
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

		//sets the date onchanging
		setDate(dateVal);

		// An API call to backend to check whether there is a journal entry for the date the user entered
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
			
			// Body for creating a journal Entry
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
			<br />
			<br />
			{/* text editor card */}
			<Card className="shadow z-depth-5 card-border my-2 mx-2">
				<Card.Body>
					<Card.Title>
						<div className="text-center">
							<h2 className= "headingText">Enter your Journal Entry</h2>
						</div>
					</Card.Title>
					<br />
					<Card.Text>
						<Container fluid="md">
							<div>
								<Row>
									<Col md={8} s={6} className="pr-2 mb-2">
										<form
											className={
												classes.container
											}
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
												className={
													classes.titleTextField
												}
												onChange={(event) =>
													setTitle(
														event
															.target
															.value
													)
												}
											/>
										</form>
									</Col>

									<Col md={4} s={6} className="pr-2 mb-2">
										<form
											className={classes.root}
											noValidate
											autoComplete="off"
										>
											{/* Date Picker */}
											<TextField
												id="date"
												value={date}
												label="Date"
												type="date"
												variant="outlined"
												className={
													classes.calendarTextField
												}
												InputProps={{
													inputProps: {
														max: maxDate,
													},
												}}
												onChange={
													onDateChange
												}
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
										editorState={
											editorState.editorState
										}
										onEditorStateChange={
											handleEditorChange
										}
										wrapperClassName="wrapper-class"
										editorClassName="editor-class"
										toolbarClassName="toolbar-class"
									/>
								</div>

								<div className="text-center">
									
									{/* Submit Button */}
									<FormBtn
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
									clearError={() =>
										setError(undefined)
									}
								/>
							)}
						</Container>
					</Card.Text>
				</Card.Body>
			</Card>
		</div>
	);
}
