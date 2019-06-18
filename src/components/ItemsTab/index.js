import React, { Component } from 'react'

import {
    Tabs
} from "antd";

import {
    TAB_SIM_ID,
    TAB_CHAT_ID,
    TAB_PGP_EMAIL,
    TAB_VPN
} from '../../constants/LabelConstants';
const { TabPane } = Tabs;

export default class ItemTabs extends Component {
    render() {
        return (
            <Tabs
                tabPosition={'left'}
                type="card"
            >
                <TabPane tab={TAB_SIM_ID} key="1" >
                    {this.props.simTabContent}
                </TabPane>
                <TabPane tab={TAB_CHAT_ID} key="2" >

                </TabPane>
                <TabPane tab={TAB_PGP_EMAIL} key="3" >

                </TabPane>
                <TabPane tab={TAB_VPN} key="4" >

                </TabPane>
            </Tabs>
        )
    }
}
