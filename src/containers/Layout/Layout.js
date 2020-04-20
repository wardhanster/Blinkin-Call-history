import React from "react";
import CallLogs from "../../components/CallLogs/CallLogs";
import "./Layout.css";
import { Modal, ModalBody } from "reactstrap";

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

  fetchCall = async (url) => {
    if (mounted) {
      this.setState({ loading: true });
      let response = await this.props.fetchAPI(url);
      if (mounted) {
        this.setState({ loading: false });
        return response;
      }
    }
  };

  async componentDidMount() {
    mounted = true;
    let res = await this.fetchCall(this.props.baseUrl);
    this.setState({ callData: res.data });
  }

  componentWillUnmount() {
    mounted = false;
  }

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
    let res = await this.props.getFilesAPI(roomId);
    return res;
  };

  handleCount = async (pageCount) => {
    let res = await this.fetchCall(`${this.props.baseUrl}?page=${pageCount}`);
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
          </Modal>
        </div>
      );
    }
    return callLogs;
  }
}

export default Layout;
