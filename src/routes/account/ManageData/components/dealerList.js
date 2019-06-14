import React, { Component, Fragment } from 'react'
import { Table, Avatar, Switch, Button, Icon, Card, Modal } from "antd";
// import { BASE_URL } from '../../../constants/Application';
import EditDealer from './editDealer';
import { Tabs } from 'antd';
import EditApk from './editDealer';
const TabPane = Tabs.TabPane;

let data = [];
const confirm = Modal.confirm;
class DealerList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: '',
            columns: [],
            dataFieldName: '',
            pagination: this.props.pagination,
            innerTabSelect: this.props.innerTabSelect

        };
        this.renderList = this.renderList.bind(this);
    }

    handlePagination = (value) => {
        // console.log(value)
        var x = Number(value)
        this.setState({
            pagination: x,
        });
    }

    componentDidUpdate(prevProps) {

        if (this.props !== prevProps) {
            this.setState({
                columns: this.props.columns
            })
        }
    }

    // handleCheckChange = (values) => {

    //     let dumydata = this.state.columns;

    //     try {
    //         if (values.length) {
    //             this.state.columns.map((column, index) => {

    //                 if (dumydata[index].className !== 'row') {
    //                     dumydata[index].className = 'hide';
    //                 }

    //                 values.map((value) => {
    //                     if (column.title === value) {
    //                         dumydata[index].className = '';
    //                     }
    //                 });

    //             });

    //             this.setState({ columns: dumydata });

    //         } else {
    //             const newState = this.state.columns.map((column) => {
    //                 if (column.className === 'row') {
    //                     return column;
    //                 } else {
    //                     return ({ ...column, className: 'hide' })
    //                 }
    //             });

    //             this.setState({
    //                 columns: newState,
    //             });
    //         }
    //     } catch (error) {
    //         alert(error, 'errro');
    //     }


    //     this.props.postDropdown(values, this.state.dealer_type);
    // }


    renderList(list) {
        data = [];
        list.map((item, index) => {
            data.push({
                'row_key': ++index,
                'count': ++index,
                'label': 'Lock Mesh',
                'chat_id': item.chat_id ? item.chat_id : 'N/A',
                'sim_id': item.sim_id ? item.sim_id : 'N/A',
                'pgp_email': item.pgp_email ? item.pgp_email : 'N/A',
                'created_at': item.created_at ? item.created_at : 'N/A',
            })
        });
        return (data);
    }

    callback = (key) => {
        this.props.handleChangeInnerTab(key);
    }


    // showInnerTabContent = (dataFieldName = "") => {
    //     // console.log(dataFieldName);
    //     if (dataFieldName === "sim_ids") {
    //         this.props.getSimIDs();
    //     } else if (dataFieldName === "pgp_emails") {
    //         this.props.getPGPEmails();
    //     } else if (dataFieldName === "chat_ids") {
    //         this.props.getChatIDs();
    //     } else if (dataFieldName === "used_pgp_emails") {
    //         this.props.getUsedPGPEmails();
    //     } else if (dataFieldName === "used_chat_ids") {
    //         this.props.getUsedChatIds();
    //     } else if (dataFieldName === "used_sim_ids") {
    //         this.props.getUsedSimIds();
    //     }
    //     this.setState({
    //         dataFieldName: dataFieldName,
    //     });
    // }

    render() {
        // console.log('data list at::', this.props.dataList)
        return (
            <Card>
                <Tabs defaultActiveKey="1" type='card' tabPosition="left" className="dev_tabs" onChange={this.callback}>
                    <TabPane tab="CHAT" key="1" >
                    </TabPane>
                    <TabPane tab="PGP" key="2" forceRender={true}>
                    </TabPane>
                    <TabPane tab="SIM" key="3" forceRender={true}>
                    </TabPane>
                    <TabPane tab="VPN" key="4" forceRender={true}>
                    </TabPane>

                    <Table size="middle"
                        className="gx-table-responsive devices table"
                        bordered
                        scroll={{ x: 500 }}
                        columns={this.state.columns}
                        rowKey='row_key'
                        align='center'
                        pagination={{ pageSize: this.state.pagination, size: "midddle" }}
                        dataSource={this.renderList(this.props.dataList)}
                    />
                </Tabs>
            </Card>
        )
    }
}

// function showConfirm(id, action, btn_title) {
//     confirm({
//         title: 'Do you want to ' + btn_title + ' of this ' + window.location.pathname.split("/").pop() + ' ?',
//         onOk() {
//             return new Promise((resolve, reject) => {
//                 setTimeout(Math.random() > 0.5 ? resolve : reject);
//                 if (btn_title === 'RESET PASSWORD') {
//                     id.pageName = 'dealer'
//                 }
//                 action(id);
//                 //  success();

//             }).catch(() => console.log('Oops errors!'));
//         },
//         onCancel() { },
//     });
// }
export default class Tab extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataList: this.props.dataList,
            tabselect: this.props.tabselect,
            selectedOptions: this.props.selectedOptions,
            // innerTabSelect: this.props.innerTabSelect

        }
    }
    callback = (key) => {
        this.props.handleChangetab(key);
    }

    handlePagination = (value) => {
        this.refs.dataList.handlePagination(value);
    }

    componentDidUpdate(prevProps) {

        if (this.props !== prevProps) {

            this.setState({
                dataList: this.props.dataList,
                columns: this.props.columns,
                tabselect: this.props.tabselect,
                // innerTabSelect: this.props.innerTabSelect,
                selectedOptions: this.props.selectedOptions
            })
        }
    }

    render() {
        return (
            <Fragment>
                <Tabs defaultActiveKey="1" type='card' className="dev_tabs" activeKey={this.state.tabselect} onChange={this.callback}>
                    <TabPane tab="All" key="1" >
                    </TabPane>
                    <TabPane tab="LockMesh" key="2" forceRender={true}>
                    </TabPane>
                    <TabPane tab="Titan Locker" key="3" forceRender={true}>
                    </TabPane>
                </Tabs>

                <DealerList
                    dataList={this.state.dataList}
                    innerTabSelect={this.props.innerTabSelect}
                    // suspendDealer={this.props.suspendDealer}
                    // activateDealer={this.props.activateDealer}
                    // deleteDealer={this.props.deleteDealer}
                    // undoDealer={this.props.undoDealer}
                    columns={this.props.columns}
                    // selectedOptions={this.state.selectedOptions}
                    ref="dealerList"
                    pagination={this.props.pagination}
                    // editDealer={this.props.editDealer}
                    // updatePassword={this.props.updatePassword}
                    handleChangeInnerTab={this.props.handleChangeInnerTab}
                />
            </Fragment>

        )
    }
}