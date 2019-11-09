import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Input, Checkbox, Icon, Tabs, Table } from "antd";
import Invoice from "./components/Invoice";
import ProductInventory from './components/ProductInventory';
import HardwareInventory from './components/HardwareInventory';
import PaymentHistory from './components/PaymentHistory';
import AppFilter from '../../../components/AppFilter';
import { getDealerList, generateProductReport, generateInvoiceReport, generatePaymentHistoryReport, generateHardwareReport } from '../../../appRedux/actions';

import styles from './reporting.css'


const TabPane = Tabs.TabPane;

class Reports extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      visible: false,
      tabselect: '1',
      innerTabSelect: '1',
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
  }

  handleChangeTab = (value) => {
    this.setState({
      tabselect: value
    })
  };


  render() {
    const Search = Input.Search;
    return (

      <div>
        <AppFilter
          pageHeading={"REPORTS"}
        />
        {

          <div>
            <Tabs defaultActiveKey="1" type='card' className="dev_tabs" activeKey={this.state.tabselect} onChange={this.handleChangeTab}>
              <TabPane tab="PRODUCT INVENTORY" key="1">
                <ProductInventory
                  whiteLabels={this.props.whiteLabels}
                  dealerList={this.props.dealerList}
                  getDealerList={this.props.getDealerList}
                  translation={this.props.translation}
                  productReport={this.props.productReport}
                  productType={this.props.productType}
                  generateProductReport={this.props.generateProductReport}
                  user={this.props.user}
                />
              </TabPane>

              <TabPane tab="HARDWARE INVENTORY" key="2">
                <HardwareInventory
                  whiteLabels={this.props.whiteLabels}
                  dealerList={this.props.dealerList}
                  getDealerList={this.props.getDealerList}
                  translation={this.props.translation}
                  generateHardwareReport={this.props.generateHardwareReport}
                  hardwareReport={this.props.hardwareReport}
                  user={this.props.user}
                />
              </TabPane>

              <TabPane tab="PAYMENT HISTORY" key="3">
                <PaymentHistory
                  whiteLabels={this.props.whiteLabels}
                  dealerList={this.props.dealerList}
                  getDealerList={this.props.getDealerList}
                  translation={this.props.translation}
                  generatePaymentHistoryReport={this.props.generatePaymentHistoryReport}
                  paymentHistoryReport={this.props.paymentHistoryReport}
                  user={this.props.user}
                />
              </TabPane>

              <TabPane tab="INVOICES" key="4">
                <Invoice
                  whiteLabels={this.props.whiteLabels}
                  dealerList={this.props.dealerList}
                  getDealerList={this.props.getDealerList}
                  translation={this.props.translation}
                  generateInvoiceReport={this.props.generateInvoiceReport}
                  invoiceReport={this.props.invoiceReport}
                  user={this.props.user}
                />
              </TabPane>

            </Tabs>
          </div>
        }
      </div>
    );
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {

      }
    });
  }
}



var mapStateToProps = ({ settings, reports, auth, account, sidebarMenu }) => {
  return {
    user: auth.authUser,
    productReport: reports.productData,
    hardwareReport: reports.hardwareData,
    invoiceReport: reports.invoiceData,
    paymentHistoryReport: reports.paymentHistoryData,
    productType: reports.productType,
    translation: settings.translation,
    whiteLabels: sidebarMenu.whiteLabels,
    dealerList: account.dealerList
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    generateProductReport: generateProductReport,
    generateInvoiceReport: generateInvoiceReport,
    generatePaymentHistoryReport: generatePaymentHistoryReport,
    generateHardwareReport: generateHardwareReport,
    getDealerList: getDealerList
  }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(Reports)
