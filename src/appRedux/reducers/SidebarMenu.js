import {
    GET_WHITE_LABELS
} from "../../constants/ActionTypes";

const initialSidebar = {
    whiteLabels: []
};

export default (state = initialSidebar, action) => {

    switch (action.type) {
        case GET_WHITE_LABELS: {

            return {
                ...state,
                whiteLabels: action.payload
            }
        }

        default:
            return state;
    }
}