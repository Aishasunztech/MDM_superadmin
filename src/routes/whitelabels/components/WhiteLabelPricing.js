import React, { Component } from 'react'

import {
    Button, Modal, Tabs
} from "antd";

import ItemsTab from "../../../components/ItemsTab";

import SimTabContent from "./SimTabContent";
import PackagePricingForm from './PackagePricingForm';
import { sim, chat, pgp, vpn, pkg_features } from '../../../constants/Constants';

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
            pkg_features: pkg_features,
            outerTab: '1',
            pkgName: '',
            pkgTerms: '',
            pkgPrice: 0
        }

    }

    componentDidMount() {

    }

    onTabChange = () => {

    }

    handleSubmit = () => {

        if(this.state.outerTab === '1'){
            let data = {
                sim_id: this.state[sim],
                chat_id: this.state[chat],
                pgp_email: this.state[pgp],
                vpn: this.state[vpn],
            };
            // console.log(this.props.whitelabel_id)
    
            this.props.saveIDPrices({ data: data, whitelabel_id: this.props.whitelabel_id })
            this.props.showPricingModal(false);
            this.setState({
                [sim]: {},
                [chat]: {},
                [pgp]: {},
                [vpn]: {},
                innerTab: sim
            })
        }else if(this.state.outerTab === '2'){
            console.log('ref is hte ', this.form);
            this.form.props.form.validateFields((err, values) => {
                if(!err){
                    console.log('no error found', values);
                    if(this.state.pkg_features){
                        let data = {
                            pkgName: values.pkgName,
                            pkgTerm: values.pkgTerms,
                            pkgPrice: this.state.pkgPrice,
                            pkgFeatures: this.state.pkg_features,
                            whitelabel_id: this.props.whitelabel_id
                        }
                        this.props.setPackage(data);
                        this.props.showPricingModal(false);
                        this.setState({
                            pkgPrice: 0,
                            pkg_features: pkg_features,
                        })
                    }
                }
            })
        }
       
        // console.log('submit data is', data)

    }

    setPkgDetail = (value, field, is_pkg_feature=false) => {
        if(is_pkg_feature){
            console.log(this.state.pkg_features ,'pkg features')
            this.state.pkg_features[field] = value
        }else{
            this.state[field] = value
        } 
    }

    setPrice = (price, field, price_for) => {

        this.state[price_for][field] = price
        // console.log('price', price, 'field', field, 'price_for', price_for)
    }

    innerTabChanged = (e) => {
        this.setState({
            innerTab: e,
        })
    }

    render() {
        // console.log(sim, this.state[sim], 'sim object ',this.state[chat], 'chat object ',this.state[pgp], 'pgp object',this.state[vpn], 'sim object',)
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
                    onChange={(e)=> this.setState({outerTab: e})}
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
                            setPkgDetail={this.setPkgDetail}
                            wrappedComponentRef={(form) => this.form = form}
                        />

                    </TabPane>
                </Tabs>
            </Modal>
        )
    }
}
