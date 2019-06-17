import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import Settings from "./Settings";
import Auth from "./Auth";
import Account from "./Account"
import Socket from "./Socket";
import sidebarMenu from "./SidebarMenu";
import whiteLabels from './WhiteLabels';
import Apk_List from "./Apk";

const reducers = combineReducers({
  routing: routerReducer,
  settings: Settings,
  auth: Auth,
  account: Account,
  Socket: Socket,
  sidebarMenu: sidebarMenu,
  whiteLabels: whiteLabels,
  apk_list: Apk_List,
});

export default reducers;
