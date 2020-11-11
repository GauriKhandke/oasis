import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header';
import UserContext from '../../Context/UserContext';
import Calendario from '../../Components/Calendar';
import RecentNotes from '../../Components/RecentNotes';
import { Input, TextArea, FormBtn } from '../../Components/TextField';
import TextEditor from '../../Components/TextEditor';
import './style.css';

export default function Journal() {
	const { userData } = useContext(UserContext);

	return (
		<>
			<Header />
			{userData.user ? (
				<>
					<Container fluid="xs">
						<Row>
							<Col md={3}>
								<Calendario />
							</Col>

							<Col md={9}>
								<Row>
									<Col md={10}>
										<TextEditor />
										{/* <TextArea /> */}
										{/* <FormBtn /> */}
										{/* <RecentNotes /> */}
									</Col>
								</Row>
							</Col>
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
