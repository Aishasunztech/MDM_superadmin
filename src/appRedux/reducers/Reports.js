import {
  PRODUCT_REPORT,
  HARDWARE_REPORT,
  INVOICE_REPORT,
  PAYMENT_HISTORY_REPORT,
  LOADING,
  SALES_REPORT,
  GRACE_DAYS_REPORT
} from "../../constants/ActionTypes";

const initialState = {
  productData: { CHAT: [], PGP: [], SIM: [], VPN: [] },
  hardwareData: [],
  invoiceData: [],
  paymentHistoryData: [],
  graceDaysData: [],
  salesData: [],
  sales_sa_data: [],
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

    case SALES_REPORT:{
      return {
        ...state,
        salesData: action.payload.data,
        sales_sa_data: action.payload.sa_data
      };

    }

    case GRACE_DAYS_REPORT:
      return {
        ...state,
        graceDaysData: action.payload.data
      };

    default:
      return state;

  }
}
