import {
  PRODUCT_REPORT,
  HARDWARE_REPORT,
  INVOICE_REPORT,
  PAYMENT_HISTORY_REPORT,
  LOADING,
} from "../../constants/ActionTypes";

const initialState = {
  productData: {},
  hardwareData: {},
  invoiceData: {},
  paymentHistoryData: {},
  productType:""
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

    default:
      return state;

  }
}
