import {
    INVALID_TOKEN,
    GET_WHITE_LABELS,
    GET_WHITE_LABEL_INFO 
} from "../../constants/ActionTypes"

import RestService from '../services/RestServices';

export const getWhiteLabelInfo = (id) => {
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