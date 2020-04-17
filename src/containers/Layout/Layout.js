import React from "react";
import CallLogs from "../../components/CallLogs/CallLogs";
import "./Layout.css";
import { Modal, ModalBody, ModalHeader, Button } from "reactstrap";

const { token } = JSON.parse(localStorage.getItem("@userData"));

const myHeaders = {
  headers: new Headers({
    "x-token": token,
  }),
};

class Layout extends React.Component {
  state = {
    callData: null,
    showImage: false,
    screenshots: [],
    loading: false,
  };

  fetchCall = async (url) => {
    this.setState({ loading: true });
    let response = await fetch(url, myHeaders);
    let res = await response.json();
    this.setState({ loading: false });
    return res;
  };

  componentDidMount() {
    let result = async () => {
      let res = await this.fetchCall(this.props.urls.baseUrl);
      this.setState({ callData: res.data });
      return res;
    };
    result();
  }

  handleNextPrevious = async (paginationType) => {
    let selectPaginationUrl =
      paginationType === "next"
        ? this.state.callData.next_page_url
        : this.state.callData.prev_page_url;
    let res = await this.fetchCall(selectPaginationUrl);
    this.setState({ callData: res.data });
  };

  toggleShowImage = async (roomId) => {
    if (!this.state.showImage) {
      let screenShots = await this.getScreenshots(roomId);
      this.setState((prevState) => {
        return {
          showImage: !prevState.showImage,
          screenshots: screenShots.data,
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          showImage: !prevState.showImage,
        };
      });
    }
  };

  getScreenshots = async (roomId) => {
    let res = await this.fetchCall(`${this.props.urls.get_files}${roomId}`);
    let data = await res.data;
    return data;
  };

  render() {
    let callLogs = null;
    let prevButton = null;
    let nextButton = null;

    if (this.state.callData) {
      if (this.state.callData.current_page > 1) {
        prevButton = (
          <Button
            color="info"
            className="Button"
            onClick={this.handleNextPrevious.bind(this, "previous")}
          >
            Previous Page
          </Button>
        );
      }
      if (this.state.callData.current_page !== this.state.callData.last_page) {
        nextButton = (
          <Button
            color="info"
            className="Button"
            onClick={this.handleNextPrevious.bind(this, "next")}
          >
            Next Page
          </Button>
        );
      }
      callLogs = (
        <div>
          <CallLogs
            content={this.state.callData}
            showImage={this.toggleShowImage}
            loading={this.state.loading}
          />

          {prevButton}
          {this.state.callData.current_page}
          {nextButton}
          <Modal isOpen={this.state.showImage} toggle={this.toggleShowImage}>
            <ModalHeader toggle={this.toggleShowImage}>Image</ModalHeader>
            <ModalBody>
              {this.state.screenshots.map((img, index) => {
                let presentUrl = `${this.props.urls.file_base_path}${img.file_name}.${img.file_extension}`;
                return (
                  <>
                    <span>
                      <small>
                        {" "}
                        {`Orginal File Name - ${img.original_name} | File Created At - ${img.created_at}`}
                      </small>
                      }
                    </span>
                    <img
                      width="400px"
                      alt={`${index}_image`}
                      style={{ display: "block", margin: "auto" }}
                      src={presentUrl}
                    />
                  </>
                );
              })}
            </ModalBody>
          </Modal>
        </div>
      );
    }
    return callLogs;
  }
}

export default Layout;
