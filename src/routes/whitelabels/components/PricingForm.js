import React, { Component, Fragment } from 'react'

import {
    Form, Input, Row, Col, Button
} from "antd";

class PricingForm extends Component {

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
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Row>
                    <Col span={13}>
                        <Form.Item label="1 MONTH"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 15 }}>
                            {getFieldDecorator('1Month', {
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
                        <Form.Item label="3 MONTH" labelCol={{ span: 8 }}
                            wrapperCol={{ span: 15 }}>
                            {getFieldDecorator('3Month', {
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
                        <Form.Item label="6 MONTH" labelCol={{ span: 8 }}
                            wrapperCol={{ span: 15 }}>
                            {getFieldDecorator('6Month', {
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
                        <Form.Item label="12 MONTH" labelCol={{ span: 8 }}
                            wrapperCol={{ span: 15 }}>
                            {getFieldDecorator('12Month', {
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

                <div style={{ float: 'right', marginTop: 20 }} >
                    <Button onClick={()=> this.props.showPricingModal(false)}>Cancel</Button>
                    <Button type="primary" htmlType="submit" >Submit</Button>
                </div>

            </Form>
        )
    }
}

PricingForm = Form.create()(PricingForm);

export default PricingForm