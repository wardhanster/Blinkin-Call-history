import React from "react";

export default function Participants({ participants }) {
  return (
    <div className="row">
      {participants &&
        JSON.parse(participants.participants).map((item, key) => {
          return (
            <div key={`par_${key}`} className="col">
              <div className="card">
                <div className="card-body">
                  <p className="card-text">
                    <b>Name</b> - {item.name}
                  </p>
                  <p className="card-text">
                    <b>{window.strings.CH_userId || 'User ID'}</b> - {item.uid}
                  </p>
                  <p className="card-text">
                    <b>{window.strings.CH_userAgent || 'User Agent'}</b> - {item.ua}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
