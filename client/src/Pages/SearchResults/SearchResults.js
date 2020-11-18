import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../../Components/Header';
import UserContext from '../../Context/UserContext';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { YearPicker, MonthPicker } from 'react-dropdown-date';
import FormBtn from '../../Components/FormBtn';
import API from '../../utils/API';

export default function SearchResults() {
	//Fetches the user data
	const { userData } = useContext(UserContext);

	const history = useHistory();

	//Drop down for Year,Month for the user to fetch the Journal Entries from Search Criteria
	const [year, setYear] = useState(undefined);
	const [month, setMonth] = useState(undefined);
	const [results, setResults] = useState([]);

	console.log('Results: ' + results);

	// console.log("Search results data from journal page: "+history.location.state.searchedData);
	//  searchedEntries;
	const handleSearch = async () => {
		console.log('Month: ' + month + ' Year: ' + year);

		var searchedEntries = await API.checkASearchJournalEntry(
			month,
			year,
			userData.user.id
		);

    setResults(searchedEntries.data);
    console.log("results: " + results);
		console.log('searchedEntries :' + JSON.stringify(searchedEntries));
	};

	const deleteEntry = async (noteId) => {
		console.log('deleteEntry noteId: ' + noteId);
		const deletedEntry = await API.removeOneJournalEntry(
			noteId,
			userData.user.id
		);

		const remainingEntries = results.filter(
			(result) => noteId !== result._id
		);
		setResults(remainingEntries);
		console.log(' Deleted Entry: ' + deletedEntry);
	};

	return (
		<div>
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
								console.log(
									'month : ' + JSON.stringify(month)
								);
							}}
							id={'month'}
							name={'month'}
							classes={
								'classes btn btn-secondary dropdown-toggle ml-2 mr-1 mt-2'
							}
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
								console.log(
									'year : ' + JSON.stringify(year)
								);
							}}
							id={'year'}
							name={'year'}
							classes={
								'classes btn btn-secondary dropdown-toggle mr-1 mt-2'
							}
							optionClasses={'option classes'}
						/>
						<FormBtn onClick={handleSearch}>Search</FormBtn>
					</div>

					<br />

					{/*Search Results container */}
					<Container fluid="xs">
						<Row>
							<Col md={2}></Col>
							<Col md={8}>
								{/* Add search results here */}
								<h1>Search Results</h1>
								<div className="d-flex justify-content-center">
									<Table striped hover>
										<thead>
											<tr>
												<th>Date</th>
												<th>Title</th>
												<th></th>
												<th></th>
											</tr>
										</thead>
										{results.length !==
										0 ? (
											results.map(
												({
													_id,
													title,
													entryDate,
												}) => {
													return (
														<tbody>
															<tr
																key={
																	_id
																}
															>
																<td
																	data-th="Date"
																	className="align-middle"
																>
																	{
																		entryDate
																	}
																</td>

																<td
																	data-th="Title"
																	className="align-middle"
																>
																	{
																		title
																	}
																</td>

																<td className="align-middle">
																	<Button variant="success">
																		Edit
																	</Button>
																</td>

																<td className="align-middle">
																	<Button
																		variant="danger"
																		onClick={() => deleteEntry(
																			_id
															)}
																	>
																		Delete
																	</Button>
																</td>
															</tr>
														</tbody>
													);
												}
											)
										) : (
											<>No results found!</>
										)}
									</Table>
								</div>
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
		</div>
	);
}
