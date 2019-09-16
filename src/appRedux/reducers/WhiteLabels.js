import {
    GET_WHITE_LABEL_INFO,
    EDIT_WHITE_LABEL_INFO,
    WHITE_LABEL_BACKUPS,
    GET_FILE,
    SAVE_ID_PRICES,
    SAVE_PACKAGE,
    GET_PRICES,
    SET_PRICE,
    RESET_PRICE,
    GET_PACKAGES,
    GET_ALL_WHITE_LABELS,
    SAVE_BACKUP,
    START_BACKUP_LOADING
} from "../../constants/ActionTypes";

import { message, Modal } from 'antd';

const success = Modal.success
const error = Modal.error


const initialState = {
    whiteLabel: {},
    whitelabelBackups: [],
    whiteLabels: [],
    prices: {
        sim_id: {},
        chat_id: {},
        pgp_email: {},
        vpn: {}
    },
    isPriceChanged: false,
    pricesCopy: {
        sim_id: {},
        chat_id: {},
        pgp_email: {},
        vpn: {}
    },
    packages: [],
    packagesCopy: [],
    backupLoading: false,
};

export default (state = initialState, action) => {

    switch (action.type) {

        case GET_ALL_WHITE_LABELS: {
            return {
                ...state,
                whiteLabels: action.payload
            }
        }
        case GET_WHITE_LABEL_INFO: {
            // console.log('get labels',action.payload);
            return {
                ...state,
                whiteLabel: action.payload
            }
        }

        case GET_FILE: {
            if (action.payload.status && !action.payload.status) {
                Modal.error({
                    title: action.payload.msg
                })
            }
            return {
                ...state,
            }
        }

        case WHITE_LABEL_BACKUPS: {
            // console.log('reducer is called', action.payload.data)
            return {
                ...state,
                whitelabelBackups: action.payload.data
            }
        }
        case GET_PRICES: {
            // console.log(action.response, 'response of get prices')

            return {
                ...state,
                prices: action.response.data,
                pricesCopy: JSON.parse(JSON.stringify(action.response.data))

            }
        }

        case GET_PACKAGES: {
            // console.log(action.response, 'response of get prices')

            return {
                ...state,
                packages: action.response.data,
                packagesCopy: JSON.parse(JSON.stringify(action.response.data))

            }
        }

        case SET_PRICE: {
            let copyPrices = state.prices;
            let price_for = action.payload.price_for;
            let field = action.payload.field;
            if (price_for && price_for !== '') {
                copyPrices[price_for][field] = action.payload.value;
            }
            return {
                ...state,
                prices: copyPrices,
                isPriceChanged: true
            }

        }

        case SAVE_ID_PRICES: {
            // console.log(action.response, 'response form save id prices')
            if (action.response.status) {
                success({
                    title: action.response.msg
                })
                state.pricesCopy = JSON.parse(JSON.stringify(state.prices))
            } else {
                error({
                    title: action.response.msg
                })
                state.prices = JSON.parse(JSON.stringify(state.pricesCopy))
            }
            return {
                ...state,
                isPriceChanged: false
            }
        }

        case RESET_PRICE: {
            // console.log('reset prices')
            return {
                ...state,
                prices: JSON.parse(JSON.stringify(state.pricesCopy)),
                isPriceChanged: false
            }
        }

        case SAVE_PACKAGE: {
            console.log(action.response, 'response form save id prices')
            if (action.response.status) {
                success({
                    title: action.response.msg
                })
                if (action.response.data.length) {
                    state.packages.push(action.response.data[0])
                }
            } else {
                error({
                    title: action.response.msg
                })
            }
            return {
                ...state,
                packages: [...state.packages]
            }
        }


        case EDIT_WHITE_LABEL_INFO: {
            if (action.payload.status) {
                success({
                    title: action.payload.msg,
                });
            } else {
                error({
                    title: action.payload.msg,
                });
            }

            return {
                ...state,
            }
        }


        case SAVE_BACKUP: {
            let backups = state.whitelabelBackups
            if (action.response.status) {
                success({
                    title: action.response.msg,
                });
                backups.push(action.response.data)
            } else {
                error({
                    title: action.response.msg,
                });
            }
            return {
                ...state,
                whitelabelBackups: [...backups],
                backupLoading: false

            }
        }
        case START_BACKUP_LOADING: {
            return {
                ...state,
                backupLoading: true
            }
        }



        default:
            return state;

    }
}