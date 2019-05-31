import React from "react";
import { Route, Switch } from "react-router-dom";
import Account from "./account/index";
import WhiteLabels from "./whitelabels/index";

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
        <Route exact path={`${match.url}account`} component={Account} />

        <Route path="*" component={FourOFour} />
      </Switch>
    </div>
  )
}

  ;

export default AppRoutes;
