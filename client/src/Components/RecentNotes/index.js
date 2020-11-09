import React from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './style.css';
import recentcal from './recentcal.png';

const createDate = "November 3, 2020";
const title = "How to kill a mockingbird";


function RecentNotes() {
    return (
        <div className="d-flex justify-content-center">
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th></th>
                    <th>Date</th>
                    <th>Title</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><img src={recentcal} alt="Recent Calendar" /></td>
                    <td>{createDate}</td>
                    <td>{title}</td>
                    <td><Button variant="danger">Delete</Button></td>
                </tr>
                <tr>
                    <td><img src={recentcal} alt="Recent Calendar" /></td>
                    <td>{createDate}</td>
                    <td>{title}</td>
                    <td><Button variant="danger">Delete</Button></td>
                </tr>
                <tr>
                    <td><img src={recentcal} alt="Recent Calendar" /></td>
                    <td>{createDate}</td>
                    <td>{title}</td>
                    <td><Button variant="danger">Delete</Button></td>
                </tr>
                <tr>
                    <td><img src={recentcal} alt="Recent Calendar" /></td>
                    <td>{createDate}</td>
                    <td>{title}</td>
                    <td><Button variant="danger">Delete</Button></td>
                </tr>
                <tr>
                    <td><img src={recentcal} alt="Recent Calendar" /></td>
                    <td>{createDate}</td>
                    <td>{title}</td>
                    <td><Button variant="danger">Delete</Button></td>
                </tr>
            </tbody>
        </Table>
        </div>
  
    );
}
export default RecentNotes;  