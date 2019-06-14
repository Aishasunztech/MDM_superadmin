
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Input, Modal, Select, } from "antd";
import { getDealerList, suspendDealer, deleteDealer, activateDealer, undoDealer, updatePassword, editDealer } from "../../../appRedux/actions/Dealers";
import { getDropdown, postDropdown, postPagination, getPagination } from '../../../appRedux/actions/Common';
// import {getDevicesList} from '../../appRedux/actions/Devices';
import AppFilter from '../../../components/AppFilter';
import EditDealer from './components/editDealer';
import CircularProgress from "components/CircularProgress/index";
import DealerList from "./components/dealerList";
import styles from './dealers.css'

import { componentSearch, getDealerStatus, titleCase } from '../../utils/commonUtils';

import {
  LABEL,
  LABEL_DATA_CHAT_ID,
  LABEL_DATA_SIM_ID,
  LABEL_DATA_PGP_EMAIL,
  LABEL_DATA_CREATED_AT,
} from '../../../constants/LabelConstants';

import {
  getSimIDs,
  getChatIDs,
  getPGPEmails,
} from "../../../appRedux/actions/Devices";

var copyInnerContent = [];
var status = true;
class ManageData extends Component {

  constructor(props) {
    super(props);

    const columns = [
      {
        title: '#',
        dataIndex: 'count',
        align: 'center',
        className: 'row',
        width: 50,
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
        className: 'hide',
        children: [
          {
            title: LABEL_DATA_PGP_EMAIL,
            dataIndex: 'pgp_email',
            key: 'pgp_email',
            align: 'center',
            sorter: (a, b) => a.pgp_email - b.pgp_email,
            sortDirections: ['ascend', 'descend'],
            className: 'hide',
          }
        ]
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
        className: 'hide',
        children: [
          {
            title: LABEL_DATA_SIM_ID,
            dataIndex: 'sim_id',
            key: 'sim_id',
            align: 'center',
            sorter: (a, b) => a.sim_id - b.sim_id,
            sortDirections: ['ascend', 'descend'],
            className: 'hide',
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
      columns: columns,
      options: this.props.options,
      pagination: 10,
      tabselect: '1',
      innerTabSelect: '1',
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

    if (this.props.chat_ids.length !== nextProps.chat_ids.length || this.props.pgp_emails.length !== nextProps.pgp_emails.length || this.props.sim_ids.length !== nextProps.sim_ids.length) {
      this.setState({
        chat_ids: nextProps.chat_ids,
        pgp_emails: nextProps.pgp_emails,
        sim_ids: nextProps.sim_ids,

      })
    }

  }

  handleComponentSearch = (value) => {

    // console.log('searched keyword', value);

    try {
      if (value.length) {
        if (status) {
          copyInnerContent = this.state.dealers;
          status = false;
        }
        let founddealers = componentSearch(copyInnerContent, value);
        console.log("found dealers", founddealers);
        if (founddealers.length) {
          this.setState({
            dealers: founddealers,
          })
        } else {
          this.setState({
            dealers: []
          })
        }
      } else {
        status = true;
        this.setState({
          dealers: copyInnerContent,
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

    switch (value) {
      case '1':
        this.setState({
          dealers: this.props.dealers,
          column: this.state.columns,
          tabselect: '1'
        })
        break;
      case '2':
        this.setState({
          // dealers: this.filterList('LockMesh', this.props.dealers),
          column: this.state.columns,
          tabselect: '2'
        })

        break;
      case "3":
        this.setState({
          // dealers: this.filterList('Titan Locker', this.props.dealers),
          column: this.state.columns,
          tabselect: '3'
        })
        break;
      case '4':
        this.setState({
          // dealers: this.filterList('suspended', this.props.dealers),
          column: this.state.columns,
          tabselect: '4'
        })
        break;


      default:
        this.setState({
          dealers: this.props.dealers,
          column: this.state.columns,
          tabselect: '1'
        })
        break;
    }

    // this.handleCheckChange(this.props.selectedOptions)

  }

  handleChangeInnerTab = (value) => {
    // alert('value');
    // alert(value);

    let index_pgp_email = this.state.columns.findIndex(k => k.dataIndex == 'pgp_email');
    let index_sim_id = this.state.columns.findIndex(k => k.dataIndex == 'sim_id');
    let index_chat_id = this.state.columns.findIndex(k => k.dataIndex == 'chat_id');
    let index_created_at = this.state.columns.findIndex(k => k.dataIndex == 'created_at');
    let index_label = this.state.columns.findIndex(k => k.dataIndex == 'label');
    let index_count = this.state.columns.findIndex(k => k.dataIndex == 'count');

    if (value == '2') {
      this.state.columns[index_pgp_email]['className'] = '';
      this.state.columns[index_pgp_email]['children'][0].className = '';
      this.state.columns[index_created_at]['className'] = '';
      this.state.columns[index_created_at]['children'][0].className = '';
      this.state.columns[index_label]['className'] = '';

      this.state.columns[index_sim_id]['className'] = 'hide';
      this.state.columns[index_sim_id]['children'][0].className = 'hide';
      this.state.columns[index_chat_id]['className'] = 'hide';
      this.state.columns[index_chat_id]['children'][0].className = 'hide';
    }
    else if (value == '3') {
      this.state.columns[index_sim_id]['className'] = '';
      this.state.columns[index_sim_id]['children'][0].className = '';
      this.state.columns[index_created_at]['className'] = '';
      this.state.columns[index_created_at]['children'][0].className = '';
      this.state.columns[index_label]['className'] = '';

      this.state.columns[index_chat_id]['className'] = 'hide';
      this.state.columns[index_chat_id]['children'][0].className = 'hide';
      this.state.columns[index_pgp_email]['className'] = 'hide';
      this.state.columns[index_pgp_email]['children'][0].className = 'hide';
    }
    else if (value == '1') {
      this.state.columns[index_chat_id]['className'] = '';
      this.state.columns[index_chat_id]['children'][0].className = '';
      this.state.columns[index_created_at]['className'] = '';
      this.state.columns[index_created_at]['children'][0].className = '';
      this.state.columns[index_label]['className'] = '';

      this.state.columns[index_sim_id]['className'] = 'hide';
      this.state.columns[index_sim_id]['children'][0].className = 'hide';
      this.state.columns[index_pgp_email]['className'] = 'hide';
      this.state.columns[index_pgp_email]['children'][0].className = 'hide';
    } 
    else {
      this.state.columns[index_chat_id]['className'] = 'hide';
      this.state.columns[index_chat_id]['children'][0].className = 'hide';

      this.state.columns[index_sim_id]['className'] = 'hide';
      this.state.columns[index_sim_id]['children'][0].className = 'hide';
      this.state.columns[index_pgp_email]['className'] = 'hide';
      this.state.columns[index_pgp_email]['children'][0].className = 'hide';
      this.state.columns[index_created_at]['className'] = 'hide';
      this.state.columns[index_created_at]['children'][0].className = 'hide';
      this.state.columns[index_label]['className'] = 'hide';
    }

    switch (value) {
      case '1':
        this.setState({
          innerContent: this.props.chat_ids,
          column: this.state.columns,
          innerTabSelect: '1'
        })
        status= true;
        break;
      case '2':
        this.setState({
          innerContent: this.props.pgp_emails,
          column: this.state.columns,
          innerTabSelect: '2'
        })
        status= true;

        break;
      case "3":
        this.setState({
          innerContent: this.props.sim_ids,
          column: this.state.columns,
          innerTabSelect: '3'
        })
        status= true;
        break;
      case '4':
        this.setState({
          // dealers: this.filterList('suspended', this.props.dealers),
          innerContent: [],
          column: [], 
          innerTabSelect: '4'
        })
        status= true;
        break;


      default:
        this.setState({
          innerContent: this.props.chat_ids,
          column: this.state.columns,
          innerTabSelect: '1'
        })
        status= true;
        break;
    }

    // this.handleCheckChange(this.props.selectedOptions)

  }


  render() {

    // console.log(this.state.columns, window.location.pathname.split("/").pop(), this.state.options)
    return (

      <div>
        {
          this.props.isloading ? <CircularProgress /> :

            <div>

              <AppFilter
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
              // handleComponentSearch={this.handleComponentSearch}
              // testfunc={this.testfunc}
              // toLink={"/create-dealer/" + this.state.dealer_type}
              />
              <DealerList
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
    console.log('hi search val is: ', e.target.value);
    console.log('hi inner content val is: ', this.state.innerContent);

    let demoItems = [];
    if (status) {
      copyInnerContent = this.state.innerContent;
      status = false;
    }
    console.log("devices", copyInnerContent);

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
  console.log("account.pgp_emails, ", state.account.pgp_emails);
  return {
    chat_ids: state.account.chat_ids,
    pgp_emails: state.account.pgp_emails,
    sim_ids: state.account.sim_ids,
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
    // importCSV: importCSV,
    // exportCSV: exportCSV,
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