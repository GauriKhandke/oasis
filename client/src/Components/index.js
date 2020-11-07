import React from "react";

const createDate = "November 3, 2020";
const title = "How to kill a mockingbird";
const mod = "November 4,2020";

function RecentNotes(){
    return(
<div>
        <table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">Date</th>
      <th scope="col">Title</th>
      <th scope="col">Last Modified</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>{createDate}</td>
      <td>{title}</td>
      <td>{mod}</td>
    </tr>
    <tr>
      <th scope="row">2</th>
       <td>{createDate}</td>
      <td>{title}</td>
      <td>{mod}</td>
    </tr>
    <tr>
    <th scope="row">3</th>
       <td>{createDate}</td>
      <td>{title}</td>
      <td>{mod}</td>
    </tr>
    <tr>
      <th scope="row">4</th>
       <td>{createDate}</td>
      <td>{title}</td>
      <td>{mod}</td>
    </tr>
    <tr>
      <th scope="row">5</th>
       <td>{createDate}</td>
      <td>{title}</td>
      <td>{mod}</td>
    </tr>
  </tbody>
</table>
</div>
    );
}
export default RecentNotes;  