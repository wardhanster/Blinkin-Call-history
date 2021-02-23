import React from "react";
import "./chat__preview.css";
import ChatBubble from "./ChatBubble";

export default function ChatPreview({ msg, RenderPdf }) {
  return (
    <div className="jumbotron m-0 p-0 bg-transparent">
      <div className="row m-0 p-0 ">
        <div className="col-7 p-0 m-0 right-0 mx-auto">
          <div className="border-0 rounded rounded-item">
            <div className="card bg-sohbet border-0 m-0 p-0 h-100-val">
              <div
                id="sohbet"
                className="card border-0 m-0 p-0 position-relative bg-transparent overflow-a"
              >
                {msg &&
                  msg.map((item, index) => {
                    return (
                      <ChatBubble RenderPdf={RenderPdf} key={`${index}_chatItem`} msgData={item} />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
