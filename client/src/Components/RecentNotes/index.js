import React from "react";
import recentcal from './recentcal.png';


const createDate = "November 3, 2020";
const title = "How to kill a mockingbird";
const mod = "November 4,2020";

function RecentNotes() {
    return (
        <div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Date</th>
                        <th scope="col">Title</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><img src={recentcal} alt="Recent Calendar" /></td>
                        <td>{createDate}</td>
                        <td>{title}</td>
                    </tr>
                    <tr>
                        <td><img src={recentcal} alt="Recent Calendar" /></td>
                        <td>{createDate}</td>
                        <td>{title}</td>
                    </tr>
                    <tr>
                        <td><img src={recentcal} alt="Recent Calendar" /></td>
                        <td>{createDate}</td>
                        <td>{title}</td>
                    </tr>
                    <tr>
                        <td><img src={recentcal} alt="Recent Calendar" /></td>
                        <td>{createDate}</td>
                        <td>{title}</td>
                    </tr>
                    <tr>
                        <td><img src={recentcal} alt="Recent Calendar" /></td>
                        <td>{createDate}</td>
                        <td>{title}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
export default RecentNotes;  