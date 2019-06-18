import React, { Component } from 'react'

import {
    Button, Modal, Tabs
} from "antd";

import ItemsTab from "../../../components/ItemsTab";

import SimTabContent from "./SimTabContent";

const { TabPane } = Tabs;
export default class WhiteLabelPricing extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    onTabChange= ()=>{

    }

    render() {
        return (
            <Modal
                maskClosable={false}
                destroyOnClose={true}
                title="Pricing"
                visible={this.props.pricing_modal}
                // onOk={this.InsertNewData}
                onCancel={() => this.props.showPricingModal(false)}
                footer={null}
            >
                <Tabs
                    // onChange={this.callback} 
                    type="card"
                >
                    <TabPane tab="Set ID Prices" key="1">
                        <ItemsTab
                            simTabContent={<SimTabContent />}
                        />
                    </TabPane>
                    <TabPane tab="SET Packages Prices" key="2">
                        Content of Tab Pane 2
                    </TabPane>
                </Tabs>
            </Modal>
        )
    }
}
