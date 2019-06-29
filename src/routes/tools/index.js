import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Card, Button, Row, Col, Table } from "antd";
import WhitelabelList from "./components/WhitelabelList";

import { getWhiteLabels, restartWhiteLabel, checkPass, resetConfirmReboot } from "../../appRedux/actions";

class Tools extends Component {

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
                    <WhitelabelList
                        whiteLabels={this.props.whiteLabels}
                        checkPass={this.props.checkPass}
                        confirmRebootModal={this.props.confirmRebootModal}
                        restartWhiteLabel={this.props.restartWhiteLabel}
                    />

                </Card>
            </div>
        );
    }
}

var mapStateToProps = ({ sidebarMenu, auth }) => {
    console.log(auth);
    return {
        whiteLabels: sidebarMenu.whiteLabels,
        confirmRebootModal: auth.confirmRebootModal,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getWhiteLabels: getWhiteLabels,
        restartWhiteLabel: restartWhiteLabel,
        checkPass: checkPass,
        resetConfirmReboot: resetConfirmReboot,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Tools);