import React, { Component, Fragment } from 'react'
import { Table, Avatar, Switch, Button, Icon, Card, Modal, Tabs, Col, Input, Form, Row, DatePicker, Select } from "antd";
import moment from 'moment';
import styles from '../reporting.css'
import { generatePDF, generateExcel } from "../../../utils/commonUtils";
import {
  DEVICE_PRE_ACTIVATION
} from "../../../../constants/Constants";

import {
  BASE_URL
} from "../../../../constants/Application";
var columns;
var rows;
var fileName = 'sales_' + new Date().getTime()

class Sales extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '#',
        dataIndex: 'count',
        align: 'center',
        className: 'row',
        width: 50,
        sorter: (a, b) => { return a.count - b.count },
        sortDirections: ['ascend', 'descend'],
      },

      {
        title: "DEVICE ID",
        align: "center",
        className: '',
        dataIndex: 'device_id',
        key: 'device_id',
        sorter: (a, b) => { return a.device_id.localeCompare(b.device_id) },
        sortDirections: ['ascend', 'descend'],
      },

      {
        title: "DEALER ID",
        align: "center",
        className: '',
        dataIndex: 'dealer_pin',
        key: 'dealer_pin',
        sorter: (a, b) => { return a.dealer_pin - b.dealer_pin },
        sortDirections: ['ascend', 'descend'],
      },

      {
        title: "TYPE",
        align: "center",
        className: '',
        dataIndex: 'type',
        key: 'type',
        sorter: (a, b) => { return a.type.localeCompare(b.type) },
        sortDirections: ['ascend', 'descend'],
      },

      {
        title: "NAME",
        align: "center",
        className: '',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => { return a.name.localeCompare(b.name) },
        sortDirections: ['ascend', 'descend'],
      },

      // {
      //   title: "COST PRICE (CREDITS)",
      //   align: "center",
      //   className: '',
      //   dataIndex: 'cost_price',
      //   key: 'cost_price',
      //   sorter: (a, b) => { return a.cost_price - b.cost_price },
      //   sortDirections: ['ascend', 'descend'],
      // },

      {
        title: "SALE PRICE (CREDITS)",
        align: "center",
        className: '',
        dataIndex: 'sale_price',
        key: 'sale_price',
        sorter: (a, b) => { return a.sale_price - b.sale_price },
        sortDirections: ['ascend', 'descend'],
      },

      // {
      //   title: "PROFIT/LOSS (CREDITS)",
      //   align: "center",
      //   className: '',
      //   dataIndex: 'profit_loss',
      //   key: 'profit_loss',
      //   sorter: (a, b) => { return a.profit_loss - b.profit_loss },
      //   sortDirections: ['ascend', 'descend'],
      // },

      {
        title: "CREATED AT",
        align: "center",
        className: '',
        dataIndex: 'created_at',
        key: 'created_at',
        sorter: (a, b) => { return a.created_at.localeCompare(b.created_at) },
        sortDirections: ['ascend', 'descend'],
        defaultSortOrder: 'descend'
      },
    ];

    this.state = {
      reportCard: false,
      reportFormData: {},
      isLabel: false
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      this.state.reportFormData = values;
      this.props.generateSalesReport(values)
    });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.salesReport !== prevProps.salesReport) {
      this.setState({
        reportCard: true
      })

      rows = this.props.salesReport.map((item, index) => {
        return {
          count: ++index,
          device_id: item.device_id ? item.device_id : DEVICE_PRE_ACTIVATION,
          dealer_pin: item.dealer_pin ? item.dealer_pin : 'N/A',
          created_at: item.created_at ? item.created_at : 'N/A',
        }
      });

      columns = [
        { title: '#', dataKey: "count" },
        { title: "DEVICE ID", dataKey: "device_id" },
        { title: "USER PAYMENT STATUS", dataKey: "end_user_payment_status" },
        { title: "GENERATED AT", dataKey: "created_at" },
      ];
    }
  }

  handleReset = () => {
    this.props.form.resetFields();
  };

  disabledDate = (current) => {
    return current && current > moment().endOf('day');
  };

  renderList = (list) => {

    let data = [];
    if (list) {
      list.map((item, index) => {
        data.push({
          'key': index,
          'count': ++index,
          'device_id': item.device_id ? item.device_id : DEVICE_PRE_ACTIVATION,
          'dealer_pin': item.dealer_pin ? item.dealer_pin : 'N/A',
          'type': item.type ? item.type : 'N/A',
          'name': item.name ? item.name : 'N/A',
          // 'cost_price': item.cost_price ? item.cost_price : 0,
          'sale_price': item.cost_price ? item.cost_price : 0, // cost price of admin is sale price of super admin
          // 'profit_loss': item.profit_loss ? item.profit_loss : 0,
          'created_at': item.created_at ? item.created_at : 'N/A',
        })
      });
    }
    return data;
  };

  createPDF = () => {
    var columns = [
      { title: '#', dataKey: "count" },
      { title: "INVOICE ID", dataKey: "invoice_id" },
      { title: "DEVICE ID", dataKey: "device_id" },
      { title: "USER PAYMENT STATUS", dataKey: "end_user_payment_status" },
      { title: "GENERATED AT", dataKey: "created_at" },
    ];

    var rows = this.props.salesReport.map((item, index) => {
      return {
        count: ++index,
        invoice_id: item.inv_no ? item.inv_no : 'N/A',
        device_id: item.device_id ? item.device_id : DEVICE_PRE_ACTIVATION,
        dealer_pin: item.dealer_pin ? item.dealer_pin : 'N/A',
        created_at: item.created_at ? item.created_at : 'N/A',
        end_user_payment_status: item.end_user_payment_status ? item.end_user_payment_status : 'N/A',
      }
    });

    let fileName = 'invoice_' + new Date().getTime();

  }

  handleLabelChange = (e) => {
    if (e == '') {
      this.setState({
        isLabel: false
      })

    } else {
      this.props.getDealerList(e)
      this.setState({
        isLabel: true
      })
    }
  }

  render() {
    return (
      <Row>
        <Col xs={24} sm={24} md={9} lg={9} xl={9}>
          <Card style={{ height: '500px', paddingTop: '50px' }}>
            <Form onSubmit={this.handleSubmit} autoComplete="new-password">

              <Form.Item
                label="Label"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 14 }}
              >
                {this.props.form.getFieldDecorator('label', {
                  initialValue: '',
                  rules: [{
                    required: true, message: 'label is Required !',
                  }],
                })(
                  <Select
                    onChange={(e) => this.handleLabelChange(e)}
                    style={{ width: '100%' }}
                  >

                    <Select.Option value=''>SELECT LABEL</Select.Option>
                    {this.props.whiteLabels.map((label, index) => {
                      return (<Select.Option key={index} value={label.id}>{label.name}</Select.Option>)
                    })}
                  </Select>
                )}

              </Form.Item>

              {(this.state.isLabel) ?
                <Fragment>

                  <Form.Item
                    label="Product Type"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 14 }}
                    width='100%'
                  >
                    {this.props.form.getFieldDecorator('product_type', {
                      initialValue: 'ALL',
                      rules: [
                        {
                          required: false
                        },
                      ],
                    })(
                      <Select style={{ width: '100%' }}>
                        <Select.Option value='ALL'>ALL</Select.Option>
                        <Select.Option value='PACKAGES'>PACKAGES</Select.Option>
                        <Select.Option value='PRODUCTS'>PRODUCTS</Select.Option>
                        <Select.Option value='HARDWARES'>HARDWARES</Select.Option>
                      </Select>
                    )}
                  </Form.Item>

                  <Form.Item
                    label="Dealer/Sdealer"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 14 }}
                    width='100%'
                  >
                    {this.props.form.getFieldDecorator('dealer', {
                      initialValue: '',
                      rules: [
                        {
                          required: false,
                        },
                      ],
                    })(
                      <Select style={{ width: '100%' }}>
                        <Select.Option value=''>ALL</Select.Option>
                        {/* <Select.Option value={this.props.user.dealerId}>My Report</Select.Option> */}
                        {this.props.dealerList.map((dealer, index) => {
                          return (<Select.Option key={dealer.dealer_id} value={dealer.dealer_id}>{dealer.dealer_name} ({dealer.link_code})</Select.Option>)
                        })}
                      </Select>
                    )}
                  </Form.Item>


                  <Form.Item
                    label="FROM (DATE) "
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 14 }}
                  >
                    {this.props.form.getFieldDecorator('from', {
                      rules: [
                        {
                          required: false
                        }],
                    })(
                      <DatePicker
                        format="DD-MM-YYYY"
                        disabledDate={this.disabledDate}
                      />
                    )}
                  </Form.Item>

                  <Form.Item
                    label="TO (DATE)"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 14 }}
                  >
                    {this.props.form.getFieldDecorator('to', {
                      rules: [
                        {
                          required: false
                        }],
                    })(
                      <DatePicker
                        format="DD-MM-YYYY"
                        onChange={this.saveExpiryDate}
                        disabledDate={this.disabledDate}

                      />
                    )}
                  </Form.Item>
                  <Form.Item className="edit_ftr_btn"
                    wrapperCol={{
                      xs: { span: 22, offset: 0 },
                    }}
                  >
                    <Button key="back" type="button" onClick={this.handleReset}>CANCEL</Button>
                    <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>GENERATE</Button>
                  </Form.Item>
                </Fragment>
                : null
              }
            </Form>

          </Card>

        </Col>
        <Col xs={24} sm={24} md={15} lg={15} xl={15}>
          <Card style={{ height: '500px', overflow: 'scroll' }}>
            {(this.state.reportCard) ?
              <Fragment>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <h3>Sales Report</h3>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div className="pull-right">
                      <Button type="dotted" icon="download" size="small" onClick={() => { generatePDF(columns, rows, 'Sales Report', fileName, this.state.reportFormData) }}>Download PDF</Button>
                      <Button type="primary" icon="download" size="small" onClick={() => { generateExcel(rows, fileName) }}>Download Excel</Button>
                    </div>
                  </Col>
                </Row>
                <Table
                  columns={this.columns}
                  dataSource={this.renderList(this.props.salesReport)}
                  bordered
                  pagination={false}
                />
                {/* <br/> */}
                {/* <Row>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <h3>Sales Credits Report</h3>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div className="pull-right">
                      <Button type="dotted" icon="download" size="small" onClick={() => { generatePDF(columns, rows, 'Sales Report', fileName, this.state.reportFormData) }}>Download PDF</Button>
                      <Button type="primary" icon="download" size="small" onClick={() => { generateExcel(rows, fileName) }}>Download Excel</Button>
                    </div>
                  </Col>
                </Row> */}
                {/* <Table
                  columns={this.columns}
                  // dataSource={this.renderList(this.props.salesReport)}
                  bordered
                  pagination={false}
                /> */}
              </Fragment>
              : null}
          </Card>
        </Col>
      </Row>
    )
  }
}

const WrappedAddDeviceForm = Form.create()(Sales);
export default WrappedAddDeviceForm;
