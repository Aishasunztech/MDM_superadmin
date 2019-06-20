import React, { Component } from "react";
import { connect } from "react-redux";
import { Avatar, Popover, Badge } from "antd";
import { Link } from "react-router-dom";
import { logout, } from "appRedux/actions/Auth";

import { Icon } from "antd";
import socketIOClient from "socket.io-client";
import { BASE_URL } from "../../constants/Application"
class UserProfile extends Component {


  render() {
    // console.log("header devices count", this.props.devices);

    const userMenuOptions = (
      <ul className="">
        {/* <Link to="/profile"><li>My Account</li></Link> */}
        {/* <li>Connections</li> 
        <li onClick={() => this.props.logout()}>Logout
        </li>*/}
      </ul>
    );

    return (

      <div className="gx-flex-row gx-align-items-center gx-mb-4 gx-avatar-row side_bar_main">
        {/* <Popover placement="bottomRight" content={userMenuOptions} trigger="click"> */}
          <Avatar src={require("../../assets/images/profile-image.png")}
            className="gx-size-40 gx-pointer gx-mr-3" alt="" />
          <span className="gx-avatar-name">{(localStorage.getItem('name') === '' || localStorage.getItem('name') === null || localStorage.getItem('name') === undefined) ? localStorage.getItem('dealerName') : localStorage.getItem('name')}
            {/* <i className="icon icon-chevron-down gx-fs-xxs gx-ml-2" /> */}

          </span>
        {/* </Popover> */}

        <ul className="gx-app-nav bell_icon">
          {/* <li><i className="icon icon-search-new" /></li> */}
          {/* <li><i className="icon icon-chat-new" /></li> */}
          <li>
            <a className="head-example">
              <Badge>
                <i
                  className="icon icon-notification notification_icn"
                  // onClick={() => this.showNotification()}
                />
              </Badge>
            </a>
          </li>
        </ul>
      </div>

    )

  }
}



export default UserProfile;
