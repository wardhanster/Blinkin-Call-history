import React from "react";

export default function Participants(data) {
  console.log(data);
  return (
    <div>
      {JSON.parse(data.participants).map((item, key) => {
        return <p key={`par_${key}`}>{item.name}</p>;
      })}
    </div>
  );
}
