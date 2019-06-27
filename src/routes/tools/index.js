import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Card, Button, Row, Col, Table } from "antd";

import { getWhiteLabels, restartWhiteLabel } from "../../appRedux/actions";

let data = [];
class Tools extends Component {

    constructor() {
        super();
        const columns = [
            {
                // title: '#',
                dataIndex: 'count',
                align: 'center',
                className: 'row',
                width: 50,
            },
            {
                // title: 'Label',
                dataIndex: 'label',
                align: 'center',
                className: 'row',
                width: 50,
            },
            {
                // title: 'Reboot',
                dataIndex: 'reboot',
                align: 'center',
                className: 'row',
                width: 50,
            },

        ];

        this.state = {
            columns: columns,
            whiteLables: []
        }
    }

    renderList(list) {
        data = []
        list.map((item, index) => {
            data.push({
                row_key: `${index}`,
                count: ++index,
                label: item.name ? item.name : 'N/A',
                reboot: (
                    <Fragment>
                        <Button
                            style={{ backgroundColor: "orange", color: 'white', borderRadius: '15px' }}
                            onClick = {(e)=>{
                                this.props.restartWhiteLabel(item.id);
                            }}
                        >Reboot Server</Button>
                    </Fragment>
                ),
            })
        });
        return (data);

    }

    componentDidMount() {
        this.props.getWhiteLabels();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.whiteLabels.length) {
            this.setState({
                whiteLables: nextProps.whiteLabels
            })
        }
    }

    render() {
        return (
            <div>

                <Card >
                    <Row gutter={16} className="filter_top">
                        <Col className="col-md-3 col-sm-6 col-xs-12">
                            <div className="gutter-box">
                                <h1 style={{ lineHeight: "35px", marginBottom: 0 }}>SYSTEM ADMIN TOOLS</h1>
                            </div>
                        </Col>
                    </Row>
                </Card>
                <Card>
                    <Table size="middle"
                        style={{ width: '40%' }}
                        // className="gx-table-responsive devices table"
                        bordered
                        columns={this.state.columns}
                        rowKey='row_key'
                        align='center'
                        dataSource={this.renderList(this.state.whiteLables)}
                        pagination={false}
                    />
                </Card>
            </div>
        );
    }
}

var mapStateToProps = (state) => {
    return {
        whiteLabels: state.sidebarMenu.whiteLabels
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getWhiteLabels: getWhiteLabels,
        restartWhiteLabel: restartWhiteLabel
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Tools);