import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import Settings from "./Settings";
import Auth from "./Auth";
import Account from "./Account"
import Socket from "./Socket";
import sidebarMenu from "./SidebarMenu";


const reducers = combineReducers({
  routing: routerReducer,
  settings: Settings,
  auth: Auth,
  account: Account,
  socket: Socket,
  sidebarMenu: sidebarMenu
});

export default reducers;
