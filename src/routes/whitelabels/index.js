import React, { Component, Fragment } from "react";
// import {Route, Switch} from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { SECURE_LAUNCHER, SC } from '../../constants/Constants';
import { checkValue } from '../utils/commonUtils'
import { Link } from 'react-router-dom';
import {
    Card,
    Button, Row, Col, Icon, Modal, Form, Input, Upload, message, Table, Select, Divider
} from "antd";

import style from "./whitelabels.css"

import { getWhiteLabelInfo, editWhiteLabelInfo } from '../../appRedux/actions';
import EditWhiteLabel from "./components/EditWhiteLabel";
import LoadIDsModal from "./components/LoadIDsModal";

class WhiteLabels extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info_modal: false,
            edit_modal: false,
            secureLouncer: {},
            scApk: {},
        }
    }

    showInfoModal = (e, visible) => {
        if (this.props.whiteLabelInfo.apks.length && visible) {
            let index = this.props.whiteLabelInfo.apks.findIndex(apk => apk.package_name === SECURE_LAUNCHER)
            if (index > -1) {
                this.setState({
                    secureLouncer: this.props.whiteLabelInfo.apks[index],
                    info_modal: visible
                })
            }

            let index2 = this.props.whiteLabelInfo.apks.findIndex(apk => apk.package_name === SC)
            if (index2 > -1) {
                this.setState({
                    scApk: this.props.whiteLabelInfo.apks[index2],
                    info_modal: visible
                })
            }
            else {
                this.setState({
                    info_modal: visible
                })
            }
        } else {
            this.setState({
                info_modal: visible,

            })
        }

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
        console.log(this.props.whiteLabelInfo, 'whitelables', this.state.secureLouncer)
        console.log('label id is: ', this.props.whiteLabelInfo.id)
        // let label_id = this.props.whiteLabelInfo.id;
        // console.log('ref func ', this.refs.loadidsofModal)
        return (
            <div>

                <Row
                    justify='center'
                    style={{ backgroundColor: '#012346', height: 110, paddingTop: 20 }}
                >
                    <h1 style={{ color: 'white' }} className="ml-16">{this.props.whiteLabelInfo.name}</h1>
                </Row>
                <div style={{ marginTop: -40 }}>
                    <Row>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                            <div>
                                <div className="contenar">
                                    <Link to="#" onClick={(e) => { this.showInfoModal(e, true) }} >
                                        <Card className="manage_sec" style={{ borderRadius: 12 }}>
                                            <div>
                                                <h2 style={{ textAlign: "center" }}>Model ID</h2>
                                                <Divider className="mb-0" />

                                            </div>
                                            <Button type="primary" size="small" className="open_btn1">Open</Button>
                                        </Card>
                                    </Link>
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
                                                    value: checkValue(this.props.whiteLabelInfo.model_id),
                                                },
                                                {
                                                    key: 2,
                                                    name: (<b>Command</b>),
                                                    // value: '',
                                                    value: checkValue(this.props.whiteLabelInfo.command_name),
                                                },
                                                {
                                                    key: 3,
                                                    name: (<b>Launcher (APK)</b>),
                                                    value: checkValue(this.state.secureLouncer.apk_file),
                                                },
                                                {
                                                    key: 4,
                                                    name: (<b>Version Name</b>),
                                                    // value: '',
                                                    value: checkValue(this.state.secureLouncer.version_name),
                                                },
                                                {
                                                    key: 5,
                                                    name: (<b>Size</b>),
                                                    // value: '',
                                                    value: checkValue(this.state.secureLouncer.apk_size),
                                                },
                                                {
                                                    key: 6,
                                                    name: (<b>SC (APK)</b>),
                                                    value: checkValue(this.state.scApk.apk_file),
                                                },
                                                {
                                                    key: 7,
                                                    name: (<b>Version Name</b>),
                                                    // value: '',
                                                    value: checkValue(this.state.scApk.version_name),
                                                },
                                                {
                                                    key: 8,
                                                    name: (<b>Size</b>),
                                                    // value: '',
                                                    value: checkValue(this.state.scApk.apk_size),
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
                        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                            <div>
                                <div className="contenar">
                                    <a href="javascript:void(0)" >
                                        <Card className="manage_sec" style={{ borderRadius: 12 }}>
                                            <div>
                                                <h2 style={{ textAlign: "center" }}>BYOD APK</h2>
                                                <Divider className="mb-0" />

                                            </div>
                                            <Button type="primary" size="small" className="open_btn1">Open</Button>
                                        </Card>
                                    </a>
                                    <div className="middle">
                                        <div className="text">Coming Soon</div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                            <div>
                                <div className="contenar">
                                    <a href="javascript:void(0)">
                                        <Card className="manage_sec" style={{ borderRadius: 12 }}>
                                            <div>
                                                <h2 style={{ textAlign: "center" }}>FailSafe APK</h2>
                                                <Divider className="mb-0" />

                                            </div>
                                            <Button type="primary" size="small" className="open_btn1">Open</Button>
                                        </Card>
                                    </a>
                                    <div className="middle">
                                        <div className="text">Coming Soon</div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                            <div>
                                <div className="contenar">
                                    <a href="javascript:void(0)" >
                                        <Card className="manage_sec" style={{ borderRadius: 12 }}>
                                            <div>
                                                <h2 style={{ textAlign: "center" }}>Database Backups</h2>
                                                <Divider className="mb-0" />

                                            </div>
                                            <Button type="primary" size="small" className="open_btn1">Open</Button>
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
                        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                            <div>
                                <div className="contenar">
                                    <a href="javascript:void(0)" >
                                        <Card className="manage_sec" style={{ borderRadius: 12 }}>
                                            <div>
                                                <h2 style={{ textAlign: "center" }}>Promo</h2>
                                                <Divider className="mb-0" />

                                            </div>
                                            <Button type="primary" size="small" className="open_btn1">Open</Button>
                                        </Card>
                                    </a>
                                    <div className="middle">
                                        <div className="text">Coming Soon</div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                            <div>
                                <div className="contenar">
                                    <a href="javascript:void(0)">
                                        <Card className="manage_sec" style={{ borderRadius: 12 }}>
                                            <div>
                                                <h2 style={{ textAlign: "center" }}>Set Prices</h2>
                                                <Divider className="mb-0" />

                                            </div>
                                            <Button type="primary" size="small" className="open_btn1">Open</Button>
                                        </Card>
                                    </a>
                                    <div className="middle">
                                        <div className="text">Coming Soon</div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} onClick={() => this.refs.loadidsofModal.getWrappedInstance().showModal(this.props.whiteLabelInfo)}>
                            <div>
                                {/* className="contenar" */}
                                <div className="">
                                    <a href="javascript:void(0)">
                                        <Card className="manage_sec" style={{ borderRadius: 12 }}>
                                            <div>
                                                <h2 style={{ textAlign: "center" }}>Load ID's</h2>
                                                <Divider className="mb-0" />
                                            </div>
                                            <Button type="primary" size="small" className="open_btn1">Open</Button>
                                        </Card>
                                    </a>
                                    <div className="middle">
                                        <div className="text">Coming Soon</div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <LoadIDsModal ref="loadidsofModal" />

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