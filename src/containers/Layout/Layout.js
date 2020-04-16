import React from "react";
import CallLogs from "../../components/CallLogs/CallLogs";
import "./Layout.css";
import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";

const token = JSON.parse(localStorage.getItem("@userData")).token;

class Layout extends React.Component {
  state = {
    callData: null,
    showImage: false,
    screenshots: [],
  };

  componentDidMount() {
    fetch("https://staging-framework.blinkin.io/v1/calls/get-own-call-logs", {
      headers: new Headers({
        "x-token": token,
      }),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((res) => {
        console.log(res);
        this.setState({ callData: res.data });
      })
      .catch((err) => console.log(err));
  }

  loadNextPage = () => {
    fetch(this.state.callData.next_page_url, {
      headers: new Headers({
        "x-token": token,
      }),
    })
      .then((res) => {
        // console.log(res.json());
        return res.json();
      })
      .then((res) => {
        console.log(res);
        this.setState({
          callData: res.data,
        });
      })
      .catch((err) => console.log(err));
  };

  loadPreviousPage = () => {
    fetch(this.state.callData.prev_page_url, {
      headers: new Headers({
        "x-token": token,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({ callData: res.data });
      })
      .catch((err) => console.log(err));
  };

  toggleShowImage = () => {
    let images = [];
    if (!this.state.showImage) {
      this.getScreenshots("54-1584007036151").then((res) => {
        res.data.map((img) => {
          images.push(
            "https://blinkin-production.s3.eu-central-1.amazonaws.com/public/images/chat_images/" +
              img.file_name +
              img.file_extension
          );
        });
      });
    }
    this.setState((prevState) => {
      return {
        showImage: !prevState.showImage,
        screenshots: images,
      };
    });
  };

  getScreenshots = (roomId) => {
    return fetch(
      "https://staging-framework.blinkin.io/v1/calls/get-files/" + roomId,
      {
        headers: new Headers({
          "x-token": token,
        }),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        return res.data;
      });
  };

  render() {
    let callLogs = null;
    let prevButton = null;
    let nextButton = null;
    let multipleImages = this.state.screenshots.map((img) => {
      return (
        <ModalBody>
          {" "}
          <img
            width="400px"
            style={{ display: "block", margin: "auto" }}
            src={img}
          />
          <ModalFooter>Here At BlinkIn</ModalFooter>
        </ModalBody>
      );
    });

    if (this.state.callData) {
      if (this.state.callData.current_page > 1) {
        prevButton = (
          <Button
            color="info"
            className="Button"
            onClick={this.loadPreviousPage}
          >
            Previous Page
          </Button>
        );
      }
      if (this.state.callData.current_page !== this.state.callData.last_page) {
        nextButton = (
          <Button color="info" className="Button" onClick={this.loadNextPage}>
            Next Page
          </Button>
        );
      }
      callLogs = (
        <div>
          <CallLogs
            content={this.state.callData}
            showImage={this.toggleShowImage}
          />
          {prevButton}
          {this.state.callData.current_page}
          {nextButton}
          <Modal isOpen={this.state.showImage} toggle={this.toggleShowImage}>
            {multipleImages}
          </Modal>
        </div>
      );
    }
    return callLogs;
  }
}

export default Layout;
