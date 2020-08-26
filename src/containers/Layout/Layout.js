import React from "react";
import CallLogs from "../../components/CallLogs/CallLogs";
import "./Layout.css";
import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";

import ModalPreview from "../../components/ModalPreview";

let mounted = false;
class Layout extends React.Component {
  state = {
    callData: null,
    showImage: false,
    screenshots: [],
    loading: false,
    pageNum: 1,
  };

  fetchCall = async (pageNum) => {
    if (mounted) {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      this.setState({ loading: true });
      let response = await this.props.fetchAPI(pageNum);
      if (mounted) {
        this.setState({ loading: false });
        return response;
      }
    }
  };

  async componentDidMount() {
    mounted = true;
    let res = await this.fetchCall(this.state.pageNum);
    this.setState({ callData: res.data });
  }

  componentWillUnmount() {
    mounted = false;
  }

  toggleShowImage = async (roomId) => {
    if (!this.state.showImage) {
      this.setState((prevState) => {
        return {
          showImage: !prevState.showImage,
        };
      });
      let screenShots = await this.getScreenshots(roomId);
      this.setState((prevState) => {
        return {
          screenshots: screenShots.data,
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          showImage: !prevState.showImage,
          screenshots: [],
        };
      });
    }
  };

  getScreenshots = async (roomId) => {
    let res = await this.props.getFilesAPI(roomId);
    return res;
  };

  handleCount = async (pageCount) => {
    let res = await this.fetchCall(pageCount);
    this.setState({ callData: res.data, pageNum: pageCount });
  };

  render() {
    let callLogs = null;

    if (this.state.callData) {
      callLogs = (
        <div>
          <CallLogs
            content={this.state.callData}
            showImage={this.toggleShowImage}
            loading={this.state.loading}
          />
          {this.props.Paginator(this.state.callData, this.handleCount)}
          <Modal
            className="modal-xl"
            isOpen={this.state.showImage}
            toggle={this.toggleShowImage}
          >
            <ModalBody>
              <ModalPreview
                fileBasePath={this.props.fileBasePath}
                previewData={this.state.screenshots}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggleShowImage}>
                {window.String.CH_close || "Close"}
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    }
    return callLogs;
  }
}

export default Layout;
