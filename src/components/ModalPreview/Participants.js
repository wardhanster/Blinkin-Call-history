import React from "react";

export default function Participants(data) {
  return (
    <div>
      {JSON.parse(data).map((item, key) => {
        return <p key={`par_${key}`}>{item.name}</p>;
      })}
    </div>
  );
}
