import React, { Component, Fragment } from "react";
// import {Route, Switch} from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col, Icon, Modal, Form, Input, Upload, message, Table, Select, Divider } from "antd";

import style from "./whitelabels.css"

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

    getWhiteLabelInfo = (id) => {
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
                <Row justify='center' style={{ backgroundColor: '#012346', height: 110, paddingTop: 20 }}></Row>
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
                                        </Card>
                                        <Button type="primary" size="small" className="open_btn">Open</Button>
                                    </a>
                                    <Modal
                                        maskClosable={false}
                                        destroyOnClose={true}
                                        title={
                                            <div>
                                                <span>WhiteLabel Info</span>
                                                <Button
                                                    type="primary"
                                                    size="small"
                                                    style={{ float: "right", marginRight: 32 }}
                                                    onClick={(e) => {
                                                        this.editInfoModal(e, true)
                                                    }}
                                                >Edit</Button>
                                            </div>
                                        }
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

                                        <Table
                                            bordered
                                            showHeader={false}
                                            size='small'
                                            className="model_id_table"
                                            columns={[
                                                {
                                                    // title: 'Name',
                                                    dataIndex: 'name',
                                                    key: 'name',
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
                                        whiteLabelInfo={this.props.whiteLabelInfo}
                                        editInfoModal={this.editInfoModal}
                                        edit_modal={this.state.edit_modal}
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
                                        <Card className="manage_sec" style={{ borderRadius: 12 }}>
                                            <div>
                                                <h2 style={{ textAlign: "center" }}>Credit</h2>
                                                <Divider className="mb-0" />

                                            </div>
                                        </Card>
                                        <Button type="primary" size="small" className="open_btn">Open</Button>
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
                                        <Card className="manage_sec" style={{ borderRadius: 12 }}>
                                            <div>
                                                <h2 style={{ textAlign: "center" }}>FailSaif APK</h2>
                                                <Divider className="mb-0" />

                                            </div>
                                        </Card>
                                        <Button type="primary" size="small" className="open_btn">Open</Button>
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
                                        <Card className="manage_sec" style={{ borderRadius: 12 }}>
                                            <div>
                                                <h2 style={{ textAlign: "center" }}>PGP Emails</h2>
                                                <Divider className="mb-0" />

                                            </div>
                                        </Card>
                                        <Button type="primary" size="small" className="open_btn">Open</Button>
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
                                        <Card className="manage_sec" style={{ borderRadius: 12 }}>
                                            <div>
                                                <h2 style={{ textAlign: "center" }}>SIM IDs</h2>
                                                <Divider className="mb-0" />

                                            </div>
                                        </Card>
                                        <Button type="primary" size="small" className="open_btn">Open</Button>
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
                                        <Card className="manage_sec" style={{ borderRadius: 12 }}>
                                            <div>
                                                <h2 style={{ textAlign: "center" }}>Chat IDs</h2>
                                                <Divider className="mb-0" />

                                            </div>
                                        </Card>
                                        <Button type="primary" size="small" className="open_btn">Open</Button>
                                    </a>
                                    <div className="middle">
                                        <div className="text">Coming Soon</div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>

                </div>

            </div>

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