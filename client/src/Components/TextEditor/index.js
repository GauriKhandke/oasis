import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../../Context/UserContext';
import API from '../../utils/API';
import { Editor } from 'react-draft-wysiwyg';
import { convertFromRaw } from 'draft-js';
import Input from '../EditorTitle';
import FormBtn from '../FormBtn';
// import DatePickers from '../DatePicker';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './style.css';
import { Row, Col } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';

//Journal Body object which should be saved in the database
const content = {
	entityMap: {},
	blocks: [
		{
			key: '637gr',
			text: 'Initial Text',
			type: 'unstyled',
			depth: 0,
			inlineStyleRanges: [],
			entityRanges: [],
			data: {},
		},
	],
};

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

export default function EditorConvertToJSON() {
	// Styles of Material UI
	const classes = useStyles();

	// Converting the date format to yyyy-mm-dd
	const today = moment().format('YYYY MM DD').split(' ').join('-');
	console.log("today's date is : " + today);

	// Initial States
	const [title, setTitle] = useState('');
	const [contentState, setContentState] = useState(content);
	const [date, setDate] = useState(today);
	//convertFromRaw(content);
	console.log(contentState);
	//Fetching the values of user
	const { userData } = useContext(UserContext);

	// Render the ondateChange when the user is trying to change the date
	const onDateChange = async (event) => {
		let val = event.target.value;
		val = val.split(' ').join('-');
		console.log('--- date changed: ', val.toString());
		setDate(val);

		const journalEntryCheck = await API.checkAJournalEntry(
			val,
			userData.user.id
		);
		console.log(
			'\n\nJournal Entry Check: ' + JSON.stringify(journalEntryCheck)
		);
		// if (journalEntryCheck.data.length === 0) {
		// setContentState(content);
		// 	setTitle('');
		// } else {
		// console.log(contentState);
		console.log(journalEntryCheck.data);
		setTitle(journalEntryCheck.data.title);
		setContentState(
			convertFromRaw(journalEntryCheck.data.body));
		console.log(journalEntryCheck.data.body);
		// console.log(journalEntryCheck.data.body);
		console.log(contentState);
		//}
	};

	// Render this function when user clicks on submit
	const handleFormSubmit = async (event) => {
		event.preventDefault();

		if (title === '' || contentState.blocks === undefined) return;

		console.log(contentState);
		return;

		// Journal Entry obj
		const journalEntry = {
			title: title,
			body: contentState,
			entryDate: date,
			userId: userData.user.id,
		};

		console.log('\n\nJournal Entry : ' + JSON.stringify(journalEntry));

		// Call API to create jounal entry
		const newEntry = await API.createJournalEntry(journalEntry);
		console.log('\n\nNew Entry: ' + JSON.stringify(newEntry));

		setTitle('');
		setContentState(content);
		console.log(contentState);
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
							onChange={(event) =>
								setTitle(event.target.value)
							}
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

				<Editor
					initialContentState={content}
					wrapperClassName="wrapper-class"
					editorClassName="editor-class"
					toolbarClassName="toolbar-class"
					// contentState={contentState}
					// value={contentState}
					onContentStateChange={(contentState) =>
						setContentState(contentState)
					}
					placeholder="Let's talk about your day here.."
				/>
				<div className="text-center">
					<FormBtn
						// disabled={!title && contentState.length === 0}
						onClick={handleFormSubmit}
					>
						Submit
					</FormBtn>
				</div>
			</div>

			<textarea
				disabled
				value={JSON.stringify(contentState, null, 4)}
			/>
		</div>
	);
}
