import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../../Components/Header';
import UserContext from '../../Context/UserContext';
import draftToHtml from 'draftjs-to-html';
import '../../Components/TextEditor/react-draft-wysiwyg.css';
import { Container, Row, Col, Table, Button, Modal, Card } from 'react-bootstrap';
import { YearPicker, MonthPicker } from 'react-dropdown-date';
import FormBtn from '../../Components/FormBtn';
import recentcal from './recentcal.png';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import EditIcon from '@material-ui/icons/Edit';
import API from '../../utils/API';
import Alert from '../../Components/Alert';
import "./style.css";

// moment js
import moment from 'moment';



export default function SearchResults() {

	// Fetches the user data
	const { userData } = useContext(UserContext);
 
	let maxYear = moment().format('YYYY');
	let setminYear = moment().subtract(10, 'years').calendar();
	let minYear = setminYear.substring(6,10);

	// Drop down for Year,Month for the user to fetch the Journal Entries from Search Criteria
	const [year, setYear] = useState(undefined);
	const [month, setMonth] = useState(undefined);
	const [results, setResults] = useState([]);
	const [error, setError] = useState();
	const [show, setShow] = useState(false);
	const [title,setTitle]=useState(undefined);
	const [body, setBody] = useState("");


	//  searchedEntries;
	const handleSearch = async () => {
		console.log('Month: ' + month + ' Year: ' + year);
		
		if (isNaN(month) || isNaN(year)){
			setError("Select both month and year");
		}

		var searchedEntries = await API.checkASearchJournalEntry(
			month,
			year,
			userData.user.id
		);

		setResults(searchedEntries.data);
	};

	const deleteEntry = async (noteId) => {
		// Deletes the journal entry when the user clicks on delete Icon
		const deletedEntry = await API.removeOneJournalEntry(
			noteId,
			userData.user.id
		);

   // Filters the data after user deltes the Entry
		const remainingEntries = results.filter(
			(result) => noteId !== result._id
		);

		setResults(remainingEntries);
	};

	const handleClose = () => setShow(false);
	
	const viewEntry = async (noteId) => {
		setShow(true);
	
			const viewEntryData = await API.getOneJournalEntry(noteId, userData.user.id);
		
			setTitle(viewEntryData.data.title);
			setBody(viewEntryData.data.body);
	}

	if (body !== "") {
				console.log(title);
			console.log("body: " + JSON.stringify(body));
			const data =JSON.parse(body);
			// console.log("DATA : " + data);
			// console.log(JSON.parse(data));
		
			console.log(typeof(data));
			// console.log(typeof(data));

			console.log(typeof({"blocks":[{"key":"6durh","text":"this is pratyusha's testing update","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}));
			console.log("equal?: "+   body === {"blocks":[{"key":"6durh","text":"this is pratyusha's testing update","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}});
			console.log("body : " + draftToHtml(data));
			}
			
	return (
		<>
		<Header />
		<div className= "background-img">
	
			<br />
			{userData.user ? (
				<>
				<Row>

			    <Col md={6}>
					  <Link to="/journal" className="ml-2">← Back to Journal Entry Page</Link>
				  </Col>
					<Col md ={6}>
					<div className="text-right mr-2">
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
							start={minYear} // default is 1900
							end={maxYear} // default is current year
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
						<FormBtn className="btn btn-secondary" onClick={handleSearch}>Search</FormBtn>
					</div>
					</Col>
					</Row>

					<br />
					<br />
					
					{/*Search Results container */}
					<Container fluid="xs">
				
						<Row>
							<Col md={2}></Col>
							<Col md={8}>
								<br />

				       
								{/* Add search results here */}
								<div className="d-flex justify-content-center">
									
									{/* validation alert for year and month*/}
               {error && (
                 <Alert
                   message={error}
                   type="danger"
									 clearError={() => setError(undefined)
									}
									style={{ width: '50%',textAlign:'center'}}
                 />
                )}

									{results.length ? (
										<>
							
										<Container>
										<Card
						className="shadow z-depth-8 card-border mx-1 my-1"
						// style={{ width: '50rem' }}
					>
						<Card.Body>
										<Row >
											<Col md={12}>
												<div className= "text-center">
								     	    <h2>Search Results</h2>
											   </div>
											 </Col>
							    	</Row>
										<br/>
										
										<Row>
											<Col md ={12}>
											<Table striped hover responsive="sm" >
										<thead>
											<tr>
												<th style={{ width:'20%', textAlign: 'center', }} >
													Date
												</th>
												<th style={{ width: '40%', textAlign: 'center', }} >
													Title
												</th>
												<th style={{ width: '10%', }} ></th>
												<th style={{ width: '10%', }} ></th>
												<th style={{ width: '10%', }} ></th>
											</tr>
										</thead>
              	<tbody>
                {results.map(result => (
									// <tbody>
                  <tr key={result._id}>
										
                   	<td data-th="Date" style={{ width: '20%',textAlign:'center', }}>
											<img src= {recentcal}alt="Recent Calendar" />
											{result.entryDate.substring(	0, 10)}
										</td>

										<td data-th="Title" className="table-data" 
										style={{ width :'40%', textAlign:'center'}} >
											{	result.title	}
										</td>

								    	<td>
											<Button	variant="success" onClick={() => viewEntry( result._id	)	}	>
											view
											</Button>
											<Modal  numberanimation="true" scrollable="true" backdropClassName="modal-backdrop" size ='lg' show={show} onHide={handleClose}>
                        <Modal.Header closeButton>

							         	<Modal.Title>{title}</Modal.Title>
                        </Modal.Header>
												<Modal.Body> 
												{ body.length > 0 &&
													<div 
															dangerouslySetInnerHTML={{ __html:draftToHtml(JSON.parse(body))}} >
													</div>
												}
													</Modal.Body>
                       </Modal>
										</td>

										<td >
											<Button variant="success" >
												<Link to={{ pathname: '/journal', state: { noteId: result._id } }} style={{ color:'white'}}>
													<EditIcon />
												</Link>
											</Button>	
										</td>

										<td>
											<Button	variant="danger" onClick={() => deleteEntry( result._id	)	}	>
												<DeleteRoundedIcon />
											</Button>
										</td>
                 </tr>
                ))}
              </tbody>
							</Table>
							</Col>
							</Row>
						
							</Card.Body>
							</Card>
							</Container>
							</>
									
             ) : (
              <> </>
            )}
					

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
		</>
	);
}
