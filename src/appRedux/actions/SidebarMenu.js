import {
    GET_WHITE_LABELS
} from "../../constants/ActionTypes"

import RestService from '../services/RestServices';

export const getWhiteLabels = () => {
    return (dispatch) => {
        let whitelabels = RestService.getWhiteLabels();
        dispatch({
            type: GET_WHITE_LABELS,
            payload: whitelabels
        })

    }
}