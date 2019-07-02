
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Card, Button, Row, Col, Select, Input, Checkbox, Icon, Tabs, Table } from "antd";
// import {getDevicesList} from '../../appRedux/actions/Devices';
// import EditDealer from './components/editDealer';
import CircularProgress from "components/CircularProgress/index";
import AccountList from "./components/accountList";
import styles from './manage_data.css'


import { componentSearch, getDealerStatus, titleCase } from '../../utils/commonUtils';

import {
    LABEL,
    LABEL_DATA_SIM_ID,
    LABEL_DATA_CREATED_AT,
} from '../../../constants/LabelConstants';
import { DEALER_PIN } from "../../../constants/DealerConstants";
import { ACTION, NAME, ACCOUNT_TYPE, CREDITS_PURCHASED, INV_NO, STATUS, ORDER_DATE, PAID_DATE, PAY_TYPE } from "../../../constants/BillingConstants";

const TabPane = Tabs.TabPane;

var copyInnerContent = [];
var status = true;
class Billing extends Component {

    constructor(props) {
        super(props);

        const salesColumns = [
            {
                title: '#',
                dataIndex: 'count',
                align: 'center',
                className: 'row',
                width: 50,
            },
            {
                title: ACTION,
                dataIndex: 'action',
                align: 'center',
                className: 'row',
                width: 100,
            },
            {
                title: (
                    <Input.Search
                        name="name"
                        key="name"
                        id="name"
                        className="search_heading"
                        autoComplete="new-password"
                        placeholder={titleCase(NAME)}
                        onKeyUp={this.handleSearch}

                    />
                ),
                dataIndex: 'name',
                className: '',
                children: [
                    {
                        title: NAME,
                        dataIndex: 'name',
                        key: 'name',
                        align: 'center',
                        sorter: (a, b) => { return a.name.localeCompare(b.name) },
                        sortDirections: ['ascend', 'descend'],
                        className: '',
                    }
                ]
            },
            {
                title: (
                    <Input.Search
                        name="dealer_pin"
                        key="dealer_pin"
                        id="dealer_pin"
                        className="search_heading"
                        autoComplete="new-password"
                        placeholder={titleCase(DEALER_PIN)}
                        onKeyUp={this.handleSearch}

                    />
                ),
                dataIndex: 'dealer_pin',
                className: '',
                children: [
                    {
                        title: DEALER_PIN,
                        dataIndex: 'dealer_pin',
                        key: 'dealer_pin',
                        align: 'center',
                        sorter: (a, b) => a.dealer_pin - b.dealer_pin,
                        sortDirections: ['ascend', 'descend'],
                        className: '',
                    }
                ]
            },
            {
                title: (
                    <Input.Search
                        name="account_type"
                        key="account_type"
                        id="account_type"
                        className="search_heading"
                        autoComplete="new-password"
                        placeholder={titleCase(ACCOUNT_TYPE)}
                        onKeyUp={this.handleSearch}

                    />
                ),
                dataIndex: 'account_type',
                className: '',
                children: [
                    {
                        title: ACCOUNT_TYPE,
                        dataIndex: 'account_type',
                        key: 'account_type',
                        align: 'center',
                        sorter: (a, b) => { return a.account_type.localeCompare(b.account_type) },
                        sortDirections: ['ascend', 'descend'],
                        className: '',
                    }
                ]
            },
            {
                title: (
                    <Input.Search
                        name="label"
                        key="label"
                        id="label"
                        className="search_heading"
                        autoComplete="new-password"
                        placeholder={titleCase(LABEL)}
                        onKeyUp={this.handleSearch}

                    />
                ),
                dataIndex: 'label',
                className: '',
                children: [
                    {
                        title: LABEL,
                        dataIndex: 'label',
                        key: 'label',
                        align: 'center',
                        sorter: (a, b) => { return a.label.localeCompare(b.label) },
                        sortDirections: ['ascend', 'descend'],
                        className: '',
                    }
                ]
            },
            {
                title: (
                    <Input.Search
                        name="credits_purchased"
                        key="credits_purchased"
                        id="credits_purchased"
                        className="search_heading"
                        autoComplete="new-password"
                        placeholder={titleCase(CREDITS_PURCHASED)}
                        onKeyUp={this.handleSearch}

                    />
                ),
                dataIndex: 'credits_purchased',
                className: '',
                children: [
                    {
                        title: CREDITS_PURCHASED,
                        dataIndex: 'credits_purchased',
                        key: 'credits_purchased',
                        align: 'center',
                        sorter: (a, b) => a.credits_purchased - b.credits_purchased,
                        sortDirections: ['ascend', 'descend'],
                        className: '',
                    }
                ]
            },
            {
                title: (
                    <Input.Search
                        name="inv"
                        key="inv"
                        id="inv"
                        className="search_heading"
                        autoComplete="new-password"
                        placeholder={titleCase(INV_NO)}
                        onKeyUp={this.handleSearch}

                    />
                ),
                dataIndex: 'inv',
                className: '',
                children: [
                    {
                        title: INV_NO,
                        dataIndex: 'inv',
                        key: 'inv',
                        align: 'center',
                        sorter: (a, b) => { return a.inv.localeCompare(b.inv) },
                        sortDirections: ['ascend', 'descend'],
                        className: '',
                    }
                ]
            },
            {
                title: (
                    <Input.Search
                        name="status"
                        key="status"
                        id="status"
                        className="search_heading"
                        autoComplete="new-password"
                        placeholder={titleCase(STATUS)}
                        onKeyUp={this.handleSearch}

                    />
                ),
                dataIndex: 'status',
                className: '',
                children: [
                    {
                        title: STATUS,
                        dataIndex: 'status',
                        key: 'status',
                        align: 'center',
                        sorter: (a, b) => { return a.status.localeCompare(b.status) },
                        sortDirections: ['ascend', 'descend'],
                        className: '',
                    }
                ]
            },
            {
                title: (
                    <Input.Search
                        name="order_date"
                        key="order_date"
                        id="order_date"
                        className="search_heading"
                        autoComplete="new-password"
                        placeholder={titleCase(ORDER_DATE)}
                        onKeyUp={this.handleSearch}

                    />
                ),
                dataIndex: 'order_date',
                className: '',
                children: [
                    {
                        title: ORDER_DATE,
                        dataIndex: 'order_date',
                        key: 'order_date',
                        align: 'center',
                        sorter: (a, b) => a.order_date - b.order_date,
                        sortDirections: ['ascend', 'descend'],
                        className: '',
                    }
                ]
            },
            {
                title: (
                    <Input.Search
                        name="paid_date"
                        key="paid_date"
                        id="paid_date"
                        className="search_heading"
                        autoComplete="new-password"
                        placeholder={titleCase(PAID_DATE)}
                        onKeyUp={this.handleSearch}

                    />
                ),
                dataIndex: 'paid_date',
                className: '',
                children: [
                    {
                        title: PAID_DATE,
                        dataIndex: 'paid_date',
                        key: 'paid_date',
                        align: 'center',
                        sorter: (a, b) => a.paid_date - b.paid_date,
                        sortDirections: ['ascend', 'descend'],
                        className: '',
                    }
                ]
            },
            {
                title: (
                    <Input.Search
                        name="pay_type"
                        key="pay_type"
                        id="pay_type"
                        className="search_heading"
                        autoComplete="new-password"
                        placeholder={titleCase(PAY_TYPE)}
                        onKeyUp={this.handleSearch}

                    />
                ),
                dataIndex: 'pay_type',
                className: '',
                children: [
                    {
                        title: PAY_TYPE,
                        dataIndex: 'pay_type',
                        key: 'pay_type',
                        align: 'center',
                        sorter: (a, b) => a.pay_type - b.pay_type,
                        sortDirections: ['ascend', 'descend'],
                        className: '',
                    }
                ]
            },
        ]

        this.state = {
            loading: false,
            visible: false,
            pagination: 10,
            tabselect: '1',
            innerTabSelect: '1',
            salesColumns: salesColumns
        };
    }


