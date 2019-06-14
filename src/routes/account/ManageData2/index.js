import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import IntlMessages from "util/IntlMessages";
// import AppFilter from '../../../components/AppFilter';

import AppFilter from '../../../components/AppFilter';
// import EditDealer from './components/editDealer';
import CircularProgress from "components/CircularProgress/index";

import { connect } from "react-redux";
import Highlighter from 'react-highlight-words';
import { Input, Button, Icon, Select } from "antd";

import { bindActionCreators } from "redux";

class ManageData extends Component {
  constructor(props) {
    super(props);

  }


  render() {
    return (
      <Fragment>
        <Fragment>
          <div>aba</div>
          {/* <AppFilter
            handleFilterOptions={this.handleFilterOptions}
            selectedOptions={this.props.selectedOptions}
            searchPlaceholder="Search Device"
            defaultPagingValue={this.state.defaultPagingValue}
            addButtonText="Add Device"
            options={this.props.options}
            // isAddButton={this.props.user.type !== ADMIN}
            // AddDeviceModal={true}
            // disableAddButton={this.props.user.type === ADMIN}
            // toLink="add-device"
            handleDeviceModal={this.handleDeviceModal}
            handleUserModal={this.handleUserModal}
            handleCheckChange={this.handleCheckChange}
            handlePagination={this.handlePagination}
            handleComponentSearch={this.handleComponentSearch}
          /> */}
        </Fragment>
      </Fragment>
    )
  }
}


export default ManageData;