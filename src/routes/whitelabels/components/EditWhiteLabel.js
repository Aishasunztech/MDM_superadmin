import React, { Component } from 'react'
import { Card, Button, Row, Col, Icon, Modal, Form, Input, Upload, message, Table, Select, Divider } from "antd";

import { USER_URL } from "../../../constants/Application";
import styles from '../whitelabels.css';

const success = Modal.success;
const error = Modal.error;
let apk = '';
// var EditWhiteLabel = (props) => {
class EditWhiteLabel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            disableApk: false,
            command_name: this.props.whiteLabelInfo.command_name,
        }
    }
    apk = this.props.whiteLabelInfo.apk_file;

    makeCommand = (value) => {

        this.props.form.setFieldsValue({ ['command_name']: '#' + value.replace(/ /g, '_') })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('values', values, apk)
                let form_data = {
                    'id': this.props.whiteLabelInfo.id,
                    'model_id': values.model_id,
                    'command_name': values.command_name,
                    'apk': apk
                }
                // console.log(form_data);
                // this.props.editApk(form_data);
                this.props.editWhiteLabelInfo(form_data);
                this.props.getWhiteLabelInfo(this.props.whiteLabelInfo.id);
                this.props.editInfoModal(false);
                this.props.showInfoModal(false);

                this.setState({
                    disableApk: false,
                })
                //  console.log(values);
            }
            else {
                console.log('error', err, values)
            }
        });
    }

    render() {

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
                md: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
                md: { span: 12 },
            },
        };

        let token = localStorage.getItem('token');

        let _this = this;
        const uploadApkProps = {
            name: 'apk',
            multiple: false,
            action: USER_URL + 'upload',
            headers: { 'authorization': token },
            accept: '.apk',
            disabled: this.state.disableApk,
            // fileList: this.state.fileList2,
            className: 'upload-list-inline',
            listType: 'picture',
            onRemove(info) {
                // document.getElementById('apkSize').style.display = 'none'
                _this.setState({ disableApk: false });
            },
            beforeUpload(file) {
                _this.setState({ disableApk: true });
            },
            onChange(info) {
                const status = info.file.status;
                let fileList2 = [...info.fileList];
                if (status !== 'uploading') {
                    // console.log(info.file, info.fileList);
                }
                if (status === 'done') {

                    if (info.file.response.status !== false) {
                        // console.log(info.file.response);

                        if (info.file.response.fileName !== '') {
                            apk = info.file.response.fileName;
                            console.log(info, 'apk name', apk);
                            // packageName = info.file.response.packageName;
                            // size = info.file.response.size
                            // versionCode = info.file.response.versionCode;
                            // versionName = info.file.response.versionName;
                            // details = info.file.response.details;

                        }
                        success({
                            title: 'file added Successfully ',
                        });
                        _this.setState({ disableApk: true });
                        // document.getElementById('apkSize').style.display = 'block'
                    }
                    else {
                        error({
                            title: 'Error While Uploading',
                        });
                        fileList2 = []
                        _this.setState({ disableApk: false });
                        // document.getElementById('apkSize').style.display = 'none'
                    }

                } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
                _this.setState({ fileList2 });
            },
        };
        console.log(this.state.command_name, 'apk', this.props.whiteLabelInfo)

        return (
            <Modal
                maskClosable={false}
                destroyOnClose={true}
                // title="WhiteLabel Info"
                visible={this.props.edit_modal}
                // onOk={this.InsertNewData}
                onCancel={() => this.props.editInfoModal(false)}
                footer={null}
            // okButtonProps={{
            //     disabled: this.state.newData.length ? false : true
            // }}
            >
                <p>(*)- Required Fields</p>
                <Form
                    onSubmit={this.handleSubmit}
                >

                    <Form.Item
                        {...formItemLayout}
                        label="Model ID"
                        className="upload_file"
                    >
                        {this.props.form.getFieldDecorator('model_id',
                            {
                                initialValue: this.props.whiteLabelInfo.model_id,
                                rules: [
                                    {
                                        required: true, message: 'Model ID is required',
                                    },
                                ],
                            })(
                                <Input onChange={(e) => this.makeCommand(e.target.value)} />
                            )}
                    </Form.Item>

                    <Form.Item
                        {...formItemLayout}
                        label="Command"
                        className="upload_file"
                    >
                        {this.props.form.getFieldDecorator('command_name',
                            {
                                initialValue: this.props.whiteLabelInfo.command_name,

                            })(
                                <Input disabled />
                            )}
                    </Form.Item>

                    <Form.Item
                        label="Apk file"
                        className="upload_file"
                        {...formItemLayout}
                    >
                        <div className="dropbox">
                            {this.props.form.getFieldDecorator('apk', {
                                rules: [
                                    {
                                        required: true, message: 'File is required',
                                    },
                                ],

                            })(
                                <Upload  {...uploadApkProps} >
                                    <Button className="width_100 upload_btn" type="default" >
                                        <Icon type="folder-open" /> UPLOAD APK FILE
                                    </Button>
                                </Upload>
                            )}
                        </div>
                    </Form.Item>
                    {/* <Form.Item label="Apk size:" className="upload_file" >
                        <div>
                            <h5 className="apk_size">{size}</h5>
                        </div>
                    </Form.Item> */}
                    <Row className='modal_footer'>
                        <div> 
                            <Button key="back" style={{ marginBottom: 0, marginTop: 16 }} className='submitButton' onClick={() => this.props.editInfoModal(false)}>Cancel</Button>
                            <Button className='submitButton' style={{ marginBottom: 0, marginTop: 16 }} type="primary" htmlType="submit" >Update</Button>
                        </div>
                    </Row>
                </Form>
            </Modal>

        )
    }
}

EditWhiteLabel = Form.create()(EditWhiteLabel);

export default EditWhiteLabel;