import React, { Component, Fragment } from "react";
// import {Route, Switch} from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col, Icon, Modal, Form, Input, Upload, message, Table, Select, Divider } from "antd";

import { getWhiteLabelInfo } from '../../appRedux/actions';

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
            info_modal: visible
        })
    }
    editInfoModal = (e, visible) => {
        this.setState({
            edit_modal: visible
        })
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
                                                <Row style={{ padding: '12px 0 0px' }}>
                                                    <Col span={8} className="" style={{ textAlign: "center" }}>
                                                        <Icon type="android" className="policy_icon" />
                                                    </Col>
                                                    <Col span={16} style={{ padding: 0 }}>
                                                        <h5><span className="diamond_icon">&#9670;</span>Manage apk's</h5>
                                                        <h5><span className="diamond_icon">&#9670;</span>Add permssion</h5>

                                                    </Col>
                                                </Row>
                                            </div>
                                        </Card>
                                        <Button type="primary" size="small" className="open_btn">Open</Button>
                                    </a>

                                    <Modal
                                        maskClosable={false}
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
                                                    value: this.props.whiteLableInfo.model_id,
                                                },
                                                {
                                                    key: 2,
                                                    name: (<b>APK</b>),
                                                    value: this.props.whiteLableInfo.apk_file,
                                                },
                                            ]}
                                        />

                                    </Modal>
                                    <Modal
                                        maskClosable={false}
                                        // title="WhiteLabel Info"
                                        visible={this.state.edit_modal}
                                        // onOk={this.InsertNewData}
                                        onCancel={(e) => {
                                            this.editInfoModal(e, false);
                                        }}
                                        okText='Save'
                                    // okButtonProps={{
                                    //     disabled: this.state.newData.length ? false : true
                                    // }}
                                    >
                                        <Form onSubmit={this.handleSubmit} >

                                            <Form.Item>
                                                {this.props.form.getFieldDecorator('email', {
                                                    initialValue: "",
                                                    rules: [{
                                                        required: true,
                                                        type: 'email',
                                                        message: "Doesn't seem to be a valid Email ID",
                                                    }],
                                                })(
                                                    <Input
                                                        placeholder="Email"
                                                        autoComplete={false}
                                                    />
                                                )}
                                            </Form.Item>


                                        </Form>

                                    </Modal>
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
        getWhiteLabelInfo: getWhiteLabelInfo
    }, dispatch);
}

var mapStateToProps = ({whiteLabels}, otherProps) => {
    return {
        whiteLableInfo : whiteLabels.whiteLabel
    };
}

WhiteLabels = Form.create()(WhiteLabels);

export default connect(mapStateToProps, mapDispatchToProps)(WhiteLabels);