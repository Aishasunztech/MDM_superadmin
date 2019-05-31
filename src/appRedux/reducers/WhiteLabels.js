import {
    GET_WHITE_LABEL_INFO
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
            // console.log(action.payload);
            return {
                ...state,
                whiteLabel: action.payload
            }
        }
        default:
            return state;

    }
}