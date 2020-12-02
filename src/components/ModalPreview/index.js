import React, { useState, useEffect } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Card,
  CardTitle,
  CardText,
  Spinner,
  Badge,
} from "reactstrap";
import classnames from "classnames";
import ChatPreview from "./ChatPreview";
import Participants from "./Participants";
import { exportCSVFile } from "./createFileAndDownload";

import "./modal_preview.css";

let image = [
  "bmp",
  "gif",
  "jpeg",
  "jpg",
  "png",
  "svg+xml",
  "tiff",
  "webp",
  "image",
];
let video = [
  "mpeg",
  "ogg",
  "mp2t",
  "mp4",
  "webm",
  "3gpp",
  "3gpp2",
  "mp4",
  "3gp",
  "x-ms-video",
  "video",
  "mov",
];

function Loading() {
  return (
    <div className="text-center m-4">
      <Spinner style={{ width: "3rem", height: "3rem" }} />
    </div>
  );
}

export default function ModalPreview(props) {
  const [activeTab, setActiveTab] = useState("1");
  const [loading, setLoading] = useState(false);
  const [imageCount, setImageCount] = useState(null);
  const [videoCount, setVideoCount] = useState(null);
  const [othersCount, setOthersCount] = useState(null);
  const [msg, setMsg] = useState(null);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  let stopLoading = () => {
    if (loading) {
      setLoading(false);
    }
  };

  useEffect(() => {
    let img = props.previewData.filter(
      (e) => image.indexOf(e.file_extension.toLocaleLowerCase()) !== -1
    );
    let videos = props.previewData.filter(
      (e) => video.indexOf(e.file_extension.toLocaleLowerCase()) !== -1
    );
    let others = props.previewData.filter(
      (e) =>
        video.indexOf(e.file_extension.toLocaleLowerCase()) !== -1 &&
        image.indexOf(e.file_extension.toLocaleLowerCase()) !== -1
    );
    setImageCount(img.length);
    setVideoCount(videos.length);
    setOthersCount(others.length);
  }, [props.previewData]);

  const handleDownload = () => {
    const headers = {
      name: "Name",
      user_id: "User Id",
      userAgent: "User Agent",
    };

    var itemsFormatted = [];
    JSON.parse(props.participants.participants).forEach((item) => {
      itemsFormatted.push({
        name: item.name,
        user_id: item.uid,
        userAgent: JSON.stringify(item.ua.replace(",", " ")),
      });
    });

    const msgHeader = { sentBy: "Sent by", content: "Content" };
    var msgdata = [];
    if (msg) {
      msg.forEach((item) => {
        let contentData = handleFileFormat(
          JSON.parse(item.message).data.message
        );
        msgdata.push({
          sentBy: JSON.parse(item.message).from,
          content: contentData,
        });
      });
    }

    exportCSVFile(headers, itemsFormatted, msgHeader, msgdata, `call_data`);
  };

  useEffect(() => {
    const getCallhistory = async () => {
      let res = await props.getChatHistory();
      if (res.message === "success") {
        setMsg(res.chat);
      }
    };
    getCallhistory();
    return () => {
      console.log(document.getElementsByClassName("video")[0]);
    };
  }, []);

  return (
    <div>
      <Nav tabs className="modal__tabs">
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            {window.strings.CH_images || "Images"}
            <span className="p-2">
              <Badge color="secondary">{imageCount}</Badge>
            </span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            {window.strings.CH_videos || "Videos"}
            <span className="p-2">
              <Badge color="secondary">{videoCount}</Badge>
            </span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "3" })}
            onClick={() => {
              toggle("3");
            }}
          >
            {window.strings.CH_files || "Files"}
            <span className="p-2">
              <Badge color="secondary">{othersCount}</Badge>
            </span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "4" })}
            onClick={() => {
              toggle("4");
            }}
          >
            {window.strings.CH_ChatHistory || "Chat history"}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "5" })}
            onClick={() => {
              toggle("5");
            }}
          >
            {window.strings.CH_Participants || "Participants"}
          </NavLink>
        </NavItem>
        <li className="nav-item mt-1">
          <button className="btn btn-sm btn-link" onClick={handleDownload}>
            Download
          </button>
        </li>
      </Nav>
      <TabContent activeTab={activeTab}>
        {loading && <Loading />}
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <div className="tab-all preview_image">
                <div>
                  {props.previewData
                    .filter(
                      (e) =>
                        image.indexOf(e.file_extension.toLocaleLowerCase()) !==
                        -1
                    )
                    .map((imageItem, index) => {
                      let presentUrl = `${props.fileBasePath}${imageItem.file_name}.${imageItem.file_extension}`;
                      return (
                        <div className="m-1">
                          <img
                            key={`${index}_image`}
                            alt={`${index}_image`}
                            onLoad={stopLoading}
                            src={presentUrl}
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
              {props.previewData.filter(
                (e) =>
                  image.indexOf(e.file_extension.toLocaleLowerCase()) !== -1
              ).length > 0
                ? ""
                : window.strings.CH_noImagesExist || "No Images Exist"}
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <div className="tab-all">
            {props.previewData
              .filter(
                (e) =>
                  video.indexOf(e.file_extension.toLocaleLowerCase()) !== -1
              )
              .map((item, index) => {
                let presentUrl = `${props.fileBasePath}${item.file_name}.${item.file_extension}`;
                return (
                  <video
                    key={index}
                    width="320"
                    height="240"
                    controls
                    className="video"
                  >
                    <source src={presentUrl} type="video/mp4" />
                    <source src={presentUrl} type="video/ogg" />
                    Your browser does not support the video tag.
                  </video>
                );
              })}
            {props.previewData.filter(
              (e) => video.indexOf(e.file_extension.toLocaleLowerCase()) !== -1
            ).length > 0
              ? ""
              : window.strings.CH_noVideosExist || "No Videos Exist"}
          </div>
        </TabPane>
        <TabPane tabId="3">
          <div className="tab-all">
            {props.previewData
              .filter(
                (e) =>
                  video.indexOf(e.file_extension.toLocaleLowerCase()) !== -1 &&
                  image.indexOf(e.file_extension.toLocaleLowerCase()) !== -1
              )
              .map((item, index) => {
                let presentUrl = `${props.fileBasePath}${item.file_name}.${item.file_extension}`;
                return (
                  <Col key={index} sm="6">
                    <Card body>
                      <CardTitle>{item.orginal_name}</CardTitle>
                      <CardText>File - {item.file_extension}</CardText>
                      <a
                        rel="noopener noreferrer"
                        href={presentUrl}
                        target="_blank"
                      >
                        {window.strings.CH_gotoFileLocation ||
                          "Goto File location"}
                      </a>
                    </Card>
                  </Col>
                );
              })}
            {props.previewData.filter(
              (e) =>
                video.indexOf(e.file_extension.toLocaleLowerCase()) !== -1 &&
                image.indexOf(e.file_extension.toLocaleLowerCase()) !== -1
            ).length > 0
              ? ""
              : window.strings.CH_noFilesExist || "No Files Exist"}
          </div>
        </TabPane>
        <TabPane tabId="4">
          <ChatPreview msg={msg} />
        </TabPane>
        <TabPane tabId="5">
          <Participants participants={props.participants} />
        </TabPane>
      </TabContent>
    </div>
  );
}
