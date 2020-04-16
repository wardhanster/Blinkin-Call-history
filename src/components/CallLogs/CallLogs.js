import React from "react";
import CallLog from "./CallLog/CallLog";
import "./CallLogs.css";
import { Table } from "reactstrap";

const callLogs = (props) => {
  console.log(props.content);
  const tableRows = props.content.data.map((cont) => {
    return <CallLog {...cont} showImage={props.showImage} />;
  });

  return (
    <Table style={{ width: 1000, margin: "auto" }}>
      <thead className="calllogs__thead">
        <tr>
          <th>
            <i class="fa fa-id-card-o" aria-hidden="true"></i> Room ID
          </th>
          <th>
            <i class="fa fa-calendar" aria-hidden="true"></i> Start Date
          </th>
          <th>
            <i class="fa fa-hourglass-end" aria-hidden="true"></i> Start Time
          </th>
          <th>
            <i class="fa fa-clock-o" aria-hidden="true"></i> Duration
          </th>
          <th>
            <i class="fa fa-phone" aria-hidden="true"></i> To
          </th>
          {/* <th>Create At</th>
          <th>Updated At</th> */}
          <th>Files</th>
        </tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </Table>
  );
};

export default callLogs;
