import React, { Component } from "react";
import { Menu, Icon } from "antd";
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
              logout = {this.props.logout}
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

            <Menu.Item key="labels" disabled>

              <Link to="/labels">
                <span>
                  <i className="icon icon-dasbhoard" />
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
                <i className="icon icon-crypto" />
                Account
                </Link>
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

