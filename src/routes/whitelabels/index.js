import React, { Component, Fragment } from "react";
// import {Route, Switch} from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col, Icon, Modal, Form, Input, Upload, message, Table, Select, Divider } from "antd";

import { getWhiteLabelInfo, editWhiteLabelInfo } from '../../appRedux/actions';
import EditWhiteLabel from "./components/EditWhiteLabel";

class WhiteLabels extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info_modal: false,
            edit_modal: false
        }
    }

    showInfoModal = (e, visible) => {
        this.setState({
            info_modal: visible,
            
        })
    }
    editInfoModal = (e, visible) => {
        this.setState({
            edit_modal: visible
        })
    }

    getWhiteLabelInfo= (id)=> {
        console.log(id, 'ds');
        let _this = this;

        setTimeout(function () {
            _this.props.getWhiteLabelInfo(id)
          }, 1000);

        
    }

    componentDidMount() {
        this.props.getWhiteLabelInfo(this.props.id);
    }

    render() {
        
        return (
            <div>
                <Row justify='center' style={{ backgroundColor: '#012346', height: 110, paddingTop: 20 }}>
                </Row>
                <div style={{ marginTop: -40 }}>
                    <Row>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <div>
                                <div className="contenar">
                                    <a href="javascript:void(0)" onClick={(e) => { this.showInfoModal(e, true) }} >
                                        <Card className="manage_sec" style={{ borderRadius: 12 }}>
                                            <div>
                                                <h2 style={{ textAlign: "center" }}>Model ID</h2>
                                                <Divider className="mb-0" />

                                            </div>
                                            <Button type="primary" size="small" className="open_btn">Open</Button>
                                        </Card>
                                    </a>

                                    <Modal
                                        maskClosable={false}
                                        destroyOnClose={true}
                                        title="WhiteLabel Info"
                                        visible={this.state.info_modal}
                                        // onOk={this.InsertNewData}
                                        onCancel={(e) => {
                                            this.showInfoModal(e, false);
                                        }}
                                    // okText='Submit'
                                    // okButtonProps={{
                                    //     disabled: this.state.newData.length ? false : true
                                    // }}
                                    >
                                        <Button
                                            type="primary"
                                            size="small"
                                            onClick={(e) => {
                                                this.editInfoModal(e, true)
                                            }}
                                        >
                                            Edit
                                        </Button>
                                        <Table
                                            size='small'
                                            columns={[
                                                {
                                                    // title: 'Name',
                                                    dataIndex: 'name',
                                                    key: 'name',
                                                },
                                                {
                                                    // title: 'Name',
                                                    dataIndex: 'command',
                                                    key: 'command',
                                                },
                                                {
                                                    // title: 'Value',
                                                    dataIndex: 'value',
                                                    key: 'value',
                                                },
                                                // {
                                                //     dataIndex: 'action',
                                                //     key: 'action'
                                                // }
                                            ]}
                                            pagination={false}
                                            dataSource={[
                                                {
                                                    key: 1,
                                                    name: (<b>Model ID</b>),
                                                    // value: '',
                                                    value: this.props.whiteLabelInfo.model_id,
                                                },
                                                {
                                                    key: 2,
                                                    name: (<b>Command</b>),
                                                    // value: '',
                                                    value: this.props.whiteLabelInfo.command_name,
                                                },
                                                {
                                                    key: 3,
                                                    name: (<b>APK</b>),
                                                    value: this.props.whiteLabelInfo.apk_file,
                                                },
                                            ]}
                                        />

                                    </Modal>
                                    <EditWhiteLabel
                                        whiteLabelInfo = {this.props.whiteLabelInfo}
                                        editInfoModal = {this.editInfoModal}
                                        edit_modal = {this.state.edit_modal}
                                        editWhiteLabelInfo={this.props.editWhiteLabelInfo}
                                        getWhiteLabelInfo={this.getWhiteLabelInfo}
                                        showInfoModal={this.showInfoModal}
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <div>
                                <div className="contenar">
                                    <a href="javascript:void(0)" >
                                        <Card style={{ borderRadius: 12 }} className="manage_ac">
                                            <div className="profile_table image_1">
                                                <Fragment>
                                                    <Row>
                                                        <div className="col-md-12 ac_card">
                                                            <h2 style={{ textAlign: "center" }}> <Icon type="branches" />  Credit</h2>
                                                            <Divider className="mb-0" />
                                                            <div className="crd_txt">
                                                                <p><span className="diamond_icon">&#9670;</span>Distribute tokens</p>
                                                                <p><span className="diamond_icon">&#9670;</span>Set prices and delay for each token</p>
                                                                <p><span className="diamond_icon">&#9670;</span>Set permissions for Tokens</p>
                                                                <p className="more_txt">and more...</p>
                                                            </div>
                                                        </div>
                                                    </Row>
                                                </Fragment>
                                            </div>
                                        </Card>
                                    </a>
                                    <div className="middle">
                                        <div className="text">Coming Soon</div>
                                    </div>
                                </div>
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
                                                            <h2 style={{ textAlign: "center" }}> <Icon type="credit-card" /> FailSaif APK</h2>
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
                                        <div className="text">Coming Soon</div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <div>
                                <div className="contenar">
                                    <a href="javascript:void(0)" >
                                        <Card style={{ borderRadius: 12 }} className="manage_ac">
                                            <div className="profile_table image_1">
                                                <Fragment>
                                                    <Row>
                                                        <div className="col-md-12 ac_card">
                                                            <h2 style={{ textAlign: "center" }}> <Icon type="branches" />  PGP Emails</h2>
                                                            <Divider className="mb-0" />
                                                            <div className="crd_txt">
                                                                <p><span className="diamond_icon">&#9670;</span>Distribute tokens</p>
                                                                <p><span className="diamond_icon">&#9670;</span>Set prices and delay for each token</p>
                                                                <p><span className="diamond_icon">&#9670;</span>Set permissions for Tokens</p>
                                                                <p className="more_txt">and more...</p>
                                                            </div>
                                                        </div>
                                                    </Row>
                                                </Fragment>
                                            </div>
                                        </Card>
                                    </a>
                                    <div className="middle">
                                        <div className="text">Coming Soon</div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <div>
                                <div className="contenar">
                                    <a href="javascript:void(0)" >
                                        <Card style={{ borderRadius: 12 }} className="manage_ac">
                                            <div className="profile_table image_1">
                                                <Fragment>
                                                    <Row>
                                                        <div className="col-md-12 ac_card">
                                                            <h2 style={{ textAlign: "center" }}> <Icon type="branches" />  SIM IDs</h2>
                                                            <Divider className="mb-0" />
                                                            <div className="crd_txt">
                                                                <p><span className="diamond_icon">&#9670;</span>Distribute tokens</p>
                                                                <p><span className="diamond_icon">&#9670;</span>Set prices and delay for each token</p>
                                                                <p><span className="diamond_icon">&#9670;</span>Set permissions for Tokens</p>
                                                                <p className="more_txt">and more...</p>
                                                            </div>
                                                        </div>
                                                    </Row>
                                                </Fragment>
                                            </div>
                                        </Card>
                                    </a>
                                    <div className="middle">
                                        <div className="text">Coming Soon</div>
                                    </div>
                                </div>
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
                                                            <h2 style={{ textAlign: "center" }}> <Icon type="credit-card" /> Chat IDs</h2>
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
                                        <div className="text">Coming Soon</div>
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
        getWhiteLabelInfo: getWhiteLabelInfo,
        editWhiteLabelInfo: editWhiteLabelInfo
    }, dispatch);
}

var mapStateToProps = ({ whiteLabels }, otherProps) => {
    return {
        whiteLabelInfo: whiteLabels.whiteLabel
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(WhiteLabels);