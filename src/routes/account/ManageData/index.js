
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Card, Button, Row, Col, Select, Input, Checkbox, Icon } from "antd";
import { getWhiteLabels } from "../../../appRedux/actions";
// import {getDevicesList} from '../../appRedux/actions/Devices';
import AppFilter from '../../../components/AppFilter';
// import EditDealer from './components/editDealer';
import CircularProgress from "components/CircularProgress/index";
import AccountList from "./components/accountList";
import styles from './manage_data.css'

import { componentSearch, getDealerStatus, titleCase } from '../../utils/commonUtils';

import {
  LABEL,
  LABEL_DATA_CHAT_ID,
  LABEL_DATA_SIM_ID,
  LABEL_DATA_PGP_EMAIL,
  LABEL_DATA_VPN,
  LABEL_DATA_CREATED_AT,
} from '../../../constants/LabelConstants';

import {
  getSimIDs,
  getChatIDs,
  getPGPEmails,
} from "../../../appRedux/actions/Devices";
import {
  exportCSV
} from "../../../appRedux/actions/Account";

var copyInnerContent = [];
var status = true;
class ManageData extends Component {

  constructor(props) {
    super(props);

    const columnsSimids = [
      {
        title: '#',
        dataIndex: 'count',
        align: 'center',
        className: 'row',
        width: 50,
        render: (text, record, index) => ++index,
      },
      {
        title: LABEL,
        dataIndex: 'label',
        align: 'center',
        className: 'row',
        width: 100,
      },
      {
        title: (
          <Input.Search
            name="sim_id"
            key="sim_id"
            id="sim_id"
            className="search_heading"
            autoComplete="new-password"
            placeholder={titleCase(LABEL_DATA_SIM_ID)}
            onKeyUp={this.handleSearch}

          />
        ),
        dataIndex: 'sim_id',
        className: '',
        children: [
          {
            title: LABEL_DATA_SIM_ID,
            dataIndex: 'sim_id',
            key: 'sim_id',
            align: 'center',
            sorter: (a, b) => a.sim_id - b.sim_id,
            sortDirections: ['ascend', 'descend'],
            className: '',
          }
        ]
      },
      {
        title: (
          <Input.Search
            name="created_at"
            key="created_at"
            id="created_at"
            className="search_heading"
            autoComplete="new-password"
            placeholder={titleCase(LABEL_DATA_CREATED_AT)}
            onKeyUp={this.handleSearch}

          />
        ),
        dataIndex: 'created_at',
        className: '',
        children: [
          {
            title: LABEL_DATA_CREATED_AT,
            dataIndex: 'created_at',
            key: 'created_at',
            align: 'center',
            sorter: (a, b) => a.created_at - b.created_at,
            sortDirections: ['ascend', 'descend'],
            className: '',
          }
        ]
      },
    ]
    const columnsChatids = [
      {
        title: '#',
        dataIndex: 'count',
        align: 'center',
        className: 'row',
        width: 50,
        render: (text, record, index) => ++index,
      },
      {
        title: LABEL,
        dataIndex: 'label',
        align: 'center',
        className: 'row',
        width: 100,
      },
      {
        title: (
          <Input.Search
            name="chat_id"
            key="chat_id"
            id="chat_id"
            className="search_heading"
            autoComplete="new-password"
            placeholder={titleCase(LABEL_DATA_CHAT_ID)}
            onKeyUp={this.handleSearch}

          />
        ),
        dataIndex: 'chat_id',
        className: '',
        children: [
          {
            title: LABEL_DATA_CHAT_ID,
            dataIndex: 'chat_id',
            key: 'chat_id',
            align: 'center',
            sorter: (a, b) => a.chat_id - b.chat_id,
            sortDirections: ['ascend', 'descend'],
            className: '',
          }
        ]
      },
      {
        title: (
          <Input.Search
            name="created_at"
            key="created_at"
            id="created_at"
            className="search_heading"
            autoComplete="new-password"
            placeholder={titleCase(LABEL_DATA_CREATED_AT)}
            onKeyUp={this.handleSearch}

          />
        ),
        dataIndex: 'created_at',
        className: '',
        children: [
          {
            title: LABEL_DATA_CREATED_AT,
            dataIndex: 'created_at',
            key: 'created_at',
            align: 'center',
            sorter: (a, b) => a.created_at - b.created_at,
            sortDirections: ['ascend', 'descend'],
            className: '',
          }
        ]
      },
    ]

    const columnsVpn = [
      {
        title: '#',
        dataIndex: 'count',
        align: 'center',
        className: 'row',
        width: 50,
        render: (text, record, index) => ++index,
      },
      {
        title: LABEL,
        dataIndex: 'label',
        align: 'center',
        className: 'row',
        width: 100,
      },
      {
        title: (
          <Input.Search
            name="vpn"
            key="vpn"
            id="vpn"
            className="search_heading"
            autoComplete="new-password"
            placeholder={titleCase(LABEL_DATA_VPN)}
            onKeyUp={this.handleSearch}

          />
        ),
        dataIndex: 'vpn',
        className: '',
        children: [
          {
            title: LABEL_DATA_VPN,
            dataIndex: 'vpn',
            key: 'vpn',
            align: 'center',
            sorter: (a, b) => a.vpn - b.vpn,
            sortDirections: ['ascend', 'descend'],
            className: '',
          }
        ]
      },
      {
        title: (
          <Input.Search
            name="created_at"
            key="created_at"
            id="created_at"
            className="search_heading"
            autoComplete="new-password"
            placeholder={titleCase(LABEL_DATA_CREATED_AT)}
            onKeyUp={this.handleSearch}

          />
        ),
        dataIndex: 'created_at',
        className: '',
        children: [
          {
            title: LABEL_DATA_CREATED_AT,
            dataIndex: 'created_at',
            key: 'created_at',
            align: 'center',
            sorter: (a, b) => a.created_at - b.created_at,
            sortDirections: ['ascend', 'descend'],
            className: '',
          }
        ]
      },
    ]

    const columnsPgpemails = [
      {
        title: '#',
        dataIndex: 'count',
        align: 'center',
        className: 'row',
        width: 50,
        render: (text, record, index) => ++index,
      },
      {
        title: LABEL,
        dataIndex: 'label',
        align: 'center',
        className: 'row',
        width: 100,
      },

      {
        title: (
          <Input.Search
            name="pgp_email"
            key="pgp_email"
            id="pgp_email"
            className="search_heading"
            autoComplete="new-password"
            placeholder={titleCase(LABEL_DATA_PGP_EMAIL)}
            onKeyUp={this.handleSearch}

          />
        ),
        dataIndex: 'pgp_email',
        className: '',
        children: [
          {
            title: LABEL_DATA_PGP_EMAIL,
            dataIndex: 'pgp_email',
            key: 'pgp_email',
            align: 'center',
            sorter: (a, b) => a.pgp_email - b.pgp_email,
            sortDirections: ['ascend', 'descend'],
            className: '',
          }
        ]
      },
      {
        title: (
          <Input.Search
            name="created_at"
            key="created_at"
            id="created_at"
            className="search_heading"
            autoComplete="new-password"
            placeholder={titleCase(LABEL_DATA_CREATED_AT)}
            onKeyUp={this.handleSearch}

          />
        ),
        dataIndex: 'created_at',
        className: '',
        children: [
          {
            title: LABEL_DATA_CREATED_AT,
            dataIndex: 'created_at',
            key: 'created_at',
            align: 'center',
            sorter: (a, b) => a.created_at - b.created_at,
            sortDirections: ['ascend', 'descend'],
            className: '',
          }
        ]
      },

    ];
    // console.log('c_length', columns.length);

    this.state = {
      dealers: [],
      loading: false,
      visible: false,
      dealer_type: '',
      innerContent: [],
      chat_ids: [],
      pgp_emails: [],
      sim_ids: [],
      columns: columnsChatids,
      columnsChatids: columnsChatids,
      columnsSimids: columnsSimids,
      columnsPgpemails: columnsPgpemails,
      columnsVpn: columnsVpn,
      options: this.props.options,
      pagination: 10,
      tabselect: 'all',
      innerTabSelect: '1',
      whiteLables: []
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

    this.props.getSimIDs();
    this.props.getPGPEmails();
    this.props.getChatIDs();
    this.props.getWhiteLabels();
    // this.props.getUsedPGPEmails();
    // this.props.getUsedChatIds();
    // this.props.getUsedSimIds();

    // if (this.state.innerTabSelect == '1') {
    //   this.setState({
    //     innerContent: this.props.chat_ids
    //   })
    // } else if (this.state.innerTabSelect == '2') {
    //   this.setState({
    //     innerContent: this.props.pgp_emails
    //   })
    // } else if (this.state.innerTabSelect == '3') {
    //   this.setState({
    //     innerContent: this.props.sim_ids
    //   })
    // }


  }



  testfunc = () => {
    // alert('testing');
    // console.log('testing');
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

    // console.log(nextProps.whiteLabels);
    if (this.props.chat_ids.length !== nextProps.chat_ids.length || this.props.pgp_emails.length !== nextProps.pgp_emails.length || this.props.sim_ids.length !== nextProps.sim_ids.length) {
      this.setState({
        chat_ids: nextProps.chat_ids,
        pgp_emails: nextProps.pgp_emails,
        sim_ids: nextProps.sim_ids,
      })
    }
    if (nextProps.whiteLabels.length) {
      // console.log(nextProps.whiteLabels);
      this.setState({
        whiteLables: nextProps.whiteLabels
      })
    }

  }

  handleComponentSearch = (value) => {

    // console.log('searched keyword', value);

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

    if (value === 'all') {
      this.setState({
        tabselect: 'all'
      })
    }
    else {
      this.setState({
        tabselect: value
      })

    }


    // switch (value) {

    //   case 'all':
    //     this.setState({
    //       // dealers: this.props.dealers,
    //       // column: this.state.columns,
    //       tabselect: 'all'
    //     })
    //     break;
    //   case '2':
    //     this.setState({
    //       // dealers: this.filterList('LockMesh', this.props.dealers),
    //       // column: this.state.columns,
    //       tabselect: '2'
    //     })

    //     break;
    //   case "3":
    //     this.setState({
    //       // dealers: this.filterList('Titan Locker', this.props.dealers),
    //       // column: this.state.columns,
    //       tabselect: '3'
    //     })
    //     break;
    //   case '4':
    //     this.setState({
    //       // dealers: this.filterList('suspended', this.props.dealers),
    //       // column: this.state.columns,
    //       tabselect: '4'
    //     })
    //     break;


    //   default:
    //     this.setState({
    //       // dealers: this.props.dealers,
    //       // column: this.state.columns,
    //       tabselect: '1'
    //     })
    //     break;
    // }

    // this.handleCheckChange(this.props.selectedOptions)

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
    // console.log(this.state.tabselect);
    // console.log(this.state.columns, window.location.pathname.split("/").pop(), this.state.options)
    const Search = Input.Search;
    return (

      <div>
        {
          this.props.isloading ? <CircularProgress /> :

            <div>

              {/* <AppFilter
                handleFilterOptions={this.handleFilterOptions}
                searchPlaceholder="Search Dealer"
                defaultPagingValue={this.props.DisplayPages}
                // addButtonText={"Add " + this.state.dealer_type}
                // selectedOptions={this.props.selectedOptions}
                options={this.state.options}
                // isAddButton={true}
                // dealer_type={this.state.dealer_type}
                displayOptions={
                  [
                    { label: 'Thing 1', value: 1 },
                    { label: 'Thing 2', value: 2 },
                  ]
                }
                handleCheckChange={this.handleCheckChange}
                handlePagination={this.handlePagination}
                handleComponentSearch={this.handleComponentSearch}
              // testfunc={this.testfunc}
              // toLink={"/create-dealer/" + this.state.dealer_type}
              /> */}

              <Card >
                <Row gutter={16} className="filter_top">
                  <Col className="col-md-3 col-sm-6 col-xs-12">
                    <div className="gutter-box">
                      <h1 style={{ lineHeight: "35px", marginBottom: 0 }}>Manage Data</h1>
                    </div>
                  </Col>
                  <Col className="col-md-7 col-sm-6 col-xs-12">
                    <div className="gutter-box">
                      <Search
                        placeholder="Search..."
                        onChange={e => this.handleComponentSearch(e.target.value)}
                        style={{ width: '100%' }}
                      />
                    </div>
                  </Col>
                  {/* <Col className="col-md-2 col-sm-6 col-xs-12">
                            <div className="gutter-box">
                                <Select
                                    value="Import"
                                    //  defaultValue={this.state.DisplayPages}
                                    style={{ width: '100%' }}
                                    // onSelect={value => this.setState({DisplayPages:value})}
                                    // onChange={value => this.handlePagination(value)}
                                >
                                    <Select.Option value="10" >10</Select.Option>
                                    <Select.Option value="20">20</Select.Option>
                                    <Select.Option value="30">30</Select.Option>
                                    <Select.Option value="50">50</Select.Option>
                                    <Select.Option value="100">100</Select.Option>
                                </Select>
                            </div>
                        </Col> */}

                  <Col className="col-md-2 col-sm-6 col-xs-12">
                    <div className="gutter-box">
                      <Select
                        value="Export"
                        //  defaultValue={this.state.DisplayPages}
                        style={{ width: '100%' }}
                      // onSelect={value => this.setState({DisplayPages:value})}
                      // onChange={value => this.handlePagination(value)}
                      >
                        <Select.Option value="10"
                          onClick={() => {
                            this.props.exportCSV('sim_ids');
                          }}
                        >Export SIM IDs</Select.Option>
                        <Select.Option value="20"
                          onClick={() => {
                            this.props.exportCSV('chat_ids');
                          }}
                        >Export CHAT IDs</Select.Option>
                        <Select.Option value="30"
                          onClick={() => {
                            this.props.exportCSV('pgp_emails');
                          }}
                        >Export PGP Emails</Select.Option>
                        <Select.Option value="50"
                        // onClick={() => {
                        //     this.props.exportCSV('vpn');
                        // }}
                        >Export VPNs</Select.Option>
                      </Select>
                    </div>
                  </Col>


                </Row>
              </Card>

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

              />
              {/* <Card>
                        <Table size="middle"
                            className="gx-table-responsive devices table"
                            bordered
                            scroll={{ x: 500 }}
                            columns={this.state.columns}
                            rowKey='row_key'
                            align='center' dataSource={this.renderList()}
                            pagination={{ pageSize: this.state.pagination , size: "midddle"}}
                        />

                    </Card> */}
              {/* <EditDealer ref='editDealer' getDealerList={this.props.getDealerList} /> */}

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
  // console.log("mapStateToProps");
  // console.log(state.dealers.isloading);
  // console.log('state.dealer', state.dealers);
  // console.log("state, ", state);
  return {
    chat_ids: state.account.chat_ids,
    pgp_emails: state.account.pgp_emails,
    sim_ids: state.account.sim_ids,
    whiteLabels: state.sidebarMenu.whiteLabels

    // isloading: state.dealers.isloading,
    // dealers: state.dealers.dealers,
    // options: state.dealers.options,
    // suspended: state.dealers.suspended,
    // selectedOptions: state.dealers.selectedOptions,
    // DisplayPages: state.dealers.DisplayPages,
    // action: state.action
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getSimIDs: getSimIDs,
    getChatIDs: getChatIDs,
    getPGPEmails: getPGPEmails,
    getWhiteLabels: getWhiteLabels,
    // importCSV: importCSV,
    exportCSV: exportCSV,
    // getUsedPGPEmails: getUsedPGPEmails,
    // getUsedChatIds: getUsedChatIds,
    // getUsedSimIds: getUsedSimIds,
    // releaseCSV: releaseCSV,
    // insertNewData: insertNewData
  }, dispatch);
}

// function showConfirm(id, action, btn_title) {
//     confirm({
//         title: 'Do you want to ' + btn_title + ' this ' + window.location.pathname.split("/").pop() + ' ?',
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


export default connect(mapStateToProps, mapDispatchToProps)(ManageData)