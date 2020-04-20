import React, { useState } from "react";
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
} from "reactstrap";
import classnames from "classnames";

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
];

export default function ModalPreview(props) {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  let returnFiles = (fileType) => {
    let files = props.previewData.map((item, index) => {
      if (fileType === "image") {
        if (image.indexOf(item.file_extension) > -1) {
          let presentUrl = `${props.fileBasePath}${item.file_name}.${item.file_extension}`;
          return (
            <div key={index}>
              <img
                className="img-fluid"
                alt={`${index}_image`}
                src={presentUrl}
              />
            </div>
          );
        } else {
          return <p key={index}>No Images Avaliable</p>;
        }
      }

      if (fileType === "video") {
        if (video.indexOf(item.file_extension) > -1) {
          let presentUrl = `${props.fileBasePath}${item.file_name}.${item.file_extension}`;
          return (
            <video key={index} width="320" height="240" controls>
              <source src={presentUrl} type="video/mp4" />
              <source src={presentUrl} type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          );
        } else {
          return <p key={index}>No Videos Avaliable</p>;
        }
      }

      if (fileType === "others") {
        if (
          video.indexOf(item.file_extension) <= -1 &&
          image.indexOf(item.file_extension) <= -1
        ) {
          let presentUrl = `${props.fileBasePath}${item.file_name}.${item.file_extension}`;
          return (
            <Col key={index} sm="6">
              <Card body>
                <CardTitle>{item.orginal_name}</CardTitle>
                <CardText>File - {item.file_extension}</CardText>
                <a rel="noopener noreferrer" href={presentUrl} target="_blank">
                  Goto File location
                </a>
              </Card>
            </Col>
          );
        } else {
          return <p key={index}>No Files Avaliable</p>;
        }
      }
    });
    return files;
  };

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            Images
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            Videos
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "3" })}
            onClick={() => {
              toggle("3");
            }}
          >
            Files
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <div className="tab-all preview_image">
                {returnFiles("image")}
              </div>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <div className="tab-all">{returnFiles("video")}</div>
        </TabPane>
        <TabPane tabId="3">
          <div className="tab-all">{returnFiles("others")}</div>
        </TabPane>
      </TabContent>
    </div>
  );
}
