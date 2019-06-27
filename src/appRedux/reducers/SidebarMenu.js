import {
    GET_WHITE_LABELS,
    NEW_REQUEST_LIST,
    REJECT_REQUEST,
    ACCEPT_REQUEST
} from "../../constants/ActionTypes";
import { Modal } from 'antd';

const success = Modal.success
const error = Modal.error

const initialSidebar = {
    whiteLabels: [],
    newRequests: []
};

export default (state = initialSidebar, action) => {

    switch (action.type) {
        case GET_WHITE_LABELS: {

            return {
                ...state,
                whiteLabels: action.payload
            }
        }

        case NEW_REQUEST_LIST:
            // console.log('reducer new device', action.payload);
            return {
                ...state,
                newRequests: action.payload,
            }
        case REJECT_REQUEST: {
            var newRequests = state.newRequests;
            var request_id = action.request.id;
            var filteredRequests = newRequests;

            if (action.response.status) {
                success({
                    title: action.response.msg,
                });
                filteredRequests = newRequests.filter(request => request.id !== request_id);
            } else {
                error({
                    title: action.response.msg,
                });
            }



            return {
                ...state,
                newRequests: filteredRequests,
            }
        }
        case ACCEPT_REQUEST: {
            var newRequests = state.newRequests;
            var request_id = action.request.id;
            var filteredRequests = newRequests

            if (action.response.status) {
                success({
                    title: action.response.msg,
                });
                filteredRequests = newRequests.filter(request => request.id !== request_id);
            } else {
                error({
                    title: action.response.msg,
                });
            }



            return {
                ...state,
                newRequests: filteredRequests,
            }
        }

        default:
            return state;
    }
}