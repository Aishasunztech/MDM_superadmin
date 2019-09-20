import React, { Component, Fragment } from 'react'

import {
    Form, Input, Row, Col, Button
} from "antd";

import { one_month, three_month, six_month, twelve_month } from '../../../../../constants/Constants';

class PricingForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            one_month: 0,
            three_month: 0,
            six_month: 0,
            twelve_month: 0
        }
    }

    setPrice = (fieldName, value) => {
        // let value = e.target.value;
        if (fieldName) {
            // let value = this.props.form.getFieldValue(fieldName)
            if (value >= 0 || value == '') {

                if (value && fieldName && this.props.price_for) {
                    this.props.setPrice(fieldName, value, this.props.price_for);
                }
                // this.props.form.setFieldsValue({ [fieldName]: '' })
            }
        }

    }
    
    componentDidUpdate(prevProps){
        // console.log(this.props.innerTab, 'llllllllll', prevProps.innerTab)
        if(this.props.innerTab !== prevProps.innerTab){
            this.props.form.resetFields()
        }
    }

    render() {
        // console.log(this.props.innerTabData, 'props are')

        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <Row>
                    <Col span={13}>
                        <Form.Item label="1 MONTH"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 15 }}>
                            {getFieldDecorator(one_month, {

                            })(<Input onChange={e =>  this.setPrice('1 month', e.target.value)} type='number' min={0} />)}

                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        {/* <Button type="primary" onClick={() => this.setPrice(one_month)} >Set</Button> */}
                    </Col>
                    <Col span={7}>
                        <h4 className='priceText'>Price: ${this.props.innerTabData ? this.props.innerTabData[one_month] ? this.props.innerTabData[one_month] : 0 : 0}</h4>
                    </Col>
                </Row>

                <Row>
                    <Col span={13}>
                        <Form.Item label="3 MONTH" labelCol={{ span: 8 }}
                            wrapperCol={{ span: 15 }}>
                            {getFieldDecorator(three_month, {

                            })(<Input onChange={e =>  this.setPrice('3 month', e.target.value)} type='number' min={0} />)}


                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        {/* <Button type="primary" onClick={() => this.setPrice(three_month)} >Set</Button> */}
                    </Col>
                    <Col span={7}>
                        <h4 className='priceText'>Price: ${this.props.innerTabData ? this.props.innerTabData[three_month] ? this.props.innerTabData[three_month] : 0 : 0}</h4>
                    </Col>
                </Row>
                <Row>
                    <Col span={13}>
                        <Form.Item label="6 MONTH" labelCol={{ span: 8 }}
                            wrapperCol={{ span: 15 }}>
                            {getFieldDecorator(six_month, {

                            })(<Input onChange={e =>  this.setPrice('6 month', e.target.value)} type='number' min={0} />)}


                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        {/* <Button type="primary" onClick={() => thi s.setPrice(six_month)}>Set</Button> */}
                    </Col>
                    <Col span={7}>
                        <h4 className='priceText'>Price: ${this.props.innerTabData ? this.props.innerTabData[six_month] ? this.props.innerTabData[six_month] : 0 : 0}</h4>
                    </Col>
                </Row>
                <Row>
                    <Col span={13}>
                        <Form.Item label="12 MONTH" labelCol={{ span: 8 }}
                            wrapperCol={{ span: 15 }}>
                            {getFieldDecorator(twelve_month, {

                            })(<Input onChange={e =>  this.setPrice('12 month', e.target.value)} type='number' min={0} />)}

                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        {/* <Button type="primary" onClick={() => this.setPrice(twelve_month)}>Set</Button> */}
                    </Col>
                    <Col span={7}>
                        <h4 className='priceText'>Price: ${this.props.innerTabData ? this.props.innerTabData[twelve_month] ? this.props.innerTabData[twelve_month] : 0 : 0}</h4>
                    </Col>
                </Row>

            </Form>
        )
    }
}

PricingForm = Form.create()(PricingForm);

export default PricingForm