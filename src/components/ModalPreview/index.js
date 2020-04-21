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
  Spinner,
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

function Loading() {
  return (
    <div className="text-center m-4">
      <Spinner style={{ width: "3rem", height: "3rem" }} />
    </div>
  );
}

export default function ModalPreview(props) {
  const [activeTab, setActiveTab] = useState("1");
  const [loading, setLoading] = useState(true);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  let stopLoading = () => {
    if (loading) {
      setLoading(false);
    }
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
        {loading && <Loading />}
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <div className="tab-all preview_image">
                {props.previewData
                  .filter(
                    (e) =>
                      image.indexOf(e.file_extension.toLocaleLowerCase()) !== -1
                  )
                  .map((imageItem, index) => {
                    let presentUrl = `${props.fileBasePath}${imageItem.file_name}.${imageItem.file_extension}`;
                    return (
                      <img
                        key={`${index}_image`}
                        className="img-fluid"
                        alt={`${index}_image`}
                        onLoad={stopLoading}
                        src={presentUrl}
                      />
                    );
                  })}
                {props.previewData.filter(
                  (e) =>
                    image.indexOf(e.file_extension.toLocaleLowerCase()) !== -1
                ) && "No Images Exist"}
              </div>
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
                  <video key={index} width="320" height="240" controls>
                    <source src={presentUrl} type="video/mp4" />
                    <source src={presentUrl} type="video/ogg" />
                    Your browser does not support the video tag.
                  </video>
                );
              })}
            {props.previewData.filter(
              (e) => video.indexOf(e.file_extension.toLocaleLowerCase()) !== -1
            ) && "No Video Files Exist"}
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
                        Goto File location
                      </a>
                    </Card>
                  </Col>
                );
              })}
            {props.previewData.filter(
              (e) =>
                video.indexOf(e.file_extension.toLocaleLowerCase()) !== -1 &&
                image.indexOf(e.file_extension.toLocaleLowerCase()) !== -1
            ) && "No Files Exist"}
          </div>
        </TabPane>
      </TabContent>
    </div>
  );
}
