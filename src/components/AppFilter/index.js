import React, { Component, Fragment } from 'react'
import { Card, Button, Row, Col, Select, Input, Checkbox, Icon } from "antd";
// import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import styles from "./appfilter.css";
import Picky from 'react-picky';
import 'react-picky/dist/picky.css';
import { withRouter, Redirect, Link } from 'react-router-dom';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    checkComponent,
    getUser
} from "../../appRedux/actions/Auth";

import {
    // importCSV,
    exportCSV,
    // releaseCSV,
    // getUsedPGPEmails,
    // getUsedChatIds,
    // getUsedSimIds,
    // insertNewData
} from "../../appRedux/actions/Account";


class AppFilter extends Component {
    constructor(props) {
        super(props);
        // console.log('appfilter constructor', this.props.selectedOptions);
        this.state = {
            selectedDisplayValues: [],
            DisplayPages: this.props.defaultPagingValue,
        }
    }

    componentDidMount() {
        //  console.log("componentDidMount selectedOptions appfilter", this.props.selectedOptions);
        this.setState({
            selectedDisplayValues: this.props.selectedOptions,
        });
        //this.setDropdowns(this.props.selectedOptions);
        // alert('did mount ', )
        // this.setDropdowns(this.props.selectedOptions);
        // console.log("componentDidMount12", this.state.selectedDisplayValues);
        // this.props.handleCheckChange(this.props.selectedOptions);
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps.selectedOptions, 'component will recieve props', this.props.selectedOptions);
        if (this.props.defaultPagingValue !== nextProps.defaultPagingValue) {
            // console.log("Will Recieve Props", nextProps.defaultPagingValue, this.props.defaultPagingValue);
            this.setPagination(nextProps.defaultPagingValue)
        }
        if (this.props.selectedOptions !== nextProps.selectedOptions) {
            //  console.log(nextProps.selectedOptions, "componentWillReceiveProps selectedOptions", this.props.selectedOptions);
            // console.log("componentWillReceiveProps", this.state.selectedDisplayValues);
            // alert('recive props', nextProps.selectedOptions);
            // console.log(' recive props set dropdwon', nextProps);
            this.setDropdowns(nextProps.selectedOptions);

            //  this.props.handleCheckChange();
        }
    }

    setDropdowns(values) {
        // console.log('values of undefined', values);
        this.setState({
            selectedDisplayValues: values,
        });
        // console.log('values:',this.state.selectedDisplayValues);
        this.props.handleCheckChange(values);
        //  alert('set dropdwon');
        // console.log('set dropdwon');
    }
    setPagination(value) {
        // console.log("Set State", value);
        this.setState({
            DisplayPages: value
        })
        this.props.handlePagination(value);
    }

    handlePagination(value) {
        // console.log(value);
        this.setState({ DisplayPages: value })
        this.props.handlePagination(value);
    }

    handleComponentSearch = (value) => {
        this.props.handleComponentSearch(value);
    }

    exportCSV = (fieldName) => {
        this.props.exportCSV(fieldName);
    }

    render() {
        // console.log(" Current State", this.props)
        let fullScreenClass1 = "";
        let fullScreenClass2 = "";

        if (this.props.isAddButton === false) {
            fullScreenClass1 = "col-md-3";
            fullScreenClass2 = "col-md-3";
        } else {
            fullScreenClass1 = "col-md-3";
            fullScreenClass2 = "col-md-2";
        }

        // console.log(this.props.options);
        const Search = Input.Search;
        //  console.log('render ...', this.props.selectedOptions);
        return (
            // className="gutter-example"
            <Card >
                <Row gutter={16} className="filter_top">
                    <Col className="col-md-3 col-sm-6 col-xs-12">
                        <div className="gutter-box">
                            <h1>Manage Data</h1>

                        </div>
                    </Col>
                    <Col className="col-md-7 col-sm-6 col-xs-12">
                        <div className="gutter-box">
                            <Search

                                placeholder="Search..."
                                onChange={e => this.handleComponentSearch(e.target.value)}
                                style={{ width: '100%' }}
                            />
                        </div>
                    </Col>
                    {/* <Col className="col-md-2 col-sm-6 col-xs-12">
                        <div className="gutter-box">
                            <Select
                                value="Import"
                                //  defaultValue={this.state.DisplayPages}
                                style={{ width: '100%' }}
                                // onSelect={value => this.setState({DisplayPages:value})}
                                // onChange={value => this.handlePagination(value)}
                            >
                                <Select.Option value="10" >10</Select.Option>
                                <Select.Option value="20">20</Select.Option>
                                <Select.Option value="30">30</Select.Option>
                                <Select.Option value="50">50</Select.Option>
                                <Select.Option value="100">100</Select.Option>
                            </Select>
                        </div>
                    </Col> */}

                    <Col className="col-md-2 col-sm-6 col-xs-12">
                        <div className="gutter-box">
                            <Select
                                value="Export"
                                //  defaultValue={this.state.DisplayPages}
                                style={{ width: '100%' }}
                                // onSelect={value => this.setState({DisplayPages:value})}
                                // onChange={value => this.handlePagination(value)}
                            >
                                <Select.Option value="10" 
                                 onClick={() => {
                                    this.exportCSV('sim_ids');
                                }}
                                >Export SIM IDs</Select.Option>
                                <Select.Option value="20"
                                onClick={() => {
                                    this.exportCSV('chat_ids');
                                }}
                                >Export CHAT IDs</Select.Option>
                                <Select.Option value="30"
                                onClick={() => {
                                    this.exportCSV('pgp_emails');
                                }}
                                >Export PGP Emails</Select.Option>
                                <Select.Option value="50"
                                // onClick={() => {
                                //     this.exportCSV('vpn');
                                // }}
                                >Export VPNs</Select.Option>
                            </Select>
                        </div>
                    </Col>


                </Row>
            </Card>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        exportCSV: exportCSV,
        // checkComponent: checkComponent,
        // getUser: getUser
    }, dispatch);
}
var mapStateToProps = ({ routing, auth }, otherProps) => {
    // console.log("restricted route", routing);
    // console.log("restricted auth", auth);
    // console.log("restricted other", otherProps);
    return {
        // routing: routing,
        pathname: routing.location.pathname,
        // authUser: auth.authUser,
        // isAllowed: auth.isAllowed
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppFilter));

