import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../../Context/UserContext';
import API from '../../utils/API';
import { Editor } from 'react-draft-wysiwyg';
import { contentState, convertFromRaw } from 'draft-js';
import Input from '../EditorTitle';
import FormBtn from '../FormBtn';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './style.css';

const content = {
	entityMap: {},
	blocks: [
		{
			key: '637gr',
			text: '',
			type: 'unstyled',
			depth: 0,
			inlineStyleRanges: [],
			entityRanges: [],
			data: {},
		},
	],
};

export default function EditorConvertToJSON() {
	const [title, setTitle] = useState('');
	const [contentState, setContentState] = useState(content);
//convertFromRaw(content);

  const { userData } = useContext(UserContext);
  

	const handleFormSubmit = async (event) => {
		 event.preventDefault();

		if (title === '' || contentState.blocks === undefined) return;

		const journalEntry = {
			title: title,
			body: contentState,
			userId: userData.user.id,
		};

		console.log('\n\nJournal Entry : ' + JSON.stringify(journalEntry));

		const newEntry = await API.createJournalEntry(journalEntry);
		console.log('\n\nNew Entry: ' + JSON.stringify(newEntry));
		setTitle('');
		setContentState(content);
		console.log(contentState);
	};

	return (
		<div>
			<div className="text-center">
				<h2>Enter your Journal Entry</h2>
			</div>
			<div className="borderStyle">
				{/* <EditorTitle value = {title} name = {title} onChange={(event) => setTitle(event.target.value) }/> */}
				<Input
					onChange={(event) => setTitle(event.target.value)}
					name="title"
					value={title}
					placeholder="Title"
				/>

				<Editor
					initialContentState={content}
					wrapperClassName="demo-wrapper"
					editorClassName="demo-editor"
					// contentState={contentState}
					// value={contentState}
					onContentStateChange={(contentState) =>
						setContentState(contentState)
					}
					placeholder="   Let's talk about your day here.."
				/>
				<div className="text-center">
					<FormBtn
						disabled={!title && contentState.length === 0}
						onClick={handleFormSubmit}
					>
						Submit
					</FormBtn>
				</div>
			</div>

			<textarea
				disabled
				value={JSON.stringify(contentState, null, 10)}
			/>
		</div>
	);
}
