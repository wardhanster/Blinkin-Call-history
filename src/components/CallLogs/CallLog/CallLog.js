import React from "react";
import "./CallLog.css";

const callLog = (props) => {
  let date = new Date(props.call_start_time);
  return (
    <tr className="calllog__row">
      <td>{props.room_id}</td>
      <td className="text-muted">{date.toLocaleDateString()}</td>
      <td>{date.toLocaleTimeString()}</td>
      <td>
        {convertToHMS(
          (new Date(props.call_end_time).getTime() -
            new Date(props.call_start_time).getTime()) /
            1000
        )}
      </td>
      <td>{props.to_phonenumber}</td>

      <td>
        {props.files_count ? (
          <i
            onClick={() => props.showImage(props.room_id)}
            className="fa fa-file-image-o showFiles"
            aria-hidden="true"
          ></i>
        ) : null}
      </td>
    </tr>
  );
};

function convertToHMS(seconds) {
  seconds = Number(seconds);
  let h = Math.floor(seconds / 3600);
  let m = Math.floor((seconds % 3600) / 60);
  let s = Math.floor((seconds % 3600) % 60);
  h = h > 0 ? h + (h === 1 ? "hr " : "hrs ") : "";
  m = m > 0 ? m + (m === 1 ? "min " : "mins ") : "";
  s = s > 0 ? s + "sec" : "";
  return h + m + s;
}

export default callLog;
