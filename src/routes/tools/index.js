import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Card, Button, Row, Col, Table, Modal } from "antd";
import WhitelabelList from "./components/WhitelabelList";

import { getAllWhiteLabels, restartWhiteLabel, checkPass, resetConfirmReboot } from "../../appRedux/actions";

class Tools extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rebootModal: false,
            tools_modal: false
        }
    }

    componentDidMount() {
        this.props.getWhiteLabels();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.whiteLabels.length) {
            this.setState({
                whiteLables: nextProps.whiteLabels
            })
        }
    }
    showRebootModel(visible) {
        this.setState({
            rebootModal: visible
        })
    }
    showToolsModal(visible) {
        this.setState({
            tools_modal: visible,
        });
    }
    render() {
        return (
            <div>

                <div>

                    <Row
                        justify='center'
                        style={{ backgroundColor: '#012346', height: 110, paddingTop: 20 }}
                    >
                        <h1 style={{ color: 'white' }} className="ml-16"></h1>
                    </Row>
                    <div style={{ marginTop: -40 }}>
                        <Row>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6} onClick={() => this.showRebootModel(true)}>
                                <div>
                                    <div>
                                        <a href="javascript:void(0)">
                                            <Card className="manage_sec" style={{ borderRadius: 12 }}>
                                                <div>
                                                    <h2 style={{ textAlign: "center" }}>Sever Reboots</h2>
                                                </div>
                                                <Button type="primary" size="small" className="open_btn1">Open</Button>
                                            </Card>
                                        </a>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6} onClick={() => this.showToolsModal(true)}>
                                <div>
                                    <div>
                                        <a href="javascript:void(0)">
                                            <Card className="manage_sec" style={{ borderRadius: 12 }}>
                                                <div>
                                                    <h2 style={{ textAlign: "center" }}>Firmware Downloads</h2>
                                                </div>
                                                <Button type="primary" size="small" className="open_btn1">Open</Button>
                                            </Card>
                                        </a>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
                <Modal
                    maskClosable={false}
                    destroyOnClose={true}
                    title="Server Reboot"
                    visible={this.state.rebootModal}
                    onOk={(e) => {
                        this.showRebootModel(false)
                    }}
                    onCancel={(e) => {
                        this.showRebootModel(false)
                    }}
                // okText='Submit'
                // okText="OK"
                // okButtonProps={{
                //     disabled: this.state.newData.length ? false : true
                // }}
                >
                    <WhitelabelList
                        whiteLabels={this.props.whiteLabels}
                        checkPass={this.props.checkPass}
                        confirmRebootModal={this.props.confirmRebootModal}
                        restartWhiteLabel={this.props.restartWhiteLabel}
                        resetConfirmReboot={this.props.resetConfirmReboot}
                    />
                </Modal>

                <Modal
                    title="Download Firmwares" //"Download Tools"
                    visible={this.state.tools_modal}
                    onOk={(e) => {
                        this.showToolsModal(false)
                    }}
                    okText="OK"
                    cancelText="CANCEL"
                    onCancel={(e) => {
                        this.showToolsModal(false)
                    }}
                    className="d_tool_pup"
                    width="42%"
                >
                    <Row className="d_t_m">
                        <Col xs={24} sm={24} md={15} lg={15} xl={15} >
                            <h4 style={{ lineHeight: '30px', marginBottom: 0 }}>Firmware (name)</h4>

                        </Col>
                        <Col xs={24} sm={24} md={9} lg={9} xl={9} >
                            <a href="#">
                                <Button type="primary" size="default" style={{ margin: '0 0 16px 16px', height: 30, lineHeight: '30px' }}>
                                    Download
                            </Button>
                            </a>
                        </Col>
                        <Col xs={24} sm={24} md={15} lg={15} xl={15} >
                            <h4 style={{ lineHeight: '30px', marginBottom: 0 }}>Firmware (name)</h4>

                        </Col>
                        <Col xs={24} sm={24} md={9} lg={9} xl={9} >
                            <a href="#">
                                <Button type="primary" size="default" style={{ margin: '0 0 16px 16px', height: 30, lineHeight: '30px' }}>
                                    Download
                            </Button>
                            </a>
                        </Col>
                        <Col xs={24} sm={24} md={15} lg={15} xl={15} >
                            <h4 style={{ lineHeight: '30px', marginBottom: 0 }}>Firmware (name)</h4>

                        </Col>
                        <Col xs={24} sm={24} md={9} lg={9} xl={9} >
                            <a href="#">
                                <Button type="primary" size="default" style={{ margin: '0 0 16px 16px', height: 30, lineHeight: '30px' }}>
                                    Download
                            </Button>
                            </a>
                        </Col>
                    </Row>
                </Modal>
            </div>
        );
    }
}

var mapStateToProps = ({ auth, whiteLabels }) => {
    console.log(whiteLabels);
    return {
        whiteLabels: whiteLabels.whiteLabels,
        confirmRebootModal: auth.confirmRebootModal,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getWhiteLabels: getAllWhiteLabels,
        restartWhiteLabel: restartWhiteLabel,
        checkPass: checkPass,
        resetConfirmReboot: resetConfirmReboot,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Tools);