    showModal = () => {
        this.setState({
            visible: true,
        });
    }


    filterList = (type, dealers) => {
        let dumyDealers = [];
        dealers.filter(function (dealer) {
            let dealerStatus = getDealerStatus(dealer.unlink_status, dealer.account_status);
            if (dealerStatus === type) {
                dumyDealers.push(dealer);
            }
        });
        return dumyDealers;
    }
    componentDidMount() {
    }




    componentWillReceiveProps(nextProps) {

        if (this.state.innerTabSelect == '1') {
            this.setState({
                innerContent: nextProps.chat_ids
            })
        } else if (this.state.innerTabSelect == '2') {
            this.setState({
                innerContent: nextProps.pgp_emails
            })
        } else if (this.state.innerTabSelect == '3') {
            this.setState({
                innerContent: nextProps.sim_ids
            })
        }
    }

    handleComponentSearch = (value) => {
        try {
            if (value.length) {
                if (status) {
                    copyInnerContent = this.state.innerContent;
                    status = false;
                }
                let founddealers = componentSearch(copyInnerContent, value);
                // console.log("found dealers", founddealers);
                if (founddealers.length) {
                    this.setState({
                        innerContent: founddealers,
                    })
                } else {
                    this.setState({
                        innerContent: []
                    })
                }
            } else {
                status = true;
                this.setState({
                    innerContent: copyInnerContent,
                })
            }
        } catch (error) {
            // alert(error);
        }
    }


