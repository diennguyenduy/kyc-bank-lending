import { customerService } from 'services/customer.services.js';
import { toast } from 'react-toastify';
import * as bankAction from './bank.actions';

export const customer = {
  CEATE_FORM: 'CREATE_FORM',
  GET_ALL_FORM: 'GET_ALL_FORM',
  GET_FORM: 'GET_FORM',
  EDIT_FORM: 'EDIT_FORM',
  DELETE_FORM: 'DELETE_FORM',
  CREATE_ACTION: 'CREATE_ACTION',
  GET_ALL_ACTION: 'GET_ALL_ACTION',
  CEATE_CERTIFICATE: 'CREATE_CERTIFICATE',
  GET_ALL_CERTIFICATE: 'GET_ALL_CERTIFICATE',
  GET_CERTIFICATE: 'GET_CERTIFICATE',
  EDIT_CERTIFICATE: 'EDIT_CERTIFICATE',
  DELETE_CERTIFICATE: 'DELETE_CERTIFICATE',
};

// start Form
export const createForm = (form) => async (dispatch) => {
  try {
    let res = await customerService.createForm(form);
    dispatch({
      type: customer.CEATE_FORM,
      form: res,
    });
    dispatch(getAllForm());

    toast.success('Form created successfully!');
  } catch (error) {
    console.log('create form error');
  }
};

export const editForm = (id, form) => async (dispatch) => {
  try {
    let res = await customerService.editForm(id, form);
    dispatch(getAllForm());
    toast.success('Form has been edited!');

    return res;
  } catch (error) {
    console.log('edit customer error');
  }
};

export const deleteForm = (id) => async (dispatch) => {
  try {
    let res = await customerService.deleteForm(id);

    dispatch({
      type: customer.DELETE_FORM,
      form: res,
    });
    dispatch(getAllForm());
    toast.success('Form has been removed');
  } catch (error) {
    console.log('delete customer error');
  }
};

export const getAllForm = () => async (dispatch) => {
  try {
    let res = await customerService.getAllForm();
    dispatch({
      type: customer.GET_ALL_FORM,
      formList: res,
    });
  } catch (error) {
    console.log('Can not get all form');
  }
};

export const getForm = (id) => async (dispatch) => {
  try {
    let res = await customerService.getForm(id);
    dispatch({
      type: customer.GET_FORM,
      form: res,
    });
    dispatch(bankAction.getProduct(res.productId));
    dispatch(getAllAction(res.id));
    return res;
  } catch (error) {
    console.log('get form error');
  }
};
//end Form

//start Action
export const createAction = (action) => async (dispatch) => {
  try {
    let res = await customerService.createAction(action);
    dispatch({
      type: customer.CREATE_ACTION,
      action: res,
    });
    dispatch(getAllAction(action.formId));
    // dispatch(getAllAction(action.formId));
  } catch (error) {
    console.log(error);
  }
};

export const getAllAction = (formId) => async (dispatch) => {
  try {
    let res = await customerService.getAllAction(formId);

    dispatch({
      type: customer.GET_ALL_ACTION,
      actionList: res,
    });
  } catch (error) {
    console.log(error);
  }
};

//certificate
export const createCertificate = (certificate) => async (dispatch) => {
  try {
    let res = await customerService.createCertificate(certificate);
    dispatch({
      type: customer.CEATE_CERTIFICATE,
      certificate: res,
    });
    dispatch(getAllCertificate());

    toast.success('Certificate created successfully!');
  } catch (error) {
    console.log('create certificate error');
  }
};

export const editCertificate = (id, certificate) => async (dispatch) => {
  try {
    let res = await customerService.editCertificate(id, certificate);
    dispatch(getAllCertificate());
    toast.success('Certificate has been edited!');

    return res;
  } catch (error) {
    console.log('edit customer error');
  }
};

export const deleteCertificate = (id) => async (dispatch) => {
  try {
    let res = await customerService.deleteCertificate(id);

    dispatch({
      type: customer.DELETE_CERTIFICATE,
      certificate: res,
    });
    dispatch(getAllCertificate());
    toast.success('Certificate has been removed');
  } catch (error) {
    console.log('delete customer error');
  }
};

export const getAllCertificate = () => async (dispatch) => {
  try {
    let res = await customerService.getAllCertificate();
    dispatch({
      type: customer.GET_ALL_CERTIFICATE,
      certificateList: res,
    });
  } catch (error) {
    console.log('Can not get all certificate');
  }
};

export const getCertificate = (username) => async (dispatch) => {
  try {
    let res = await customerService.getCertificate(username);
    dispatch({
      type: customer.GET_CERTIFICATE,
      certificate: res,
    });
    return res;
  } catch (error) {
    console.log('Can not get all certificate');
  }
};
