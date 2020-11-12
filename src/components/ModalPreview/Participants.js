import React from "react";

export default function Participants({ participants }) {
  console.log(participants);
  return (
    <div>
      {JSON.parse(participants).map((item, key) => {
        return <p key={`par_${key}`}>{item.name}</p>;
      })}
    </div>
  );
}
