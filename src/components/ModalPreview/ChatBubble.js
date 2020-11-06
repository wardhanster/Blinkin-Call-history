import React from "react";

export default function ChatBubble({ msgData }) {
  let mainImage = "";

  const appendVideo = (vid) => (
    <video style={{ maxWidth: "100%" }} src={vid} controls></video>
  );
  const appendImage = (image) => (
    <img src={image} alt="support pic" style={{ width: "100%" }} />
  );
  const evaluateMessage = ({ message }) => {
    let parseMsg = JSON.parse(message);
    let msg = parseMsg.data.message;
    let from = parseMsg.from;

    if (msg.indexOf(":-:img-") > -1) {
      let newMessage = msg.replace(":-:img-", "");
      newMessage = newMessage.split("::-");
      mainImage = newMessage[1];
      newMessage = appendImage(newMessage[0]);
      return {
        from,
        msgData: newMessage,
      };
    }
    if (msg.indexOf(":-:video-") > -1) {
      let newMessage = msg.replace(":-:video-", "");
      newMessage = newMessage.split("::-");
      mainImage = newMessage[1];
      newMessage = appendVideo(newMessage[0]);
      return {
        from,
        msgData: newMessage,
      };
    }

    return {
      from: JSON.parse(message).from,
      msgData: JSON.parse(message).data.message,
    };
  };
  const sentMsg = (msg) => {
    let { from, msgData } = evaluateMessage(msg);
    return (
      <div className="balon1 p-2 m-0 position-relative" data-is={from}>
        <a className="float-right">{msgData}</a>
      </div>
    );
  };

  const receivedMsg = (msg) => {
    let { from, msgData } = evaluateMessage(msg);
    return (
      <div className="balon2 p-2 m-0 position-relative" data-is={from}>
        <a className="float-left sohbet2">{msgData}</a>
      </div>
    );
  };

  const msgStructure = (msg) => {
    let type = JSON.parse(msgData.message).from;
    return type === "agent" ? sentMsg(msg) : receivedMsg(msg);
  };

  return msgStructure(msgData);
}
