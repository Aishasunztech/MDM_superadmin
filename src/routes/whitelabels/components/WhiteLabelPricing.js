import React, { Component } from 'react'

import {
    Button, Modal, Tabs
} from "antd";

import ItemsTab from "../../../components/ItemsTab";

import SimTabContent from "./SimTabContent";
import PackagePricingForm from './PackagePricingForm';
import { sim, chat, pgp, vpn } from '../../../constants/Constants';

const { TabPane } = Tabs;
export default class WhiteLabelPricing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            innerTab: sim,
            [sim]: {},
            [chat]: {},
            [pgp]: {},
            [vpn]: {},
        }

    }

    componentDidMount() {

    }

    onTabChange = () => {

    }

    handleSubmit = () => {

        let data = {
            sim: this.state[sim],
            chat: this.state[chat],
            pgp: this.state[pgp],
            vpn: this.state[vpn],
        };
// console.log(this.props.whitelabel_id)

        this.props.saveIDPrices({data: data, whitelabel_id: this.props.whitelabel_id})
        this.props.showPricingModal(false);
        this.setState({
            [sim]: {},
            [chat]: {},
            [pgp]: {},
            [vpn]: {},
        })
        console.log('submit data is', data)

    }

    setPrice = (price, field, price_for) => {

        this.state[price_for][field] = price
        console.log('price', price, 'field', field, 'price_for', price_for)
    }

    innerTabChanged = (e) => {
        this.setState({
            innerTab: e,
        })
    }

    render() {
        console.log(this.state[sim], 'sim object ',this.state[chat], 'chat object ',this.state[pgp], 'pgp object',this.state[vpn], 'sim object',)
        return (
            <Modal
                maskClosable={false}
                destroyOnClose={true}
                title={<div>Set Prices<br></br><span>Label: {this.props.LabelName}</span></div>}
                visible={this.props.pricing_modal}
                onOk={this.handleSubmit}
                okText='Submit'
                onCancel={() => this.props.showPricingModal(false)}
                // footer={null}
                width='610px'
            >
                <Tabs
                    type="card"
                >
                    <TabPane tab="Set ID Prices" key="1">
                        <ItemsTab
                            simTabContent={<SimTabContent
                                showPricingModal={this.props.showPricingModal}
                                setPrice={this.setPrice}
                                innerTab={this.state.innerTab}
                            />}
                            innerTabChanged={this.innerTabChanged}
                        />
                    </TabPane>
                    <TabPane tab="SET Packages Prices" key="2">

                        <PackagePricingForm
                            showPricingModal={this.props.showPricingModal}
                        />

                    </TabPane>
                </Tabs>
            </Modal>
        )
    }
}
