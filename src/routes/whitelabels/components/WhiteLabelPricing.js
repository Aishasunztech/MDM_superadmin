import React, { Component } from 'react'

import {
    Button, Modal, Tabs
} from "antd";

import ItemsTab from "../../../components/ItemsTab";

import SimTabContent from "./SimTabContent";
import PackagePricingForm from './PackagePricingForm';

const { TabPane } = Tabs;
export default class WhiteLabelPricing extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    onTabChange = () => {

    }

    render() {
        return (
            <Modal
                maskClosable={false}
                destroyOnClose={true}
                title={<div>Set Prices<br></br><span>Label: {this.props.LabelName}</span></div>}
                visible={this.props.pricing_modal}
                // onOk={this.InsertNewData}
                onCancel={() => this.props.showPricingModal(false)}
                footer={null}
                width='610px'
            >
                <Tabs

                    type="card"
                >
                    <TabPane tab="Set ID Prices" key="1">
                        <ItemsTab
                            simTabContent={<SimTabContent />}
                        />
                    </TabPane>
                    <TabPane tab="SET Packages Prices" key="2">

                        <PackagePricingForm />

                    </TabPane>
                </Tabs>
            </Modal>
        )
    }
}
