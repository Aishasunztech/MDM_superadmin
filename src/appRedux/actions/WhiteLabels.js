import {
    INVALID_TOKEN,
    GET_WHITE_LABELS,
    GET_WHITE_LABEL_INFO ,
    EDIT_WHITE_LABEL_INFO,
    WHITE_LABEL_BACKUPS,
    GET_FILE,
    SAVE_ID_PRICES,
    SAVE_PACKAGE
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

export const getWhitelabelBackups = (id) => {
    // console.log('id',id)
    return (dispatch) => {
        RestService.whitelabelBackups(id).then((response) => {
            if(RestService.checkAuth(response.data)){
                dispatch({
                    type: WHITE_LABEL_BACKUPS,
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




export const setPackage = (data) => {
    return (dispatch) => {
        RestService.setPackage(data).then((response) => {
            if(RestService.checkAuth(response.data)){
                dispatch({
                    type: SAVE_PACKAGE,
                    response: response.data
                })
            } else {
                dispatch({
                    type: INVALID_TOKEN
                })                
            }
        });

    }
}


export const saveIDPrices = (data) => {
    return (dispatch) => {
        RestService.saveIDPrices(data).then((response) => {
            if(RestService.checkAuth(response.data)){
                dispatch({
                    type: SAVE_ID_PRICES,
                    response: response.data
                })
            } else {
                dispatch({
                    type: INVALID_TOKEN
                })                
            }
        });

    }
}


export const getFile = (data) => {
    return (dispatch) => {
        RestService.getFile(data)
        // .then((response) => {

        //     if(RestService.checkAuth(response.data)){
                // dispatch({
                //     type: GET_FILE
                // })
        //     } else {
        //         dispatch({
        //             type: INVALID_TOKEN
        //         })                
        //     }
        // });
    }
}