import React, { Component, Fragment } from 'react'

import {
    Form, Input, Row, Col, Button, Select,
} from "antd";
import styles from '../../../whitelabels.css';
import RestService from '../../../../../appRedux/services/RestServices';
import { one_month, three_month, six_month, twelve_month, sim, chat, pgp, vpn, sim2, trial } from '../../../../../constants/Constants';

class PackagePricingForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pkgPrice: 0,
            sim: false,
            sim_id2: false,
            chat: false,
            pgp: false,
            vpn: false,
            help: '',
            validateStatus: 'success',
            pkgTerms: '1 month'
        }
    }


    setPrice = (fieldName, is_pkg_feature = false, pkg_feature_value = '', e) => {
        // let value = e.target.value;
        let value = ''
        if (fieldName) {

            if (is_pkg_feature) {
                if (pkg_feature_value !== '' && fieldName) {
                    value = pkg_feature_value;
                    this.props.setPkgDetail(pkg_feature_value, fieldName, is_pkg_feature);
                }
            } else {
                // value = this.props.form.getFieldValue(fieldName)
                // 
                if (fieldName) {
                    value = e;
                    if (fieldName == 'pkgPrice') {
                        e = +e;
                        e = e.toString();
                    }
                    this.props.setPkgDetail(e, fieldName, is_pkg_feature);
                }
            }

            if (fieldName == 'pkgPrice') {
                var isnum = /^\d+$/.test(value);
                if (!isnum || e <= 0) {
                    this.props.restrictPackageSubmit(false, fieldName)
                    this.setState({
                        validateStatus: 'error',
                        help: value === '' ? 'Please Input Package Price' : 'Price must be in Numbers and greater than zero',
                        [fieldName]: e
                    })
                } else {
                    this.props.restrictPackageSubmit(true, fieldName)
                    this.setState({
                        validateStatus: 'success',
                        help: '',
                        [fieldName]: e
                    })
                }
                // 
            } else {
                if (fieldName === "pkgTerms" && value === 'trial') {
                    this.setState({ pkgPrice: 0, [fieldName]: value })
                    this.props.form.setFieldsValue({ pkgPrice: 0 })
                } else {
                    this.setState({
                        [fieldName]: value
                    })
                }
                // this.setState({
                //     [fieldName]: value
                // })
            }


        }
    }


    PackageNameChange = async (rule, value, callback) => {
        let response = true
        // 
        response = await RestService.checkPackageName(value).then((response) => {
            if (RestService.checkAuth(response.data)) {
                if (response.data.status) {
                    return true
                }
                else {
                    return false
                }
            }
        });
        // 
        if (response) {
            this.props.restrictPackageSubmit(true, 'pkgName')
            callback()

        } else {
            this.props.restrictPackageSubmit(false, 'pkgName')
            callback("Package name already taken please use another name.")
        }
        if (value == '') {
            this.props.restrictPackageSubmit(false, 'pkgName')
        }
    }
    componentDidMount() {
        // 
        this.setState({
            pkgPrice: 0,
            sim: false,
            sim_id2: false,
            chat: false,
            pgp: false,
            vpn: false
        })
    }
    // resetState = ()=>{

    // }

    render() {

        const formItemLayout = {
            labelCol: {
                xs: { span: 24, offset: 2 },
                sm: { span: 10, offset: 2 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 10 },
            },
        };
        const { getFieldDecorator } = this.props.form;
        const { Option } = Select;
        return (
            <Form onSubmit={this.handleSubmit}>
                <Row>
                    <Col span={13}>
                        <Form.Item label="Package Name"
                            labelCol={{ span: 11 }}
                            wrapperCol={{ span: 13 }}>
                            {getFieldDecorator('pkgName', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input Package Name!',
                                    },
                                    {
                                        validator: this.PackageNameChange,
                                    }
                                ],
                            })(<Input placeholder="Package Name" onChange={(e => this.setPrice('pkgName', '', '', e.target.value))} />)}
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        {/* <Button type="primary" onClick={() => this.setPrice('pkgName')}>Set</Button> */}
                    </Col>
                    <Col span={6}>
                        <h4 className='priceText'>{this.state.pkgName}</h4>
                    </Col>
                </Row>
                <Row>
                    <Col span={13}>
                        <Form.Item label="Package Terms" labelCol={{ span: 11 }}
                            wrapperCol={{ span: 13 }}>
                            {getFieldDecorator('pkgTerms', {
                                initialValue: '1 month',
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please Select Package Terms',
                                    },
                                ],
                            })(<Select
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Select a Term"
                                optionFilterProp="children"
                                onChange={(pkgTerms => this.setPrice('pkgTerms', '', '', pkgTerms))}
                                // onChange={onChange}
                                // onFocus={onFocus}
                                // onBlur={onBlur}
                                // onSearch={onSearch}
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value={trial}>{trial}</Option>
                                <Option value={one_month}>{one_month}</Option>
                                <Option value={three_month}>{three_month}</Option>
                                <Option value={six_month}>{six_month}</Option>
                                <Option value={twelve_month}>{twelve_month}</Option>
                            </Select>)}

                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        {/* <Button type="primary" onClick={() => this.setPrice('pkgTerms')}>Set</Button> */}
                    </Col>
                    <Col span={7}>
                        <h4 className='priceText'>{this.state.pkgTerms}</h4>
                    </Col>
                </Row>
                <Row>
                    <Col span={13}>
                        <Form.Item label="Package Price" labelCol={{ span: 11 }}
                            validateStatus={this.state.pkgTerms === "trial" ? "success" : this.state.validateStatus}
                            help={this.state.pkgTerms === "trial" ? '' : this.state.help}
                            wrapperCol={{ span: 13 }}>
                            {getFieldDecorator('pkgPrice', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please Input Package Price',
                                    }
                                ],
                            })(<Input disabled={this.state.pkgTerms === "trial" ? true : false} placeholder="Package Price" onChange={(e => this.setPrice('pkgPrice', '', '', e.target.value))} type='number' min={1} />)}

                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        {/* <Button type="primary" onClick={() => this.setPrice('pkgPrice')} >Set</Button> */}
                    </Col>
                    <Col span={7}>
                        <h4 className='priceText'>Price: ${this.state.pkgPrice}</h4>
                    </Col>
                </Row>

                <Row>
                    <Col span={13}>
                        <h4 className="labelTypeText">Sim ID:</h4>
                    </Col>
                    <Col span={4}>
                        <Button type="primary" onClick={() => this.setPrice(sim, true, !this.state[sim])} >{this.state[sim] ? 'Unset' : 'Set'}</Button>
                    </Col>
                    <Col span={7}>
                        <span className='priceText' >Sim ID: </span><span style={{ fontWeight: 'bold' }}>{this.state[sim] ? 'Yes' : 'No'}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={13}>
                        <h4 className="labelTypeText">Sim ID 2:</h4>
                    </Col>
                    <Col span={4}>
                        <Button type="primary" onClick={() => this.setPrice(sim2, true, !this.state[sim2])} >{this.state[sim2] ? 'Unset' : 'Set'}</Button>
                    </Col>
                    <Col span={7}>
                        <span className='priceText' >Sim ID 2: </span><span style={{ fontWeight: 'bold' }}>{this.state[sim2] ? 'Yes' : 'No'}</span>
                    </Col>
                </Row>

                <Row>
                    <Col span={13}>
                        <h4 className="labelTypeText">Chat ID:</h4>
                    </Col>
                    <Col span={4}>
                        <Button type="primary" onClick={() => this.setPrice(chat, true, !this.state[chat])}>{this.state[chat] ? 'Unset' : 'Set'}</Button>
                    </Col>
                    <Col span={7}>
                        <span className='priceText' > Chat ID: </span><span style={{ fontWeight: 'bold' }}>{this.state[chat] ? 'Yes' : 'No'}</span>
                    </Col>
                </Row>

                <Row>
                    <Col span={13}>
                        <h4 className="labelTypeText">Pgp ID:</h4>
                    </Col>
                    <Col span={4}>
                        <Button type="primary" onClick={() => this.setPrice(pgp, true, !this.state[pgp])}>{this.state[pgp] ? 'Unset' : 'Set'}</Button>
                    </Col>
                    <Col span={7}>
                        <span className='priceText' >Pgp ID: </span><span style={{ fontWeight: 'bold' }}>{this.state[pgp] ? 'Yes' : 'No'}</span>
                    </Col>
                </Row>

                <Row>
                    <Col span={13}>
                        <h4 className="labelTypeText">VPN ID:</h4>
                    </Col>
                    <Col span={4}>
                        <Button type="primary" onClick={() => this.setPrice(vpn, true, !this.state[vpn])}>{this.state[vpn] ? 'Unset' : 'Set'}</Button>
                    </Col>
                    <Col span={7}>
                        <span className='priceText' >VPN ID: </span><span style={{ fontWeight: 'bold' }}>{this.state[vpn] ? 'Yes' : 'No'}</span>
                    </Col>
                </Row>


                {/* <div style={{float: 'right', marginTop: 20}} > 
                    <Button onClick={()=> this.props.showPricingModal(false)}>Cancel</Button>
                    <Button type="primary" htmlType="submit" >Submit</Button>
                </div>  */}
            </Form>
        )
    }
}

PackagePricingForm = Form.create()(PackagePricingForm);

export default PackagePricingForm;