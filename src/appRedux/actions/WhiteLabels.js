import {
    INVALID_TOKEN,
    GET_WHITE_LABELS,
    GET_WHITE_LABEL_INFO ,
    EDIT_WHITE_LABEL_INFO
} from "../../constants/ActionTypes"

import RestService from '../services/RestServices';



export const getWhiteLabelInfo = (id) => {
    // console.log('id',id)
    return (dispatch) => {
        RestService.getWhiteLabelInfo(id).then((response) => {
            if(RestService.checkAuth(response.data)){
                dispatch({
                    type: GET_WHITE_LABEL_INFO,
                    payload: response.data.whiteLabel
                })
            } else {
                dispatch({
                    type: INVALID_TOKEN
                })                
            }
        });

    }
}

export const editWhiteLabelInfo = (data) => {
    return (dispatch) => {
        RestService.editWhiteLabelInfo(data).then((response) => {
            if(RestService.checkAuth(response.data)){
                dispatch({
                    type: EDIT_WHITE_LABEL_INFO,
                    payload: response.data
                })
            } else {
                dispatch({
                    type: INVALID_TOKEN
                })                
            }
        });

    }
}