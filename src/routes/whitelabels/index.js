import React, { Component, Fragment } from "react";
// import {Route, Switch} from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { SECURE_LAUNCHER, SC } from '../../constants/Constants';
import { checkValue } from '../utils/commonUtils'
import { Link } from 'react-router-dom';
import {
    Card, Button, Row, Col, Icon, Modal, Form, Input, Upload, message, Table, Divider
} from "antd";

import style from "./whitelabels.css"

import { getWhiteLabelInfo, editWhiteLabelInfo, getWhitelabelBackups, getFile, saveIDPrices } from '../../appRedux/actions';

import EditWhiteLabel from "./components/EditWhiteLabel";
import LoadIDsModal from "./components/LoadIDsModal";
import WhiteLabelPricing from './components/WhiteLabelPricing';
import {USER_URL} from '../../constants/Application'

const confirm = Modal.confirm;
const success = Modal.success
const error = Modal.error
let copiedData = [];

class WhiteLabels extends Component {
    constructor(props) {
        super(props);
        this.whitelabelBackupColumns = [
            {
                title: '#',
                dataIndex: '#',
                key: '#',
                textAlign: 'center'
            },
            {
                // title: (
                //     <Input.Search
                //         name="db_file"
                //         key="db_file"
                //         id="db_file"
                //         className="search_heading"
                //         onKeyUp={this.handleSearch}
                //         autoComplete="new-password"
                //         placeholder='BACKUP FILE'
                //     />
                // ),
                // dataIndex: 'db_file',
                // className: '',
                // children: [
                //     {
                title: 'BACKUP FILE',
                align: "center",
                className: '',
                dataIndex: 'db_file',
                key: 'db_file',
                // sorter: (a, b) => { return a.db_file.localeCompare(b.db_file) },

                // sortDirections: ['ascend', 'descend'],
                //     }
                // ]
            },
            {
                // title: (
                //     <Input.Search
                //         name="created_at"
                //         key="created_at"
                //         id="created_at"
                //         className="search_heading"
                //         onKeyUp={this.handleSearch}
                //         autoComplete="new-password"
                //         placeholder='CREATED AT'
                //     />
                // ),
                // dataIndex: 'created_at',
                // className: '',
                // children: [
                //     {
                title: 'CREATED AT',
                align: "center",
                className: '',
                dataIndex: 'created_at',
                key: 'created_at',
                //         sorter: (a, b) => { return a.created_at.localeCompare(b.created_at) },

                //         sortDirections: ['ascend', 'descend'],
                //     }
                // ]
            },
        ]
        this.state = {
            info_modal: false,
            edit_modal: false,
            secureLouncer: {},
            scApk: {},
            loadIdsModal: false,
            selectedRowKeys: [],
            backupDatabaseModal: false,
            copy_status: true,
            pricing_modal: false,
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
        // console.log(id, 'ds');
        let _this = this;

        setTimeout(function () {
            _this.props.getWhiteLabelInfo(id)
        }, 1000);
    }

    handleSearch = (e) => {
        let demoData = [];
        if (this.state.copy_status) {
            copiedData = this.state.whitelabelBackups;
            this.state.copy_status = false;
        }
        // console.log(e.target.value, e.target.name, 'value', copiedData)
        if (e.target.value.length) {
            copiedData.forEach((item) => {
                if (item[e.target.name] !== undefined) {
                    // console.log((typeof item[e.target.name]), 'type')
                    if ((typeof item[e.target.name]) === 'string') {
                        if (item[e.target.name].toUpperCase().includes(e.target.value.toUpperCase())) {
                            demoData.push(item);
                        }
                    } else if (item[e.target.name] != null) {
                        if (item[e.target.name].toString().toUpperCase().includes(e.target.value.toUpperCase())) {
                            demoData.push(item);
                        }
                    } else {
                    }
                } else {
                }
            });
            this.setState({
                devices: demoData
            })
        } else {
            this.setState({
                devices: copiedData
            })
        }
    }

    componentDidMount() {
        this.props.getWhiteLabelInfo(this.props.id);
        this.props.getWhitelabelBackups(this.props.id);

        this.setState({
            whitelabelBackups: this.props.whitelabelBackups
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                whitelabelBackups: this.props.whitelabelBackups,
            })
        }
    }

    handleCancel = () => {
        this.setState({
            backupDatabaseModal: false
        })
    }

    renderWhitelabelBackups = (data) => {
        if (data && data.length) {
            return data.map((item, index) => {
                return {
                    rowKey: item.id,
                    '#': ++index,
                    whitelabel_id: item.whitelabel_id,
                    db_file: <a href={`${USER_URL}getFile/`+item.db_file}><Button type='primary' size='small'  >Download</Button></a>,
                    created_at: item.created_at
                }
            })
        }
    }

    showPricingModal = (visible) => {
        this.setState({
            pricing_modal: visible
        });
    }

    render() {

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
        // console.log(this.props.whitelabelBackups, 'whitelables', this.state.secureLouncer)
        // console.log(this.props.whiteLabelInfo, 'whitelables', this.state.secureLouncer)
        // console.log('label id is: ', this.props.whiteLabelInfo.id)
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
                                        okText={(e) => {
                                            this.showInfoModal(e, false);
                                        }}
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
                                    <a href="javascript:void(0)" onClick={() => this.setState({ backupDatabaseModal: true })} >
                                        <Card className="manage_sec" style={{ borderRadius: 12 }}>
                                            <div>
                                                <h2 style={{ textAlign: "center" }}>Database Backups</h2>
                                                <Divider className="mb-0" />
                                            </div>
                                            <Button type="primary" size="small" className="open_btn1">Open</Button>
                                        </Card>
                                    </a>
                                    {/* <WhiteLabelBackups /> */}
                                    <Modal
                                        title="Database Backups"
                                        visible={this.state.backupDatabaseModal}
                                        onOk={this.handleOk}
                                        onCancel={this.handleCancel}
                                        maskClosable={false}
                                    >
                                        <Table
                                            bordered
                                            pagination={false}
                                            dataSource={this.renderWhitelabelBackups(this.state.whitelabelBackups)}
                                            columns={this.whitelabelBackupColumns}>
                                        </Table>
                                    </Modal>

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
                                    <a href="javascript:void(0)" onClick={(e) => { this.showPricingModal(true) }} >
                                        <Card className="manage_sec" style={{ borderRadius: 12 }}>
                                            <div>
                                                <h2 style={{ textAlign: "center" }}>Set Prices</h2>
                                                <Divider className="mb-0" />

                                            </div>
                                            <Button type="primary" size="small" className="open_btn1">Open</Button>
                                        </Card>
                                    </a>
                                    <div className="middle">
                                        <WhiteLabelPricing
                                            showPricingModal = {this.showPricingModal}
                                            pricing_modal = {this.state.pricing_modal}
                                            LabelName = {this.props.whiteLabelInfo.name}
                                            saveIDPrices= {this.props.saveIDPrices}
                                            whitelabel_id={this.props.whiteLabelInfo.id}

                                        />
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
        editWhiteLabelInfo: editWhiteLabelInfo,
        getWhitelabelBackups: getWhitelabelBackups,
        getFile: getFile,
        saveIDPrices: saveIDPrices
    }, dispatch);
}

var mapStateToProps = ({ whiteLabels }, otherProps) => {
    return {
        whiteLabelInfo: whiteLabels.whiteLabel,
        whitelabelBackups: whiteLabels.whitelabelBackups
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(WhiteLabels);