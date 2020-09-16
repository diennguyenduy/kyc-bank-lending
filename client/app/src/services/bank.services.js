import axios from 'axios';
import { authHeader } from '_helpers/auth-header';
export const producerService = {
  createCustomer,
  getCustomer,
  getAllCustomer,
  editCustomer,
  deleteCustomer,
  getCustomerByUsername,
  createProduct,
  editProduct,
  getProduct,
  getAllProduct,
  deleteProduct,
  getAllProductByCustomer,
};
//------------Customer-----------------------------------------------------------------------//
// create a customer
async function createCustomer(customer) {
  try {
    let response = await axios.post(
      `${process.env.REACT_APP_API_BACKEND}/customer`,
      {
        username: customer.username,
        name: customer.name,
        address: customer.address,
        description: customer.description,
        imageUrl: customer.imageUrl,
      },
      {
        headers: authHeader(),
      }
    );

    return response.data;
  } catch (error) {
    console.log(error.response);

    throw error;
  }
}
// edit customer
async function editCustomer(customerId, customer) {
  try {
    let response = await axios.put(
      `${process.env.REACT_APP_API_BACKEND}/customer/${customerId}`,
      {
        name: customer.name,
        address: customer.address,
        description: customer.description,
        imageUrl: customer.imageUrl,
        username: customer.username,
      },
      {
        headers: authHeader(),
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

async function deleteCustomer(customerId) {
  try {
    let response = await axios.delete(
      `${process.env.REACT_APP_API_BACKEND}/customer/${customerId}`,
      {
        headers: authHeader(),
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
}
// get a customer by Id
async function getCustomer(customerId) {
  try {
    let response = await axios.get(
      `${process.env.REACT_APP_API_BACKEND}/info/customer/${customerId}`,
      {
        headers: authHeader(),
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

// get a customer by username
async function getCustomerByUsername(username) {
  try {
    let response = await axios.get(
      `${process.env.REACT_APP_API_BACKEND}/info/customer-detail/${username}`,
      {
        headers: authHeader(),
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

// get all customers
async function getAllCustomer() {
  try {
    let response = await axios.get(
      `${process.env.REACT_APP_API_BACKEND}/customer`,
      {
        headers: authHeader(),
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}
//-----------------------------------------------------Customer-------------------------------------------//

//-----------------------------------------------------Product------------------------------------------//
//create product
async function createProduct(product) {
  try {
    let response = await axios.post(
      `${process.env.REACT_APP_API_BACKEND}/product`,
      {
        imageUrl: product.imageUrl,
        name: product.name,
        type: product.type,
        origin: product.origin,
        description: product.description,
      },
      {
        headers: authHeader(),
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function editProduct(productId, product) {
  try {
    let response = await axios.put(
      `${process.env.REACT_APP_API_BACKEND}/product/${productId}`,
      {
        imageUrl: product.imageUrl,
        name: product.name,
        type: product.type,
        origin: product.origin,
        description: product.description,
      },
      {
        headers: authHeader(),
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
async function getAllProduct() {
  try {
    let response = await axios.get(
      `${process.env.REACT_APP_API_BACKEND}/product`,
      {
        headers: authHeader(),
      }
    );

    return response.data.products;
  } catch (error) {
    throw error;
  }
}
async function getProduct(productId) {
  try {
    let response = await axios.get(
      `${process.env.REACT_APP_API_BACKEND}/info/product/${productId}`,
      {
        headers: authHeader(),
      }
    );

    return response.data.product;
  } catch (error) {
    throw error;
  }
}
async function deleteProduct(productId) {
  try {
    let response = await axios.delete(
      `${process.env.REACT_APP_API_BACKEND}/product/${productId}`,
      {
        headers: authHeader(),
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
}

async function getAllProductByCustomer(customerUsername) {
  try {
    let response = await axios.get(
      `${process.env.REACT_APP_API_BACKEND}/product/customer/${customerUsername}`,
      {
        headers: authHeader(),
      }
    );

    return response.data.products;
  } catch (error) {
    throw error;
  }
}
