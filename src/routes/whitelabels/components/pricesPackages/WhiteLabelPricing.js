import React, { Component } from 'react'

import {
    Button, Modal, Tabs, Col, Row, Divider
} from "antd";

import ItemsTab from "../../../../components/ItemsTab";

import PackagePricingForm from './components/PackagePricingForm';
import { sim, chat, pgp, vpn, pkg_features } from '../../../../constants/Constants';

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
            pkg_features: JSON.parse(JSON.stringify(pkg_features)),
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

        // console.log('tab selected is', this.state.outerTab)

        if (this.state.outerTab === '1') {
            let data = this.props.prices
            // console.log(data, 'price data')

            this.props.saveIDPrices({ data: data, whitelabel_id: this.props.whitelabel_id })
            this.props.showPricingModal(false);
            this.setState({
                [sim]: {},
                [chat]: {},
                [pgp]: {},
                [vpn]: {},
                innerTab: sim,
                outerTab: '1'
            })
        } else if (this.state.outerTab === '2') {
            // console.log('ref is hte ', this.form);
            // this.form.props.form.validateFields((err, values) => {
            // if (!err) {

            if (this.state.pkg_features && this.state.pkgName && this.state.pkgTerms && this.state.pkgName != '' && this.state.pkgTerms != '') {
                // console.log(this.state.pkg_features, pkg_features);
                let data = {
                    pkgName: this.state.pkgName,
                    pkgTerm: this.state.pkgTerms,
                    pkgPrice: this.state.pkgPrice,
                    pkgFeatures: this.state.pkg_features,
                    whitelabel_id: this.props.whitelabel_id
                }
                // this.props.setPackage(data);
                // this.props.showPricingModal(false);
                // this.setState({
                //     pkgPrice: 0,
                //     pkg_features: pkg_features,
                //     pkgName: '',
                //     pkgTerms: '',
                //     outerTab: '1'
                // })

                showConfirm(this, data)
            }
            // }
            // })
        }

        // console.log('submit data is', data)

    }

    setPkgDetail = (value, field, is_pkg_feature = false) => {
        if (is_pkg_feature) {
            this.state.pkg_features[field] = value
        } else {
            this.state[field] = value
        }

    }


    setPrice = (price, field, price_for) => {

        if (price > 0 || price == '') {
            this.state[price_for][field] = price
        }
        // console.log('price', price, 'field', field, 'price_for', price_for)
    }

    innerTabChanged = (e) => {
        this.setState({
            innerTab: e,
        })
    }

    render() {
        // console.log(pkg_features, 'this.state.pksfeatures', this.state.pkg_features)
        // console.log(sim, this.state[sim], 'sim object ',this.state[chat], 'chat object ',this.state[pgp], 'pgp object',this.state[vpn], 'sim object',)
        return (
            <Modal
                maskClosable={false}
                destroyOnClose={true}
                title={<div>Set Prices<br></br><span>Label: {this.props.LabelName}</span></div>}
                visible={this.props.pricing_modal}
                onOk={this.handleSubmit}
                okText='Save'
                okButtonProps={{ disabled: this.state.outerTab == '1' ? !this.props.isPriceChanged : false }}
                onCancel={() => {
                    this.props.showPricingModal(false);
                    this.props.resetPrice();
                    this.setState({
                        outerTab: '1',
                        pkgPrice: 0,
                        pkg_features: JSON.parse(JSON.stringify(pkg_features)),
                        pkgTerm: '',
                        pkgName: ''
                    })
                }}
                // footer={null}
                width='650px'
            >
                <Tabs
                    className="set_price"
                    type="card"
                    onChange={(e) => this.setState({ outerTab: e })}
                >
                    <TabPane tab="Set ID Prices" key="1">
                        <ItemsTab
                            innerTabChanged={this.innerTabChanged}
                            setPrice={this.props.setPrice}
                            prices={this.props.prices}

                        />
                    </TabPane>
                    <TabPane tab="SET Packages Prices" key="2">
                        <PackagePricingForm
                            showPricingModal={this.props.showPricingModal}
                            setPkgDetail={this.setPkgDetail}
                            wrappedComponentRef={(form) => this.form = form}
                            ref="packageForm"
                        />

                    </TabPane>
                </Tabs>
            </Modal>
        )
    }
}


function showConfirm(_this, data) {
    Modal.confirm({
        title: 'Save Package ?',
        cancelText: 'Cancel',
        okText: 'Save',
        content: <div>
            <Row>
                <Divider />
                <Col span={12}><p>Package Name</p>
                    {/* <Button type="primary" onClick={() => this.setPrice('pkgName')}> {convertToLang(this.props.translation[Button_SET], "SET")} </Button> */}
                </Col>
                <Col span={12}>
                    <p >{_this.state.pkgName}</p>
                </Col>


                <Col span={12}><p>Package Term</p>
                    {/* <Button type="primary" onClick={() => this.setPrice('pkgName')}> {convertToLang(this.props.translation[Button_SET], "SET")} </Button> */}
                </Col>
                <Col span={12}>
                    <p >{_this.state.pkgTerms}</p>
                </Col>


                <Col span={12}><p>Package Price</p>
                    {/* <Button type="primary" onClick={() => this.setPrice('pkgName')}> {convertToLang(this.props.translation[Button_SET], "SET")} </Button> */}
                </Col>
                <Col span={12}>
                    <p >{_this.state.pkgPrice}</p>
                </Col>


                <Col span={12}><p>Sim id</p>
                    {/* <Button type="primary" onClick={() => this.setPrice('pkgName')}> {convertToLang(this.props.translation[Button_SET], "SET")} </Button> */}
                </Col>
                <Col span={12}>
                    <p >{_this.state.pkg_features.sim_id ? 'yes' : 'No'}</p>
                </Col>

                <Col span={12}><p>Sim id 2</p>
                    {/* <Button type="primary" onClick={() => this.setPrice('pkgName')}> {convertToLang(this.props.translation[Button_SET], "SET")} </Button> */}
                </Col>
                <Col span={12}>
                    <p >{_this.state.pkg_features.sim_id2 ? 'yes' : 'No'}</p>
                </Col>


                <Col span={12}><p>Chat id</p>
                    {/* <Button type="primary" onClick={() => this.setPrice('pkgName')}> {convertToLang(this.props.translation[Button_SET], "SET")} </Button> */}
                </Col>
                <Col span={12}>
                    <p >{_this.state.pkg_features.chat_id ? 'yes' : 'No'}</p>
                </Col>

                <Col span={12}><p>Pgp Email</p>
                    {/* <Button type="primary" onClick={() => this.setPrice('pkgName')}> {convertToLang(this.props.translation[Button_SET], "SET")} </Button> */}
                </Col>
                <Col span={12}>
                    <p >{_this.state.pkg_features.pgp_email ? 'yes' : 'No'}</p>
                </Col>

                <Col span={12}><p>Vpn</p>
                    {/* <Button type="primary" onClick={() => this.setPrice('pkgName')}> {convertToLang(this.props.translation[Button_SET], "SET")} </Button> */}
                </Col>
                <Col span={12}>
                    <p >{_this.state.pkg_features.vpn ? 'yes' : 'No'}</p>
                </Col>
            </Row>
        </div>,
        onOk() {
            // console.log('OK');
            _this.props.setPackage(data);
            _this.props.showPricingModal(false);
            _this.setState({
                pkgPrice: 0,
                pkg_features: JSON.parse(JSON.stringify(pkg_features)),
                pkgTerm: '',
                pkgName: '',
                outerTab: '1'
            })
        },
        onCancel() {
            // console.log('Cancel');
        },
    });
}