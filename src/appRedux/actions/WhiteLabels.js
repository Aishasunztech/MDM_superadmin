import {
    INVALID_TOKEN,
    GET_WHITE_LABEL_INFO,
    EDIT_WHITE_LABEL_INFO,
    WHITE_LABEL_BACKUPS,
    SAVE_ID_PRICES,
    SAVE_PACKAGE,
    GET_PRICES,
    SET_PRICE,
    RESET_PRICE,
    GET_PACKAGES,
    GET_ALL_WHITE_LABELS
} from "../../constants/ActionTypes"

import RestService from '../services/RestServices';


export const getAllWhiteLabels = () => {
    return (dispatch) => {
        RestService.getAllWhiteLabels().then(response => {

            if (RestService.checkAuth(response.data)) {
                dispatch({
                    type: GET_ALL_WHITE_LABELS,
                    payload: response.data.whiteLabels
                })
            } else {
                dispatch({
                    type: INVALID_TOKEN
                })
            }

        })
    }
}

export const getWhiteLabelInfo = (id) => {
    // console.log('id',id)
    return (dispatch) => {
        RestService.getWhiteLabelInfo(id).then((response) => {
            if (RestService.checkAuth(response.data)) {
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

export const setPrice = (field, value, price_for = '') => {
    return (dispatch) => {
        dispatch({
            type: SET_PRICE,
            payload: {
                field: field,
                value: value,
                price_for: price_for
            }
        })
    }
}

export const resetPrice = () => {
    return (dispatch) => {
        dispatch({
            type: RESET_PRICE,

        })
    }
}



export const getWhitelabelBackups = (id) => {
    // console.log('id',id)
    return (dispatch) => {
        RestService.whitelabelBackups(id).then((response) => {
            if (RestService.checkAuth(response.data)) {
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

export const getPrices = (data) => {
    return (dispatch) => {
        RestService.getPrices(data).then((response) => {
            if (RestService.checkAuth(response.data)) {
                dispatch({
                    type: GET_PRICES,
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

export const getPackages = (data) => {
    return (dispatch) => {
        RestService.getPackages(data).then((response) => {
            if (RestService.checkAuth(response.data)) {
                dispatch({
                    type: GET_PACKAGES,
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

export const editWhiteLabelInfo = (data) => {
    return (dispatch) => {
        RestService.editWhiteLabelInfo(data).then((response) => {
            if (RestService.checkAuth(response.data)) {
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
            if (RestService.checkAuth(response.data)) {
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
            if (RestService.checkAuth(response.data)) {
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