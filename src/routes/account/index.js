
import React, { Component, Fragment } from "react";

// import {Route, Switch} from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from 'react-router-dom';
import styles from './account.css'

import {
    importCSV,
    exportCSV,
    releaseCSV,
    getUsedPGPEmails,
    getUsedChatIds,
    getUsedSimIds,
    insertNewData
} from "../../appRedux/actions/Account";

import {
    Card,
    Button,
    Row,
    Col, Icon, Modal, Divider
} from "antd";

const confirm = Modal.confirm;
const success = Modal.success
const error = Modal.error

class Account extends Component {
    constructor(props) {
        super(props);
        // this.state = {}
    }

    showImportModal = (visible, fieldName = "", fieldValue = "") => {
        // console.log(fieldName);
        this.setState({
            visible: visible,
            fieldName: fieldName,
            fieldValue: fieldValue
        });
    }


    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
    }

    render() {

        return (

            <div>
                <Row justify='center' style={{ backgroundColor: '#012346', height: 110, paddingTop: 20 }}>
                </Row>
                <div style={{ marginTop: -40 }}>
                    <Row>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8} >
                            <div>
                                <Link to="/account/managedata">
                                    <Card className="manage_ac" style={{ borderRadius: 12 }}>
                                        <div>
                                            <h2 style={{ textAlign: "center" }}>Manage Data</h2>
                                            <Divider className="mb-0" />
                                            <Row style={{ padding: '12px 0 0px' }}>
                                                <Col span={7} className="" style={{ textAlign: "center" }}>
                                                    <Icon type="form" className="and_icon" />
                                                </Col>
                                                <Col span={16} style={{ padding: 0 }} className="crd_txt">
                                                    <p style={{}}><span className="diamond_icon">&#9670;</span>Manage data such as SIM ID, <br style={{ marginLeft: 4 }} />CHAT ID, PGP Email, etc..</p>
                                                    <p style={{}}><span className="diamond_icon">&#9670;</span>Upload/View/Edit your data</p>
                                                    <p><span className="diamond_icon">&#9670;</span>Release previously used data back to system</p>
                                                    <p className="more_txt">and more...</p>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Card>
                                    <Button type="primary" size="small" className="open_btn">Open</Button>
                                </Link>

                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <div>
                                <Link to="/account/billing">
                                    <Card className="manage_ac" style={{ borderRadius: 12 }}>
                                        <div>
                                            <h2 style={{ textAlign: "center" }}>Billing</h2>
                                            <Divider className="mb-0" />
                                            <Row style={{ padding: '12px 0 0px' }}>
                                                <Col span={7} className="" style={{ textAlign: "center" }}>
                                                    <Icon type="dollar" className="and_icon" />
                                                </Col>
                                                <Col span={16} style={{ padding: 0 }} className="crd_txt">
                                                    <p style={{}}><span className="diamond_icon">&#9670;</span>View credit purchase history</p>
                                                    <p style={{}}><span className="diamond_icon">&#9670;</span>View package purchase history</p>
                                                    <p><span className="diamond_icon">&#9670;</span>Mark paid pending Cash sales</p>
                                                    <p className="more_txt">and more...</p>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Card>
                                    <Button type="primary" size="small" className="open_btn">Open</Button>
                                </Link>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <div>
                                <div className="contenar">
                                    <a href="javascript:void(0)">
                                        <Card style={{ borderRadius: 12 }} className="manage_ac">
                                            <div className="profile_table image_1">
                                                <Fragment>
                                                    <Row>
                                                        <div className="col-md-12 ac_card">
                                                            <h2 style={{ textAlign: "center" }}> <Icon type="credit-card" /> Payment Gateway</h2>
                                                            <Divider className="mb-0" />
                                                            <div className="crd_txt">
                                                                <p><span className="diamond_icon">&#9670;</span>Add/edit payment gateway</p>
                                                                <p><span className="diamond_icon">&#9670;</span>Set permissions</p>
                                                                <p><span className="diamond_icon">&#9670;</span>Customize prices and packages</p>
                                                                <p className="more_txt">and more...</p>
                                                            </div>
                                                        </div>
                                                    </Row>
                                                </Fragment>
                                            </div>
                                        </Card>
                                    </a>
                                    <div className="middle">
                                        <div className="text text2">Coming Soon</div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>

            </div >


        );

    }
}

// export default Account;

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        insertNewData: insertNewData
    }, dispatch);
}
var mapStateToProps = ({ account, devices }) => {
    // console.log(account, "sim_ids");
    return {
        msg: account.msg,
        showMsg: account.showMsg,
        sim_ids: account.sim_ids,
        chat_ids: account.chat_ids,
        pgp_emails: account.pgp_emails,
        used_pgp_emails: account.used_pgp_emails,
        used_chat_ids: account.used_chat_ids,
        used_sim_ids: account.used_sim_ids,
        duplicate_data_type: account.duplicate_data_type,
        duplicate_ids: account.duplicate_ids,
        duplicate_modal_show: account.duplicate_modal_show,
        newData: account.newData
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);