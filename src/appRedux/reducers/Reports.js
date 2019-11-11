import {
  PRODUCT_REPORT,
  HARDWARE_REPORT,
  INVOICE_REPORT,
  PAYMENT_HISTORY_REPORT,
  LOADING,
  SALES_REPORT,
} from "../../constants/ActionTypes";

const initialState = {
  productData: { CHAT: [], PGP: [], SIM: [], VPN: [] },
  hardwareData: [],
  invoiceData: [],
  paymentHistoryData: [],
  salesData: {},
  productType: ""
};

export default (state = initialState, action) => {

  switch (action.type) {

    case LOADING:

      return {
        ...state,
        dealers: [],
      };

    case PRODUCT_REPORT:

      return {
        ...state,
        productData: action.payload.data,
        productType: action.productType
      };

    case INVOICE_REPORT:
      return {
        ...state,
        invoiceData: action.payload.data
      };

    case PAYMENT_HISTORY_REPORT:
      return {
        ...state,
        paymentHistoryData: action.payload.data
      };

    case HARDWARE_REPORT:
      return {
        ...state,
        hardwareData: action.payload.data
      };

    case SALES_REPORT:
      return {
        ...state,
        salesData: action.payload.data
      };

    default:
      return state;

  }
}
