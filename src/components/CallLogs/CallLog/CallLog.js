import React from "react";
import "./CallLog.css";

// const setCorrectTimeZone = (date) => {
//   let a = new Date(date);
//   let timeZoneDifference = a.getTimezoneOffset();
//   a.setMinutes(a.getMinutes() - timeZoneDifference);
//   return a;
// };

const callLog = (props) => {
  let {is_deleted=false} = props;
  let handleClick = (file_count, room_id) => {
    // if (file_count > 0) {
    props.showImage(room_id);
    // }
  };

  // let date = new Date(setCorrectTimeZone(props.call_start_time));
  const theClass = !is_deleted ? "room_id_active":'';
  return (
    <tr className="calllog__row">
      <td
        className={theClass}
        onClick={() => (!is_deleted && handleClick(props.files_count, props.room_id))}
      >
        {props.room_id}
        {is_deleted && <small style={{display:'block'}}>{window.strings.CH_deleted||'Deleted'}</small>}
      </td>
      <td className="text-muted">{props.getTimeZone(props.call_start_time)}</td>
      <td>
        {convertToHMS(
          (new Date(props.call_end_time).getTime() -
            new Date(props.call_start_time).getTime()) /
            1000
        )}
      </td>
      <td>
        {props.to_phonenumber === null ? (
          <span className="text-muted">N/A</span>
        ) : (
          props.to_phonenumber
        )}
      </td>

      <td>
        {props.files_count ? (
          <i
            onClick={() => props.showImage(props.room_id)}
            className="fa fa-file-image-o showFiles"
            aria-hidden="true"
          ></i>
        ) : (
          "N/A"
        )}
      </td>
    </tr>
  );
};

function convertToHMS(seconds) {
  if (seconds <= 0) {
    return "N/A";
  }
  seconds = Number(seconds);
  let h = Math.floor(seconds / 3600);
  let m = Math.floor((seconds % 3600) / 60);
  let s = Math.floor((seconds % 3600) % 60);
  h = h > 0 ? h + (h === 1 ? " hr " : " hrs ") : "";
  m = m > 0 ? m + (m === 1 ? " min " : " mins ") : "";
  s = s > 0 ? s + ` ${window.strings.CH_sec || 'sec'}` : "";
  return h + m + s;
}

export default callLog;
