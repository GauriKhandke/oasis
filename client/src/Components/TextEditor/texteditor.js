import React, { Component, useContext } from 'react';
import userContext from '../../Context/UserContext';
import { Editor } from 'react-draft-wysiwyg';
import { convertFromRaw } from 'draft-js';
import EditorTitle from '../EditorTitle';
import FormBtn from '../FormBtn';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import API from '../../utils/API';

const content = {
	entityMap: {},
	blocks: [
		{
			key: '637gr',
			text: 'Initialized from content state.',
			type: 'unstyled',
			depth: 0,
			inlineStyleRanges: [],
			entityRanges: [],
			data: {},
		},
	],
};

export default class EditorConvertToJSON extends Component {

	constructor(props) {
		super(props);
    const contentState = convertFromRaw(content);
		this.state = {
      title : '',
      contentState,
		};
  }
  
  onTitleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

	onContentStateChange = (contentState) => {
		this.setState({
			contentState,
		});
  };
  
  handleFormSubmit = async (event) =>{
    event.preventDefault();

    const journalEntry = {title: this.state.title, body : this.state.contentState, userId};

  }

	render() {
		const { contentState } = this.state;
		console.log(contentState);
		return (
			<div>
				<h2>Enter your Journal Entry</h2>
				<EditorTitle value = {this.state.title} onChange={this.onTitleChange}/>
				<Editor
					wrapperClassName="demo-wrapper"
					editorClassName="demo-editor"
					onContentStateChange={this.onContentStateChange}
				/>

				<FormBtn onClick = {this.handleFormSubmit} >Submit</FormBtn>

				{/* <textarea
					disabled
					value={JSON.stringify(contentState, null, 4)}
				/> */}
			</div>
		);
	}
}

// disabled={!(formObject.author && formObject.title)}
//                 onClick={handleFormSubmit}