    handlePagination = (value) => {
        this.refs.dealerList.handlePagination(value);
        this.props.postPagination(value, this.state.dealer_type);
    }

    handleChangetab = (value) => {
        this.setState({
            tabselect: value
        })


    }

    handleChangeInnerTab = (value) => {
        switch (value) {
            case '1':
                this.setState({
                    innerContent: this.props.chat_ids,
                    columns: this.state.columnsChatids,
                    innerTabSelect: '1'
                })
                status = true;
                break;
            case '2':
                this.setState({
                    innerContent: this.props.pgp_emails,
                    columns: this.state.columnsPgpemails,
                    innerTabSelect: '2'
                })
                status = true;

                break;
            case "3":
                this.setState({
                    innerContent: this.props.sim_ids,
                    columns: this.state.columnsSimids,
                    innerTabSelect: '3'
                })
                status = true;
                break;
            case '4':
                this.setState({
                    // dealers: this.filterList('suspended', this.props.dealers),
                    innerContent: [],
                    columns: this.state.columnsVpn,
                    innerTabSelect: '4'
                })
                status = true;
                break;


            default:
                this.setState({
                    innerContent: this.props.chat_ids,
                    columns: this.state.columnsChatids,
                    innerTabSelect: '1'
                })
                status = true;
                break;
        }

        // this.handleCheckChange(this.props.selectedOptions)

    }


    render() {
        // console.log(this.state.columns, window.location.pathname.split("/").pop(), this.state.options)
        const Search = Input.Search;
        return (

            <div>
                {
                    this.props.isloading ? <CircularProgress /> :

                        <div style={{ marginTop: 50 }}>
                            <Tabs defaultActiveKey="1" type='card' className="dev_tabs" activeKey={this.state.tabselect} onChange={this.handleChangetab}>
                                <TabPane tab="SALES" key="1" >
                                    <Table
                                        size="middle"
                                        // className="gx-table-responsive devices table m_d_table"
                                        bordered
                                        scroll={{ x: 500 }}
                                        columns={this.state.salesColumns}
                                        rowKey='row_key'
                                        align='center'
                                        pagination={{ pageSize: this.state.pagination, size: "midddle" }}
                                        dataSource={[]}
                                        scroll={{
                                            x: 300,
                                        }}
                                    />
                                </TabPane>
                                <TabPane tab="REPORTS" key="2" >

                                    {/* 
                                    <AccountList
                                        whiteLables={this.state.whiteLables}
                                        columns={this.state.columns}
                                        dataList={this.state.innerContent}
                                        // suspendDealer={this.props.suspendDealer}
                                        // activateDealer={this.props.activateDealer}
                                        // deleteDealer={this.props.deleteDealer}
                                        // undoDealer={this.props.undoDealer}
                                        // editDealer={this.props.editDealer}
                                        pagination={this.props.DisplayPages}
                                        // getDealerList={this.props.getDealerList}
                                        tabselect={this.state.tabselect}
                                        innerTabSelect={this.state.innerTabSelect}
                                        handleChangetab={this.handleChangetab}
                                        handleChangeInnerTab={this.handleChangeInnerTab}
                                        // updatePassword={this.props.updatePassword}
                                        ref='dealerList'
                                    /> */}
                                </TabPane>
                                <TabPane tab="PROFIT AND LOSS" key="3" >
                                </TabPane>
                            </Tabs>


                        </div>
                }
            </div>
        );
    }

    handleSearch = (e) => {
        // console.log('hi search val is: ', e.target.value);
        // console.log('hi inner content val is: ', this.state.innerContent);

        let demoItems = [];
        if (status) {
            copyInnerContent = this.state.innerContent;
            status = false;
        }
        // console.log("devices", copyInnerContent);

        if (e.target.value.length) {
            copyInnerContent.forEach((item) => {

                if (item[e.target.name] !== undefined) {
                    if ((typeof item[e.target.name]) === 'string') {
                        if (item[e.target.name].toUpperCase().includes(e.target.value.toUpperCase())) {
                            demoItems.push(item);
                        }
                    } else if (item[e.target.name] != null) {
                        if (item[e.target.name].toString().toUpperCase().includes(e.target.value.toUpperCase())) {
                            demoItems.push(item);
                        }
                    } else {
                        // demoDevices.push(device);
                    }
                } else {
                    demoItems.push(item);
                }
            });
            // console.log("searched value", demoItems);
            this.setState({
                innerContent: demoItems
            })
        } else {
            this.setState({
                innerContent: copyInnerContent
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
            }
        });
    }
}


var mapStateToProps = (state) => {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Billing)