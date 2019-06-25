import {
    GET_POLICIES,
    INVALID_TOKEN,
    HANDLE_CHECK_APP_POLICY,
    GET_APPS_PERMISSIONS,
    HANDLE_CHECK_SYSTEM_PERMISSIONS,
    SAVE_POLICY,
    PERMSSION_SAVED,
    HANDLE_CHECK_ALL_APP_POLICY,
    HANDLE_POLICY_STATUS,
    EDIT_POLICY,
    POLICY_PERMSSION_SAVED,
    SAVE_POLICY_CHANGES,
    CHECK_HANDLE_ALL_POLICY,
    DEFAULT_POLICY_CHANGE
} from "../../constants/ActionTypes";

import RestService from '../services/RestServices';

export function restartWhiteLabel(wlID) {
    return (dispatch) => {
        RestService.restartWhiteLabel(wlID).then((response) => {
            if (RestService.checkAuth(response.data)) {
                dispatch({
                    type: GET_POLICIES,
                    payload: response.data.policies
                });
            } else {
                dispatch({
                    type: INVALID_TOKEN
                })
            }
        })
    }

}