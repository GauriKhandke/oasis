import React, { useContext, useState } from 'react';
import { Link} from 'react-router-dom';

// Components
import Header from '../../Components/Header';
import FormBtn from '../../Components/FormBtn';
import Alert from '../../Components/Alert';

import UserContext from '../../Context/UserContext';

// API
import API from '../../utils/API';

// Draft js to HTML package
import draftToHtml from 'draftjs-to-html';

// moment js
import moment from 'moment';

// React drop down date
import { YearPicker, MonthPicker } from 'react-dropdown-date';

// Draft js CSS
import '../../Components/TextEditor/react-draft-wysiwyg.css';

// Styles
import recentcal from './recentcal.png';
import EditIcon from '@material-ui/icons/Edit';
import { Container, Row, Col, Table, Button, Modal, Card } from 'react-bootstrap';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import "./style.css";


// Search results Page
export default function SearchResults() {

	// Fetches the user data
	const { userData } = useContext(UserContext);
 
	// Max year for year dropdown
	let maxYear = moment().format('YYYY');

	// Min year for year dropdown
	let setminYear = moment().subtract(10, 'years').calendar();
	let minYear = setminYear.substring(6,10);

	// Drop down for Year, Month for the user to fetch the Journal Entries from Search Criteria
	const [year, setYear] = useState(undefined);
	const [month, setMonth] = useState(undefined);

	// Search results for selected month and year
	const [results, setResults] = useState([]);
	const [error, setError] = useState();

	// Set show for modal
	const [show, setShow] = useState(false);

	// Set Title for Journal entry to convert to html
	const [title,setTitle]=useState(undefined);

	// Set body for Journal entry to convert to html
	const [body, setBody] = useState("");


	// Search entries for selected month and year
	const handleSearch = async () => {
		
		// Validation for month and year
		if (isNaN(month) || isNaN(year)){
			setError("Select both month and year");
		}

		// API call for searching the journal entries for a particular month
		var searchedEntries = await API.checkASearchJournalEntry(
			month,
			year,
			userData.user.id
		);
		
		// sete the searched entry results
		setResults(searchedEntries.data);
	};

	
	// Delete Journal entry
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
		
		// set the remaining results after the user deletes the journal entry
		setResults(remainingEntries);
	};

	
	// modal close 
	const handleClose = () => setShow(false);
	
	
	// view the entries on clicking view
	const viewEntry = async (noteId) => {
		
		setShow(true);
	
		//  API call for fetching the Journal entry
		const viewEntryData = await API.getOneJournalEntry(noteId, userData.user.id);
		
		//set title to  view entry data
		setTitle(viewEntryData.data.title);
		//set boduy to view entry data
		setBody(viewEntryData.data.body);
	}
	
	// Search Results JSX
	return (
		<>
		{/* header component */}
		<Header />
		<div className= "background-img">
	
			<br />
			{/* If authenticated user */}
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
							short 
							endYearGiven 
							year={year} 
							required={true} 
							value={month} 
							onChange={(month) => {
								setMonth(month);
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
							start={minYear} 
							end={maxYear}
							reverse 
							required={true} 
							value={year} 
							onChange={(year) => {
								setYear(year);
							}}
							id={'year'}
							name={'year'}
							classes={
								'classes btn btn-secondary dropdown-toggle mr-1 mt-2'
							}
							optionClasses={'option classes'}
						/>
						{/* search button */}
						<FormBtn className="btn btn-secondary" onClick={handleSearch}>Search</FormBtn>
					</div>
					</Col>
					</Row>

					<br />
					
					{/*Search Results container */}
					<Container fluid="xs">
				
						<Row>
							<Col md={2}></Col>
							<Col md={8}>
								<br />
 
								{/* Search results here */}
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
										<Card className="shadow z-depth-8 card-border mx-1 my-1" >
											<Card.Body>
											<Row >
												<Col md={12}>
													<div className= "text-center">
								     	   		<h2 className= "headingText" >Search Results</h2>
											   	</div>
											 	</Col>
							    		</Row>
										<br/>
										
										<Row>
											<Col md ={12}>
												
											{/* Search results table */}
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
									//  Table body
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
											
											{/* View Button */}
											<Button	variant='secondary' onClick={() => viewEntry( result._id	)	}	>
											view
											</Button>

											{/* Modal for view journal entry */}
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
                    {/* view button */}
										<td >
											<Button variant='secondary'>
												<Link to={{ pathname: '/journal', state: { noteId: result._id } }} style={{ color:'white'}}>
													<EditIcon />
												</Link>
											</Button>	
										</td>
                    {/* Delete button */}
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
						<Link to="/">Please login</Link>
					</h2>
				</>
			)}
		<br />
		<br />
		<br />
		</div>
		
		</>
	);
}
