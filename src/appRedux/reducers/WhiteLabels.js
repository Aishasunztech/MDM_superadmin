import {
    GET_WHITE_LABEL_INFO,
    EDIT_WHITE_LABEL_INFO
} from "../../constants/ActionTypes";

import { message, Modal } from 'antd';

const success = Modal.success
const error = Modal.error


const initialState = {
    whiteLabel: {}
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