import React, { useContext, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Header from '../../Components/Header';
import UserContext from '../../Context/UserContext';
import { YearPicker, MonthPicker, DayPicker } from 'react-dropdown-date';
import FormBtn from '../../Components/FormBtn';
// import RecentNotes from '../../Components/RecentNotes';
import TextEditor from '../../Components/TextEditor';
// import SearchBar from '../../Components/SearchBar';
import API from '../../utils/API';
import './style.css';

export default function Journal() {
	//Fetches the user data
	const { userData } = useContext(UserContext);

	// const history = useHistory();

	// //Drop down for Year,Month for the user to fetch the Journal Entries from Search Criteria
	// const [year, setYear] = useState(undefined);
	// const [month, setMonth] = useState(undefined);

	// const handleSearch = async () => {
	// 	console.log('Month: ' + month + ' Year: ' + year);

	// 	const searchedEntries = await API.checkASearchJournalEntry(
	// 		month,
	// 		year,
	// 		userData.user.id
	// 	);

		// console.log('searchedEntries :' + JSON.stringify(searchedEntries));

		// const location = {
		// 	pathname: '/searchresults',
		// 	state: { entries: searchedEntries },
		// };

		// console.log('Location: ' + location);

		// history.push({
		// 	pathname: '/searchresults',
		// 	state: { searchedData: searchedEntries },
		// }); // your data array of objects
	// };

	return (
		<>
			<Header />
			{userData.user ? (
				<>
					{/*Text Editor container */}
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
