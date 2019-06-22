import React, { Component } from "react";
import { Menu, Icon, Modal } from "antd";
import { Link } from "react-router-dom";

import { bindActionCreators } from "redux";

import SidebarLogo from "./SidebarLogo";

import Auxiliary from "util/Auxiliary";
import UserProfile from "./UserProfile";

import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";
import { connect } from "react-redux";
import {
  logout,
  getWhiteLabels
} from '../../appRedux/actions/';


import styles from './styles.css';


class SidebarContent extends Component {

  constructor(props) {
    super(props);

  }
  logout = () => {
    let _this = this;
    Modal.confirm({
      title: 'Are you sure you want to logout?',
      okText: 'Yes',
      cancelText: 'No',

      onOk() {
        _this.props.logout()
        // console.log('OK');
      },
      onCancel() {
        // console.log('Cancel');
      },
    })
  }
  getNoHeaderClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
      return "gx-no-header-notifications";
    }
    return "";
  };
  getNavStyleSubMenuClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return "gx-no-header-submenu-popup";
    }
    return "";
  };
  handleClick = (e) => {

  }
  render() {
    // console.log(addDevice)
    const { themeType, navStyle, pathname } = this.props;

    const selectedKeys = pathname.substr(1);
    const defaultOpenKeys = selectedKeys.split('/')[1];

    return (
      <Auxiliary>
        <SidebarLogo />
        <div className="gx-sidebar-content ">
          <div className={`gx-sidebar-notifications ${this.getNoHeaderClass(navStyle)} `}>
            <UserProfile
              logout={this.props.logout}
            />
            {/* <AppsNavigation/> */}
          </div>
          <Menu
            defaultOpenKeys={['labelsMenu']}
            onClick={this.handleClick}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
            mode="inline"
          >

            <Menu.Item key="devices">
              <Link to="/devices">
                <i className="icon icon-mobile" >
                  <i className="fa fa-mobile" aria-hidden="true"></i>
                </i>
                <IntlMessages id="sidebar.devices" />
              </Link>
            </Menu.Item>

            <Menu.Item key="labels" disabled style={{ cursor: "auto" }}>
              <Link to="#">
                <span>
                  <i className="icon" />
                  <IntlMessages id="sidebar.labels" />
                </span>
              </Link>
            </Menu.Item>
            <Menu.SubMenu
              key="labelsMenu"
              disabled
              className={this.getNavStyleSubMenuClass(navStyle)}
            >
              {
                this.props.whiteLabels.map((whiteLabel) => {
                  return (
                    <Menu.Item key={whiteLabel.name}>
                      <Link to={whiteLabel.route_uri}>
                        {/* <i className="icon icon-crypto" /> */}
                        {whiteLabel.name}
                      </Link>
                    </Menu.Item>
                  );

                })
              }

            </Menu.SubMenu>


            <Menu.Item key="account">
              <Link to="/account">
                <i className="icon icon-profile2" />
                <IntlMessages id="sidebar.account" />
              </Link>
            </Menu.Item>


            <Menu.Item key="tools">
              <Link to="/tools">
              <i className="icon icon-profile2" style={{visibility: 'hidden'}} />
                <IntlMessages id="sidebar.tools" />
              </Link>
            </Menu.Item>

            <Menu.Item key="logout"
              onClick={
                (e) => { this.logout() }
              }
            >
              {/* <Link to="/logout"> */}
              <i className="icon">
                <i className="fa fa-sign-out ml-6" aria-hidden="true"></i>
              </i>
              <IntlMessages id="sidebar.logout" />
              {/* </Link> */}
            </Menu.Item>
          </Menu>
        </div>
      </Auxiliary>
    );
  }
}
;

const mapStateToProps = ({ settings, sidebarMenu }) => {
  const { navStyle, themeType, locale, pathname } = settings;

  return { navStyle, themeType, locale, pathname, whiteLabels: sidebarMenu.whiteLabels }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getWhiteLabels: getWhiteLabels,
    logout: logout
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContent);

