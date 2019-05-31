import {
    GET_WHITE_LABELS, INVALID_TOKEN
} from "../../constants/ActionTypes"

import RestService from '../services/RestServices';

export const getWhiteLabels = () => {
    return (dispatch) => {
        RestService.getWhiteLabels().then((response) => {
            if(RestService.checkAuth(response.data)){
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