import {
    GET_WHITE_LABEL_INFO,
    EDIT_WHITE_LABEL_INFO,
    WHITE_LABEL_BACKUPS,
    GET_FILE,
    SAVE_ID_PRICES
} from "../../constants/ActionTypes";

import { message, Modal } from 'antd';

const success = Modal.success
const error = Modal.error


const initialState = {
    whiteLabel: {},
    whitelabelBackups: [],
};

export default (state = initialState, action) => {

    switch (action.type) {

        case GET_WHITE_LABEL_INFO: {
            console.log('get labels',action.payload);
            return {
                ...state,
                whiteLabel: action.payload
            }
        }

        case GET_FILE: {
            if(action.payload.status && !action.payload.status){
                Modal.error({
                    title: action.payload.msg
                })
            }
            return {
                ...state,
            }
        }

        case WHITE_LABEL_BACKUPS: {
            console.log('reducer is called', action.payload.data)
            return {
                ...state,
                whitelabelBackups: action.payload.data
            }
        }

        case SAVE_ID_PRICES: {
            console.log(action.response, 'response form save id prices')
            if(action.response.status){
                success({
                    title: action.response.msg
                })
            }else{
                error({
                    title: action.response.msg
                })
            }
            return{
                ...state
            }
        }

        case EDIT_WHITE_LABEL_INFO: {
            console.log('reducer response', action.payload)
            if(action.payload.status){
                success({
					title: action.payload.msg,
				});
            }else{
                error({
					title: action.payload.msg,
				});
            }
        }
        default:
            return state;

    }
}