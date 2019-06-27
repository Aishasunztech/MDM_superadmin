import React, { Component } from "react";
import { connect } from "react-redux";
import { Avatar, Popover, Badge, Modal, Table, Button } from "antd";
import { Link } from "react-router-dom";
import { logout, } from "appRedux/actions/Auth";
import socketIOClient from "socket.io-client";
import { BASE_URL } from "../../constants/Application"
const confirm = Modal.confirm;
const columns = [
  { title: 'Action', dataIndex: 'action', key: 'action', align: "center" },
  { title: 'DEALER NAME', dataIndex: 'dealer_name', key: 'dealer_name', align: "center" },
  { title: 'LABEL', dataIndex: 'label', key: 'label', align: "center" },
  { title: 'CREDITS', dataIndex: 'credits', key: 'credits', align: "center" },
];

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      NewRequests: []
    }

  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleCancel = (e) => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  }

  componentDidMount() {
    this.setState({
      NewRequests: this.props.requests
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.requests.length !== nextProps.requests.length) {
      this.setState({
        NewRequests: nextProps.requests
      });
    }
  }

  rejectRequest(request) {
    showConfirm(this, "Are you sure you want to decline this request ?", this.props.rejectRequest, request)

    // this.setState({ visible: false })
  }
  acceptRequest(request) {
    showConfirm(this, "Are you sure you want to accept this request ?", this.props.acceptRequest, request)
    // this.props.rejectRequest(request);
    // this.setState({ visible: false })
  }


  renderList(list) {
    // console.log(list);
    return list.map((request) => {

      return {
        key: request.id ? `${request.id}` : "N/A",
        action: <div>  <Button type="danger" size="small" style={{ margin: '0 8px 0 8px' }} onClick={() => { this.rejectRequest(request); }}>DECLINE</Button>
          <Button
            type="primary"
            size="small"
            style={{ margin: '0 8px 0 8px' }}
            onClick={() => { this.acceptRequest(request) }}>
            ACCEPT
                </Button></div>,
        dealer_name: request.dealer_name ? `${request.dealer_name}` : "N/A",
        label: request.label ? `${request.label}` : "N/A",
        credits: request.credits ? `${request.credits}` : "N/A",
      }
    });

  }

  render() {
    // console.log("header devices count", this.props.devices);

    // const userMenuOptions = (
    //   <ul className="">
    //     {/* <Link to="/profile"><li>My Account</li></Link> */}
    //     {/* <li>Connections</li> 
    //     <li onClick={() => this.props.logout()}>Logout
    //     </li>*/}
    //   </ul>
    // );

    return (

      <div className="gx-flex-row gx-align-items-center gx-mb-4 gx-avatar-row side_bar_main">
        <Popover placement="bottomRight" trigger="lskdjsl">
          <Avatar
            src={require("../../assets/images/profile-image.png")}
            className="gx-size-40 gx-pointer gx-mr-3"
            alt=""
          />
          <span className="gx-avatar-name">{(localStorage.getItem('name') === '' || localStorage.getItem('name') === null || localStorage.getItem('name') === undefined) ? localStorage.getItem('dealerName') : localStorage.getItem('name')}
            {/* <i className="icon icon-chevron-down gx-fs-xxs gx-ml-2" /> */}
          </span>
        </Popover>

        <ul className="gx-app-nav bell_icon">
          {/* <li><i className="icon icon-search-new" /></li> */}
          {/* <li><i className="icon icon-chat-new" /></li> */}
          <li>
            <a className="head-example">
              <Badge count={this.props.requests.length}>
                <i
                  className="icon icon-notification notification_icn"
                  onClick={() => this.showModal()}
                />
              </Badge>
            </a>
          </li>
        </ul>
        <Modal
          width={1000}
          maskClosable={false}
          visible={this.state.visible}
          onOk={this.handleCancel}
          onCancel={this.handleCancel}
        >
          <h1>CREDITS CASH REQUESTS</h1>
          <Table
            bordered
            columns={columns}
            style={{ marginTop: 20 }}
            dataSource={this.renderList(this.state.NewRequests)}

          />
        </Modal>
      </div>

    )

  }
}



export default UserProfile;

function showConfirm(_this, msg, action, request) {
  confirm({
    title: 'WARNNING!',
    content: msg,
    okText: "Confirm",
    onOk() {
      action(request);
    },
    onCancel() { },
  });
}
