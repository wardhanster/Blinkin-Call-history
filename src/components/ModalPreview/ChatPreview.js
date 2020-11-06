import React from "react";
import "./chat__preview.css";
import ChatBubble from "./ChatBubble";

export default function ChatPreview({ msg }) {
  const evalMessages = (item) => {
    const d = item.message;
    let type = "recieved";
    if (d.from === this.props.selfType) {
      type = "sent";
    }

    return { type, message: d.data.message, from: item.fromName };
  };

  return (
    <div className="jumbotron m-0 p-0 bg-transparent">
      <div className="row m-0 p-0 ">
        <div className="col-12 p-0 m-0 right-0">
          <div className="card border-0 rounded rounded-item">
            <div className="card bg-sohbet border-0 m-0 p-0 h-100-val">
              <div
                id="sohbet"
                className="card border-0 m-0 p-0 position-relative bg-transparent overflow-a"
              >
                {msg &&
                  msg.map((item) => {
                    return <ChatBubble msgData={item} />;
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
