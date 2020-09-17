import * as actions from 'actions/customer.actions.js';

const initialState = {
  form: null,
  formList: [],
  action: null,
  actionList: [],
  certificate: null,
  certificateList: [],
};

const CustomerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.customer.CREATE_FORM:
      return {
        ...state,
        form: action.form,
      };
    case actions.customer.GET_ALL_FORM:
      return {
        ...state,
        formList: action.formList,
      };
    case actions.customer.GET_FORM:
      return {
        ...state,
        form: action.form,
      };
    case actions.customer.EDIT_FORM:
      return {
        ...state,
        form: action.form,
      };
    case actions.customer.DELETE_FORM:
      return {
        ...state,
        form: action.form,
      };
    case actions.customer.CREATE_ACTION:
      return {
        ...state,
        action: action.action,
      };
    case actions.customer.GET_ALL_ACTION:
      return {
        ...state,
        actionList: action.actionList,
      };
    case actions.customer.CREATE_CERTIFICATE:
      return {
        ...state,
        certificate: action.certificate,
      };
    case actions.customer.GET_ALL_CERTIFICATE:
      return {
        ...state,
        certificateList: action.certificateList,
      };
    case actions.customer.GET_CERTIFICATE:
      return {
        ...state,
        certificate: action.certificate,
      };
    case actions.customer.EDIT_CERTIFICATE:
      return {
        ...state,
        certificate: action.certificate,
      };
    case actions.customer.DELETE_CERTIFICATE:
      return {
        ...state,
        certificate: action.certificate,
      };
    default:
      return state;
  }
};

export default CustomerReducer;
