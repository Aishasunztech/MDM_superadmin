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
import { BASE_URL } from "../../constants/Application";


import style from "./whitelabels.css"

import { getWhiteLabelInfo, editWhiteLabelInfo } from '../../appRedux/actions';
import EditWhiteLabel from "./components/EditWhiteLabel";

const confirm = Modal.confirm;
const success = Modal.success
const error = Modal.error

class WhiteLabels extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info_modal: false,
            edit_modal: false,
            secureLouncer: {},
            scApk: {},
            loadIdsModal: false,
            selectedRowKeys: []
        }
    }

    showModal = () => {
        // alert('hi')
        this.setState({
            loadIdsModal: true,
        });
    }
    handleOk = (e) => {
        // console.log(e);
        this.setState({
            loadIdsModal: false,
            selectedRowKeys: []
        });
    }

    handleCancel = (e) => {
        // console.log(e);
        this.setState({
            loadIdsModal: false,
            selectedRowKeys: [],
        });
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
        // console.log(this.props.whiteLabelInfo, 'whitelables', this.state.secureLouncer)

        // load ids modal
        if (this.props.showMsg) {
            if (this.props.msg === "imported successfully") {
                success({
                    title: this.props.msg,
                });
            } else {
                error({
                    title: this.props.msg,
                });
            }

        }


        const { file, selectedRowKeys, } = this.state
        // console.log(this.state.used_chat_ids_page);
        let self = this;
        const props = {
            name: 'file',
            multiple: false,
            accept: [".xls", ".csv", ".xlsx"],
            // accept: ".xls; *.csv; *.xlsx;",
            // accept: ".xls",
            // processData: false,
            beforeUpload: (file) => {
                // console.log(file);
                this.setState({
                    file: file
                });
                return false;
            },
            // action: '//jsonplaceholder.typicode.com/posts/',
            onChange(info) {
                // console.log(info);
                if (info.fileList.length === 0) {
                    self.uploadFile(null);
                }
            },
            fileList: (file === null) ? null : [file]
        };

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };


        const duplicateModalColumns = [
            {
                title: 'SIM ID',
                align: "center",
                dataIndex: 'sim_id',
                key: "sim_id",
                className: this.state.duplicate_data_type == 'sim_id' ? '' : 'hide',
                sortDirections: ['ascend', 'descend'],

            },
            {
                title: 'START DATE',
                align: "center",
                dataIndex: 'start_date',
                key: "start_date",
                className: this.state.duplicate_data_type == 'sim_id' ? '' : 'hide',
                sortDirections: ['ascend', 'descend'],

            },
            {
                title: 'EXPIRY DATE',
                align: "center",
                dataIndex: 'expiry_date',
                key: "expiry_date",
                className: this.state.duplicate_data_type == 'sim_id' ? '' : 'hide',
                sortDirections: ['ascend', 'descend'],
            },
            {
                title: 'CHAT IDS',
                align: "center",
                dataIndex: 'chat_id',
                key: "chat_id",
                className: this.state.duplicate_data_type == 'chat_id' ? '' : 'hide',
                sortDirections: ['ascend', 'descend'],
            },
            {
                title: 'PGP EMAILS',
                align: "center",
                dataIndex: 'pgp_email',
                key: "pgp_email",
                className: this.state.duplicate_data_type == 'pgp_email' ? '' : 'hide',
                sortDirections: ['ascend', 'descend'],
            }
        ]
        // end load ids modal
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
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} > 
                        {/* onClick={this.showModal} */}
                            <div>
                                <div className="contenar">
                                    <a href="javascript:void(0)" >
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
                        {/* Load ID's Modal */}
                        <Modal
                            maskClosable={false}
                            className="manage_data"
                            width="450px"
                            title="load id's Label: LockMesh"
                            visible={this.state.loadIdsModal}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            centered
                        >
                            <div className="profile_table">
                                <Fragment>
                                    <Modal
                                        maskClosable={false}
                                        className="m_d_pop"
                                        visible={this.state.visible}
                                        title={`Import ${this.state.fieldValue}`}
                                        // onOk={this.handleOk}
                                        onCancel={
                                            () => {
                                                this.showImportModal(false);
                                            }
                                        }
                                        footer={[
                                            <Button key="back" onClick={() => {
                                                this.showImportModal(false);
                                            }}>Cancel</Button>,

                                            <Button key="submit" ref="formSubmission" type="primary" onClick={(e) => this.handleSubmit()} >
                                                Submit
                                                        </Button>
                                        ]}>
                                        <Form onSubmit={(e) => { this.handleSubmit(e) }}>

                                            {/* <Form.Item label="Name* " labelCol={{ span: 7 }} wrapperCol={{ span: 12 }}>
                                                        <Input disabled type='text' required={true} value={this.state.apk_name} onChange={(event) => this.setState({ apk_name: event.target.value })} />
                                                        </Form.Item> */}
                                            <Row>
                                                <Col span={24} className="upload_file">
                                                    <Form.Item
                                                    >
                                                        <div className="dropbox">

                                                            <Upload.Dragger  {...props} disabled={(file === null) ? false : true} >
                                                                <p className="ant-upload-drag-icon">
                                                                    <Icon type="file-excel" />
                                                                </p>
                                                                <h2 className="ant-upload-hint">UPLOAD FILE </h2>
                                                                <p className="ant-upload-text">Upload file (.xls, .xlsx, .csv)</p>
                                                            </Upload.Dragger>
                                                        </div>
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Modal>

                                    <Modal
                                        maskClosable={false}
                                        className="m_d_pop"
                                        visible={this.state.dataVisible}
                                        title={`${this.state.dataFieldTitle}`}
                                        // onOk={this.handleOk}
                                        onCancel={
                                            () => {
                                                this.showViewmodal(false);
                                                this.setState({
                                                    selectedRowKeys: [],
                                                    used_chat_ids: this.props.used_chat_ids,
                                                    used_sim_ids: this.props.used_sim_ids,
                                                    used_pgp_emails: this.props.used_pgp_emails,
                                                })
                                            }
                                        }
                                        onOk={
                                            () => {
                                                this.showViewmodal(false);
                                                this.setState({
                                                    selectedRowKeys: [],
                                                    used_chat_ids: this.props.used_chat_ids,
                                                    used_sim_ids: this.props.used_sim_ids,
                                                    used_pgp_emails: this.props.used_pgp_emails,
                                                })
                                            }
                                        }
                                    >
                                        {(this.state.dataFieldName === "sim_ids") ?
                                            <Fragment>
                                                <div className="row">

                                                    <div className="col-md-12">
                                                        <Input.Search
                                                            name="sim_id"
                                                            key="sim_id"
                                                            id="sim_id"
                                                            className="search_heading1"
                                                            onKeyUp={
                                                                (e) => {
                                                                    this.handleSearch(e, 'sim_ids')
                                                                }
                                                            }
                                                            autoComplete="new-password"
                                                            placeholder="SIM ID"
                                                        />
                                                    </div>
                                                    <div className="col-md-6 pr-8">
                                                        <Input.Search
                                                            name="start_date"
                                                            key="start_date"
                                                            id="start_date"
                                                            className="search_heading1"
                                                            onKeyUp={
                                                                (e) => {
                                                                    this.handleSearch(e, 'sim_ids')
                                                                }
                                                            }
                                                            autoComplete="new-password"
                                                            placeholder="START DATE"
                                                        />
                                                    </div>
                                                    <div className="col-md-6 pl-8">
                                                        <Input.Search
                                                            name="expiry_date"
                                                            key="expiry_date"
                                                            id="expiry_date"
                                                            className="search_heading1"
                                                            onKeyUp={
                                                                (e) => {
                                                                    this.handleSearch(e, 'sim_ids')
                                                                }
                                                            }
                                                            autoComplete="new-password"
                                                            placeholder="EXPIRY DATE"
                                                        />
                                                    </div>
                                                </div>

                                                <Table
                                                    columns={[
                                                        {
                                                            title: 'SIM ID',
                                                            align: "center",
                                                            dataIndex: 'sim_id',
                                                            key: "sim_id",
                                                            className: '',
                                                            sorter: (a, b) => { return a.sim_id - b.sim_id },
                                                            sortDirections: ['ascend', 'descend'],

                                                        },
                                                        {
                                                            title: 'START DATE',
                                                            align: "center",
                                                            dataIndex: 'start_date',
                                                            key: "start_date",
                                                            className: '',
                                                            sorter: (a, b) => { return a.start_date.localeCompare(b.start_date) },
                                                            sortDirections: ['ascend', 'descend'],

                                                        },
                                                        {
                                                            title: 'EXPIRY DATE',
                                                            align: "center",
                                                            dataIndex: 'expiry_date',
                                                            key: "expiry_date",
                                                            className: '',
                                                            sorter: (a, b) => { return a.expiry_date.localeCompare(b.expiry_date) },
                                                            sortDirections: ['ascend', 'descend'],
                                                        },
                                                    ]}
                                                    dataSource={
                                                        this.state.sim_ids.map(sim_id => {
                                                            return {
                                                                key: sim_id.id,
                                                                sim_id: sim_id.sim_id,
                                                                start_date: sim_id.start_date,
                                                                expiry_date: sim_id.expiry_date
                                                            }
                                                        })
                                                    }
                                                    scroll={{ y: 250 }}
                                                    pagination={false}

                                                />
                                            </Fragment>
                                            : (this.state.dataFieldName === "chat_ids") ?
                                                <Fragment>
                                                    <div className="row">

                                                        <div className="col-md-12">
                                                            <Input.Search
                                                                name="chat_id"
                                                                key="chat_id"
                                                                id="chat_id"
                                                                className="search_heading1"
                                                                onKeyUp={
                                                                    (e) => {
                                                                        this.handleSearch(e, 'chat_ids')
                                                                    }
                                                                }
                                                                autoComplete="new-password"
                                                                placeholder="CHAT ID"
                                                            />
                                                        </div>
                                                    </div>

                                                    <Table
                                                        columns={[
                                                            {
                                                                title: 'CHAT ID',
                                                                align: "center",
                                                                dataIndex: 'chat_id',
                                                                key: "chat_id",
                                                                className: '',
                                                                sorter: (a, b) => { return a.chat_id.localeCompare(b.chat_id) },
                                                                sortDirections: ['ascend', 'descend'],
                                                            },
                                                        ]}
                                                        dataSource={
                                                            this.state.chat_ids.map(chat_id => {
                                                                return {
                                                                    key: chat_id.id,
                                                                    chat_id: chat_id.chat_id,
                                                                }
                                                            })
                                                        }
                                                        scroll={{ y: 250 }}
                                                        pagination={false}


                                                    />
                                                </Fragment>
                                                : (this.state.dataFieldName === "pgp_emails") ?
                                                    <Fragment>
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <Input.Search
                                                                    name="pgp_email"
                                                                    key="pgp_email"
                                                                    id="pgp_email"
                                                                    className="search_heading1"
                                                                    onKeyUp={
                                                                        (e) => {
                                                                            this.handleSearch(e, 'pgp_emails')
                                                                        }
                                                                    }
                                                                    autoComplete="new-password"
                                                                    placeholder="PGP Email"
                                                                />
                                                            </div>
                                                        </div>

                                                        <Table
                                                            size="middle"
                                                            columns={[
                                                                {
                                                                    title: 'PGP EMAILS',
                                                                    align: "center",
                                                                    dataIndex: 'pgp_email',
                                                                    key: "pgp_email",
                                                                    className: '',
                                                                    sorter: (a, b) => { return a.pgp_email.localeCompare(b.pgp_email) },
                                                                    sortDirections: ['ascend', 'descend'],

                                                                },
                                                            ]}

                                                            dataSource={
                                                                this.state.pgp_emails.map(email => {
                                                                    return {
                                                                        key: email.id,
                                                                        pgp_email: email.pgp_email,

                                                                    }
                                                                })
                                                            }

                                                            scroll={{ y: 250 }}
                                                            pagination={false}
                                                        />
                                                    </Fragment>
                                                    : (this.state.dataFieldName === "used_pgp_emails") ?
                                                        <Fragment>
                                                            <div className="row">
                                                                <div className="col-md-12">
                                                                    <Input.Search
                                                                        name="pgp_email"
                                                                        key="used_pgp_emails"
                                                                        id="used_pgp_emails"
                                                                        className="search_heading1"
                                                                        onKeyUp={
                                                                            (e) => {
                                                                                this.handleSearch(e, 'used_pgp_emails')
                                                                            }
                                                                        }
                                                                        autoComplete="new-password"
                                                                        placeholder="USED PGP Email"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <Table
                                                                size="middle"
                                                                rowSelection={rowSelection}
                                                                columns={[
                                                                    {
                                                                        title: <Button type="danger" size="small" onClick={() => { this.showConfirm("Do you really want to Release all pgp emails.", this, 'pgp_email') }}>Release selected</Button>,
                                                                        align: "center",
                                                                        dataIndex: 'action',
                                                                        key: "action",
                                                                        className: '',
                                                                    },
                                                                    {
                                                                        title: 'USED PGP EMAILS',
                                                                        align: "center",
                                                                        dataIndex: 'used_pgp_email',
                                                                        key: "used_pgp_email",
                                                                        className: '',
                                                                        sorter: (a, b) => { return a.used_pgp_email.localeCompare(b.used_pgp_email) },
                                                                        sortDirections: ['ascend', 'descend'],

                                                                    },

                                                                ]}

                                                                dataSource={
                                                                    this.state.used_pgp_emails.map(email => {
                                                                        return {
                                                                            key: email.id,
                                                                            used_pgp_email: email.pgp_email,
                                                                            // action: <Button type="danger" size="small" onClick={() => { this.showConfirm("Do you really want to Release this pgp email.", this, "pgp_email", email.id) }}>Release</Button>

                                                                        }
                                                                    })
                                                                }
                                                                scroll={{ y: 250 }}
                                                                pagination={false}
                                                            />
                                                        </Fragment> : (this.state.dataFieldName === "used_sim_ids") ?
                                                            <Fragment>
                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <Input.Search
                                                                            name="sim_id"
                                                                            key="used_sim_ids"
                                                                            id="used_sim_ids"
                                                                            className="search_heading1"
                                                                            onKeyUp={
                                                                                (e) => {
                                                                                    this.handleSearch(e, 'used_sim_ids')
                                                                                }
                                                                            }
                                                                            autoComplete="new-password"
                                                                            placeholder="USED SIM IDS"
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <Table
                                                                    size="middle"
                                                                    rowSelection={rowSelection}
                                                                    columns={[
                                                                        {
                                                                            title: <Button type="danger" size="small" onClick={() => { this.showConfirm("Do you really want to Release all sim ids.", this, 'sim_id') }}>Release selected</Button>,
                                                                            align: "center",
                                                                            dataIndex: 'action',
                                                                            key: "action",
                                                                            className: '',
                                                                        },
                                                                        {
                                                                            title: 'USED SIM IDS',
                                                                            align: "center",
                                                                            dataIndex: 'used_sim_ids',
                                                                            key: "used_sim_ids",
                                                                            className: '',
                                                                            sorter: (a, b) => { return a.used_sim_ids.localeCompare(b.used_sim_ids) },
                                                                            sortDirections: ['ascend', 'descend'],

                                                                        },

                                                                    ]}

                                                                    dataSource={
                                                                        this.state.used_sim_ids.map(email => {
                                                                            return {
                                                                                key: email.id,
                                                                                used_sim_ids: email.sim_id,
                                                                                // action: <Button type="danger" size="small" onClick={() => { this.showConfirm("Do you really want to Release this sim id.", this, "sim_id", email.id) }}>Release</Button>

                                                                            }
                                                                        })
                                                                    }
                                                                    scroll={{ y: 250 }}
                                                                    pagination={false}
                                                                />
                                                            </Fragment> : (this.state.dataFieldName === "used_chat_ids") ?
                                                                <Fragment>
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <Input.Search
                                                                                name="chat_id"
                                                                                key="used_chat_ids"
                                                                                id="used_chat_ids"
                                                                                className="search_heading1"
                                                                                onKeyUp={
                                                                                    (e) => {
                                                                                        this.handleSearch(e, 'used_chat_ids')
                                                                                    }
                                                                                }
                                                                                autoComplete="new-password"
                                                                                placeholder="USED CHAT IDS"
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <Table
                                                                        size="middle"
                                                                        rowSelection={rowSelection}
                                                                        columns={[
                                                                            {
                                                                                title: <Button type="danger" size="small" onClick={() => { this.showConfirm("Do you really want to Release all Chat ids.", this, 'chat_id') }}>Release selected</Button>,
                                                                                align: "center",
                                                                                dataIndex: 'action',
                                                                                key: "action",
                                                                                className: '',
                                                                            },
                                                                            {
                                                                                title: 'USED CHAT IDS',
                                                                                align: "center",
                                                                                dataIndex: 'used_chat_ids',
                                                                                key: "used_chat_ids",
                                                                                className: '',
                                                                                sorter: (a, b) => { return a.used_chat_ids.localeCompare(b.used_chat_ids) },
                                                                                sortDirections: ['ascend', 'descend'],

                                                                            },

                                                                        ]}
                                                                        dataSource={
                                                                            this.state.used_chat_ids.map(email => {
                                                                                return {
                                                                                    key: email.id,
                                                                                    used_chat_ids: email.chat_id,
                                                                                    // action: <Button type="danger" size="small" onClick={() => { this.showConfirm("Do you really want to Release this Chat id.", this, "chat_id", email.id) }}>Release</Button>

                                                                                }
                                                                            })
                                                                        }
                                                                        scroll={{ y: 250 }}
                                                                        pagination={false}
                                                                    />
                                                                </Fragment> : null}
                                    </Modal>
                                    <Row>
                                        <div className="col-md-12 ac_card">
                                            <Card style={{ borderRadius: 12 }}>
                                                <div>
                                                    {/* <h2 style={{ textAlign: "center" }}><a href="#"></a> Manage Data</h2>
                                                            <Divider className="mb-0" /> */}
                                                    <Row style={{ padding: '16px' }}>
                                                    <div className="inline_b">
                                                            <span className="headings">SIM</span>
                                                            {/* <Button onClick={() => { this.showViewmodal(true, 'used_sim_ids', 'USED SIM IDS') }} size='small' className="pull-right  exp_btn" type="dashed">Release</Button> */}
                                                            {/* <Button size='small' className="pull-right imp_btn mb-0" type="primary" onClick={() => {
                                                                this.exportCSV('sim_ids');
                                                            }} >Export</Button> */}

                                                            <a href={`${BASE_URL}users/getFile/import_sim_ids.xlsx`}>
                                                                <Button size='small' className="pull-right imp_btn mb-0" type="dashed">Sample</Button>
                                                            </a>
                                                            <Button onClick={() => { this.showViewmodal(true, 'sim_ids', 'Sim IDs') }} size='small' className="pull-right imp_btn mb-0">View</Button>
                                                            <Button size='small' className="pull-right imp_btn mb-0" type="primary" onClick={() => {
                                                                this.showImportModal(true, "sim_ids", "Sim IDs")
                                                            }}>Import</Button>

                                                        </div>
                                                        <div className="inline_b">
                                                            <span className="headings">CHAT</span>
                                                            {/* <Button onClick={() => { this.showViewmodal(true, 'used_chat_ids', 'USED CHAT IDS') }} size='small' className="pull-right  exp_btn" type="dashed">Release</Button> */}
                                                            {/* <Button size='small' className="pull-right imp_btn" type="primary" onClick={() => {
                                                                this.exportCSV('chat_ids');
                                                            }} >Export</Button> */}
                                                            <a href={`${BASE_URL}users/getFile/import_chat_ids.xlsx`}>
                                                                <Button size='small' className="pull-right imp_btn" type="dashed" >Sample</Button>
                                                            </a>
                                                            <Button onClick={() => { this.showViewmodal(true, 'chat_ids', 'Chat IDs') }} size='small' className="pull-right imp_btn">View</Button>
                                                            <Button size='small' className="pull-right imp_btn" type="primary" onClick={() => {
                                                                this.showImportModal(true, "chat_ids", "Chat IDs")
                                                            }}>Import</Button>

                                                        </div>
                                                        <div className="inline_b">
                                                            <span className="headings">PGP</span>
                                                            {/* <Button onClick={() => { this.showViewmodal(true, 'used_pgp_emails', 'USED PGP EMAILS') }} size='small' className="pull-right  exp_btn" type="dashed">Release</Button> */}
                                                            {/* <Button size='small' className="pull-right imp_btn" type="primary" onClick={() => {
                                                                this.exportCSV('pgp_emails');
                                                            }} >Export</Button> */}
                                                            <a href={`${BASE_URL}users/getFile/import_pgp_emails.xlsx`}>
                                                                <Button size='small' className="pull-right imp_btn" type="dashed">Sample</Button>
                                                            </a>
                                                            <Button onClick={() => { this.showViewmodal(true, 'pgp_emails', 'PGP Emails') }} size='small' className="pull-right imp_btn">View</Button>
                                                            <Button size='small' className="pull-right imp_btn" type="primary" onClick={() => {
                                                                this.showImportModal(true, "pgp_emails", "PGP Emails")
                                                            }}>Import</Button>

                                                        </div>
                                                        
                                                    </Row>
                                                </div>
                                            </Card>
                                        </div>
                                    </Row>

                                </Fragment>
                            </div>

                        </Modal>

                        {/* End Load ID's Modal */}
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