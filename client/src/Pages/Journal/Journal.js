import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

// React Hook for User data
import UserContext from '../../Context/UserContext';

// Importing Components
import Header from '../../Components/Header';
import TextEditor from '../../Components/TextEditor';

// Styling
import { Container, Row, Col } from 'react-bootstrap';
import './style.css';

export default function Journal(props) {
	
	//Fetches the user data
	const { userData } = useContext(UserContext);

	// Fetches the noteId from search page if the user wants to edit the Journal Entry
	const editId = props.location.state ? props.location.state.noteId : '';

	return (
		<>
			
			{/* Header component */}
			<Header />
			
			{/* If user is logged in then show journal page */}
			{userData.user ? (
				<>
					<div className="background-img">
						
						{/*Text Editor container */}
						<Container fluid="xs">
							<Row>
								<Col md={2}></Col>
								<Col md={8}>
									
									{/* Journal Entry Text Editor */}
									<TextEditor editId={editId} />
								
								</Col>
								<Col md={2}></Col>
							</Row>
						</Container>
					</div>
				</>
			) : (
				<>
					{/* If the user is not logged in redirect to login page */}
					<h2 className="text-center">
						<Link to="/">Please login</Link>
					</h2>
				</>
			)}
		</>
	);
}
