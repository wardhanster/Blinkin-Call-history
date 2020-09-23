import React from "react";
import CallLog from "./CallLog/CallLog";
import "./CallLogs.css";

import { Table, Spinner } from "reactstrap";

const callLogs = (props) => {
  return (
    <>
      {props.loading && (
        <div className="text-center m-4">
          <Spinner style={{ width: "3rem", height: "3rem" }} />
        </div>
      )}
      <Table hover>
        <thead className="calllogs__thead">
          <tr>
            <th className="default_width">
              <i className="fa fa-id-card-o" aria-hidden="true"></i>
              {window.strings.CH_roomId || " Room ID"}
            </th>
            <th className="default_width">
              <i className="fa fa-calendar" aria-hidden="true"></i>
              {window.strings.CH_startDate || " Start Date"}
            </th>
            <th className="default_width">
              <i className="fa fa-clock-o" aria-hidden="true"></i>
              {window.strings.CH_duration || " Duration"}
            </th>
            <th className="width_50">
              <i className="fa fa-phone" aria-hidden="true"></i>
              {window.strings.CH_to || "To"}
            </th>

            <th className="width_50">{window.strings.CH_files || " Files"}</th>
          </tr>
        </thead>
        <tbody>
          {props.content.data.map((cont) => {
            return (
              <CallLog
                key={cont.room_id}
                {...cont}
                showImage={props.showImage}
              />
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default callLogs;
