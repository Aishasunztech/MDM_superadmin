import React from "react";
import { Route, Switch } from "react-router-dom";
import Account from "./account/index";


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
          whiteLabels.map((whiteLabel) => {
            return (<Route exact path={`${whiteLabel.route_uri}`} render={() => {
              return (<h1>{whiteLabel.name}</h1>)
            }} />);
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
