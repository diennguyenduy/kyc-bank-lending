import * as actions from 'actions/bank.actions.js';

const initialState = {
  customer: null,
  customerList: [],
  product: null,
  productList: [],
  productListOfCustomer: [],
};

const BankReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.bank.CREATE_CUSTOMER:
      return {
        ...state,
        customer: action.customer,
      };
    case actions.bank.GET_ALL_CUSTOMER:
      return {
        ...state,
        customerList: action.customerList,
      };
    case actions.bank.GET_CUSTOMER:
      return {
        ...state,
        customer: action.customer,
      };
    case actions.bank.GET_CUSTOMER_BY_USERNAME:
      return {
        ...state,
        customer: action.customer,
      };
    case actions.bank.EDIT_CUSTOMER:
      return {
        ...state,
        customer: action.customer,
      };
    case actions.bank.DELETE_CUSTOMER:
      return {
        ...state,
        customer: action.customer,
      };
    case actions.bank.CREATE_PRODUCT:
      return {
        ...state,
        product: action.product,
      };
    case actions.bank.EDIT_PRODUCT:
      return {
        ...state,
        product: action.product,
      };
    case actions.bank.GET_PRODUCT:
      return {
        ...state,
        product: action.product,
      };
    case actions.bank.GET_ALL_PRODUCT:
      return {
        ...state,
        productList: action.productList,
      };
    case actions.bank.DELETE_PRODUCT:
      return {
        ...state,
        product: action.product,
      };
    case actions.bank.GET_ALL_PRODUCT_BY_CUSTOMER:
      return {
        ...state,
        productListOfCustomer: action.productListOfCustomer,
      };
    default:
      return state;
  }
};

export default BankReducer;
