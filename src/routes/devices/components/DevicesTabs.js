import React, { Component, Fragment } from 'react'
import { Table, Button, Card, Tag, Form, Input, Popconfirm, Empty, Icon, Tabs, Modal } from "antd";

import DevicesList from "./DevicesList";


export default class DevicesTabs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            devices: this.props.devices,
            tabselect: this.props.tabselect,
            selectedOptions: this.props.selectedOptions
        }
    }

    callback = (key) => {
        this.props.handleChangetab(key);
    }

    deleteAllUnlinkedDevice = (type) => {
        this.refs.devciesList.deleteAllUnlinkedDevice(type)
    }
    deleteAllPreActivedDevice = (type) => {

        this.refs.devciesList.deleteAllUnlinkedDevice(type)
    }

    handlePagination = (value) => {
        this.refs.devciesList.handlePagination(value);
    }

    componentDidUpdate(prevProps) {

        if (this.props !== prevProps) {

            this.setState({
                devices: this.props.devices,
                columns: this.props.columns,
                tabselect: this.props.tabselect,
                selectedOptions: this.props.selectedOptions
            })
            // this.refs.devciesList.handlePagination(this.state.tabselect);
        }
    }

    render() {
        return (
            <Fragment>
                <Tabs type='card' className="dev_tabs" activeKey={this.state.tabselect} onChange={this.callback}>
                    <Tabs.TabPane tab="All" key="1" />
                    <Tabs.TabPane tab={<span className="green">Active</span>} key="4" forceRender={true} />
                    <Tabs.TabPane tab={<span className="red">Expired</span>} key="6" forceRender={true} />
                    <Tabs.TabPane tab={<span className="yellow">Suspended</span>} key="7" forceRender={true} />
                    <Tabs.TabPane tab={<span className="orange">Archived</span>} key="5" forceRender={true} />
                </Tabs>
                
                <DevicesList
                    devices={this.state.devices}
                    suspendDevice={this.props.suspendDevice}
                    activateDevice={this.props.activateDevice}
                    columns={this.props.columns}
                    rejectDevice={this.props.rejectDevice}
                    selectedOptions={this.state.selectedOptions}
                    ref="devciesList"
                    pagination={this.props.pagination}
                    editDevice={this.props.editDevice}
                    tabselect={this.state.tabselect}
                    deleteUnlinkDevice={this.props.deleteUnlinkDevice}
                    resetTabSelected={this.resetTabSelected}
                    user={this.props.user}
                    history={this.props.history}
                    showDateModal={this.props.showDateModal}
                />
            </Fragment>
        )
    }
}