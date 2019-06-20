import React, { Component, Fragment } from 'react'

import {
    Form, Input, Row, Col, Button
} from "antd";
import styles from '../whitelabels.css';

class PackagePricingForm extends Component {

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
        return (
            <Form onSubmit={this.handleSubmit}>
                <Row>
                    <Col span={13}>
                        <Form.Item label="Package Name"
                            labelCol={{ span: 11 }}
                            wrapperCol={{ span: 13  }}>
                            {getFieldDecorator('pkgName', {
                                // rules: [
                                //     {
                                //         type: 'email',
                                //         message: 'The input is not valid E-mail!',
                                //     },
                                //     {
                                //         required: true,
                                //         message: 'Please input your E-mail!',
                                //     },
                                // ],
                            })(<Input />)}


                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Button size='middle' type="primary" >Set</Button>
                    </Col>
                    <Col span={7}>
                        <h4 className='priceText'>Price: 51651</h4>
                    </Col>
                </Row>
                <Row>
                    <Col span={13}>
                        <Form.Item label="Package Terms"  labelCol={{ span: 11 }}
                            wrapperCol={{ span: 13  }}> 
                            {getFieldDecorator('pkgTerms', {
                                // rules: [
                                //     {
                                //         type: 'email',
                                //         message: 'The input is not valid E-mail!',
                                //     },
                                //     {
                                //         required: true,
                                //         message: 'Please input your E-mail!',
                                //     },
                                // ],
                            })(<Input />)}


                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Button size='middle' type="primary" >Set</Button>
                    </Col>
                    <Col span={7}>
                        <h4 className='priceText'>Price: 51651</h4>
                    </Col>
                </Row>
                <Row>
                    <Col span={13}>
                        <Form.Item label="Package Price"  labelCol={{ span: 11 }}
                            wrapperCol={{ span: 13  }}>
                            {getFieldDecorator('pkgPrice', {
                                // rules: [
                                //     {
                                //         type: 'email',
                                //         message: 'The input is not valid E-mail!',
                                //     },
                                //     {
                                //         required: true,
                                //         message: 'Please input your E-mail!',
                                //     },
                                // ],
                            })(<Input />)}


                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Button size='middle' type="primary" >Set</Button>
                    </Col>
                    <Col span={7}>
                        <h4 className='priceText'>Price: 51651</h4>
                    </Col>
                </Row>

                <Row>
                    <Col span={13}>
                       <h4 className="labelTypeText">Sim ID:</h4>
                    </Col>
                    <Col span={4}>
                        <Button size='middle' type="primary" >Set</Button>
                    </Col>
                    <Col span={7}>
                        <span className='priceText' >Sim ID: </span><span style={{fontWeight: 'bold'}}>Yes</span>
                    </Col>
                </Row>

                <Row>
                    <Col span={13}>
                       <h4 className="labelTypeText">Chat ID:</h4>
                    </Col>
                    <Col span={4}>
                        <Button size='middle' type="primary" >Set</Button>
                    </Col>
                    <Col span={7}>
                        <span className='priceText' > Chat ID: </span><span style={{fontWeight: 'bold'}}>Yes</span>
                    </Col>
                </Row>

                <Row>
                    <Col span={13}>
                       <h4 className="labelTypeText">Pgp ID:</h4>
                    </Col>
                    <Col span={4}>
                        <Button size='middle' type="primary" >Set</Button>
                    </Col>
                    <Col span={7}>
                        <span className='priceText' >Pgp ID: </span><span style={{fontWeight: 'bold'}}>No</span>
                    </Col>
                </Row>

                <Row>
                    <Col span={13}>
                       <h4 className="labelTypeText">VPN ID:</h4>
                    </Col>
                    <Col span={4}>
                        <Button size='middle' type="primary" >Set</Button>
                    </Col>
                    <Col span={7}>
                        <span className='priceText' >VPN ID: </span><span style={{fontWeight: 'bold'}}>Yes</span>
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