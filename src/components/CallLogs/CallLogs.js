import React from "react";
import CallLog from "./CallLog/CallLog";
import "./CallLogs.css";

import { Table, Spinner } from "reactstrap";

const callLogs = (props) => {
  const tableRows = props.content.data.map((cont) => {
    return <CallLog key={cont.room_id} {...cont} showImage={props.showImage} />;
  });

  return (
    <>
      {props.loading && (
        <div className="text-center m-4">
          <Spinner style={{ width: "3rem", height: "3rem" }} />
        </div>
      )}
      <Table>
        <thead className="calllogs__thead">
          <tr>
            <th>
              <i className="fa fa-id-card-o" aria-hidden="true"></i> Room ID
            </th>
            <th>
              <i className="fa fa-calendar" aria-hidden="true"></i> Start Date
            </th>
            {/* <th>
              <i className="fa fa-hourglass-end" aria-hidden="true"></i> Start
              Time
            </th> */}
            <th>
              <i className="fa fa-clock-o" aria-hidden="true"></i> Duration
            </th>
            <th>
              <i className="fa fa-phone" aria-hidden="true"></i> To
            </th>

            <th>Files</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </Table>
    </>
  );
};

export default callLogs;
