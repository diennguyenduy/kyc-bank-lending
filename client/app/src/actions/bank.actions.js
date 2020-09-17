import { bankService } from 'services/bank.services.js';
import { toast } from 'react-toastify';

export const bank = {
  CEATE_CUSTOMER: 'CREATE_CUSTOMER',
  GET_ALL_CUSTOMER: 'GET_ALL_CUSTOMER',
  GET_CUSTOMER: 'GET_CUSTOMER',
  GET_CUSTOMER_BY_USERNAME: 'GET_CUSTOMER_BY_USERNAME',
  EDIT_CUSTOMER: 'EDIT_CUSTOMER',
  DELETE_CUSTOMER: 'DELETE_CUSTOMER',
  CREAT_PRODUCT: 'CREATE_PRODUCT',
  EDIT_PRODUCT: 'EDIT_PRODUCT',
  GET_PRODUCT: 'GET_PRODUCT',
  GET_ALL_PRODUCT: 'GET_ALL_PRODUCT',
  DELETE_PRODUCT: 'DELETE_PRODUCT',
  GET_ALL_PRODUCT_BY_CUSTOMER: 'GET_ALL_PRODUCT_BY_CUSTOMER',
};
// start Customer
export const createCustomer = (customer) => async (dispatch) => {
  try {
    let res = await bankService.createCustomer(customer);
    dispatch({
      type: bank.CEATE_CUSTOMER,
      customer: res.customers,
    });

    toast.success(res.msg);
    dispatch(getAllCustomer());
  } catch (error) {
    if (error.response) toast.error(error.response.data.msg);
    else toast.error('Internal server error');
  }
};
export const editCustomer = (id, customer) => async (dispatch) => {
  try {
    let res = await bankService.editCustomer(id, customer);
    dispatch(getAllCustomer());
    toast.success(res.msg);

    return res;
  } catch (error) {
    if (error.response) toast.error(error.response.data.msg);
    else toast.error('Internal server error');
  }
};

export const deleteCustomer = (id) => async (dispatch) => {
  try {
    let res = await bankService.deleteCustomer(id);

    dispatch({
      type: bank.DELETE_CUSTOMER,
    });
    dispatch(getAllCustomer());
    toast.success(res.msg);
  } catch (error) {
    if (error.response) toast.error(error.response.data.msg);
    else toast.error('Internal server error');
  }
};
export const getAllCustomer = () => async (dispatch) => {
  try {
    let res = await bankService.getAllCustomer();
    dispatch({
      type: bank.GET_ALL_CUSTOMER,
      customerList: res.customers,
    });
  } catch (error) {
    if (error.response) toast.error(error.response.data.msg);
    else toast.error('Internal server error');
  }
};

export const getCustomer = (id) => async (dispatch) => {
  try {
    let res = await bankService.getCustomer(id);
    dispatch({
      type: bank.GET_CUSTOMER,
      customer: res,
    });
  } catch (error) {
    if (error.response) toast.error(error.response.data.msg);
    else toast.error('Internal server error');
  }
};
export const getCustomerByUsername = (username) => async (dispatch) => {
  try {
    let res = await bankService.getCustomerByUsername(username);
    dispatch({
      type: bank.GET_CUSTOMER_BY_USERNAME,
      customer: res.customer[0],
    });
    return res;
  } catch (error) {
    if (error.response) toast.error(error.response.data.msg);
    else toast.error('Internal server error');
  }
};
//end Customer

//start product
export const createProduct = (product) => async (dispatch) => {
  try {
    let res = await bankService.createProduct(product);
    dispatch({
      type: bank.CREAT_PRODUCT,
      product: res.products,
    });
    toast.success(res.msg);

    dispatch(getAllProduct());
  } catch (error) {
    if (error.response) toast.error(error.response.data.msg);
    else toast.error('Internal server error');
  }
};

export const editProduct = (productId, product) => async (dispatch) => {
  try {
    let res = await bankService.editProduct(productId, product);
    dispatch({
      type: bank.EDIT_PRODUCT,
      product: res,
    });
    toast.success(res.msg);
    dispatch(getAllProduct());
  } catch (error) {
    if (error.response) toast.error(error.response.data.msg);
    else toast.error('Internal server error');
  }
};

export const getAllProduct = () => async (dispatch) => {
  try {
    let res = await bankService.getAllProduct();

    dispatch({
      type: bank.GET_ALL_PRODUCT,
      productList: res,
    });
  } catch (error) {
    if (error.response) toast.error(error.response.data.msg);
    else toast.error('Internal server error');
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    let res = await bankService.deleteProduct(id);

    dispatch({
      type: bank.DELETE_PRODUCT,
      product: res.data,
    });

    dispatch(getAllProduct());
    toast.success(res.msg);
  } catch (error) {
    if (error.response) toast.error(error.response.data.msg);
    else toast.error('Internal server error');
  }
};
export const getProduct = (id) => async (dispatch) => {
  try {
    let res = await bankService.getProduct(id);
    dispatch({
      type: bank.GET_PRODUCT,
      product: res,
    });
  } catch (error) {
    if (error.response) toast.error(error.response.data.msg);
    else toast.error('Internal server error');
  }
};

export const getAllProductByCustomer = (customerUsername) => async (
  dispatch
) => {
  try {
    let res = await bankService.getAllProductByCustomer(customerUsername);

    dispatch({
      type: bank.GET_ALL_PRODUCT_BY_CUSTOMER,
      productListOfCustomer: res,
    });
  } catch (error) {
    if (error.response) toast.error(error.response.data.msg);
    else toast.error('Internal server error');
  }
};
