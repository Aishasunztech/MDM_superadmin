import React from "react";
import { Route, Switch } from "react-router-dom";
import Account from "./account/index";
import ManageData from "./account/ManageData";
import Modal from "./whitelabels/components/LoadIDsModal";
import WhiteLabels from "./whitelabels/index";
import Device from "./devices/index";

import FourOFour from "./404/";

const AppRoutes = ({ match, whiteLabels }) => {

  return (
    <div className="gx-main-content-wrapper">
      <Switch>
        <Route
          exact
          path={`${match.url}labels`}
        // component={Labels}
        />
        {
          whiteLabels.map((whiteLabel, index) => {
            return (
              <Route
                exact
                path={`${whiteLabel.route_uri}`}
                key={index}
                // id={whiteLabel.id} 
                render={
                  (routeProps) => (
                    <WhiteLabels
                      {...routeProps}
                      id={whiteLabel.id}
                    />
                  )
                }
              />);
          })
        }
        <Route
          exact
          path={`${match.url}account`}
          component={Account}
          // component={ManageData}
        />
        <Route
          exact
          path={`${match.url}account/modal`}
          component={Modal}
        />
        <Route
          exact
          path={`${match.url}account/managedata`}
          component={ManageData}
        />
        <Route
          exact
          path={`${match.url}devices`}
          component={Device}
        />
        <Route
          path="*"
          component={FourOFour}
        />
      </Switch>
    </div>
  )
}

  ;

export default AppRoutes;
