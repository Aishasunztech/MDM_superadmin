import {
    GET_WHITE_LABELS, INVALID_TOKEN, NEW_REQUEST_LIST, REJECT_REQUEST, ACCEPT_REQUEST
} from "../../constants/ActionTypes"

import RestService from '../services/RestServices';

export const getWhiteLabels = () => {
    return (dispatch) => {
        RestService.getWhiteLabels().then((response) => {
            if (RestService.checkAuth(response.data)) {
                dispatch({
                    type: GET_WHITE_LABELS,
                    payload: response.data.whiteLabels
                })

            } else {
                dispatch({
                    type: INVALID_TOKEN
                })
            }
        });

    }
}
export function getNewCashRequests() {

    return (dispatch) => {

        RestService.getNewCashRequests().then((response) => {
            //  console.log("data form server");
            //  console.log(response.data);
            if (RestService.checkAuth(response.data)) {
                if (response.data.status) {
                    dispatch({
                        type: NEW_REQUEST_LIST,
                        payload: response.data.data,
                        response: response.data,

                    });
                }

            } else {
                dispatch({
                    type: INVALID_TOKEN
                });
            }
        })

    };
}
export function rejectRequest(request) {
    return (dispatch) => {
        // console.log(device)
        RestService.rejectRequest(request).then((response) => {
            if (RestService.checkAuth(response.data)) {
                dispatch({
                    type: REJECT_REQUEST,
                    response: response.data,
                    request: request,
                })
            } else {
                dispatch({
                    type: INVALID_TOKEN
                })
            }
        });
    }
}
export function acceptRequest(request) {
    return (dispatch) => {
        // console.log(device)
        RestService.acceptRequest(request).then((response) => {
            if (RestService.checkAuth(response.data)) {
                console.log("REsponse", response.data);
                dispatch({
                    type: ACCEPT_REQUEST,
                    response: response.data,
                    request: request,
                })
            } else {
                dispatch({
                    type: INVALID_TOKEN
                })
            }
        });
    }
}