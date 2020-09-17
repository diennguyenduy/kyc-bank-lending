import axios from 'axios';
import { authHeader } from '_helpers/auth-header';

export const customerService = {
  createForm,
  getForm,
  getAllForm,
  editForm,
  deleteForm,
  createAction,
  getAllAction,
  createCertificate,
  getCertificate,
  getAllCertificate,
  editCertificate,
  deleteCertificate,
};

//------------Form-----------------------------------------------------------------------//
// create a form
async function createForm(form) {
  try {
    let respone = await axios.post(
      `${process.env.REACT_APP_API_BACKEND}/form`,
      {
        id: form.id,
        customer: form.customer,
        customerId: form.customerId,
        amount: form.amount,
      },
      {
        headers: authHeader(),
      }
    );

    return respone.data.forms;
  } catch (error) {
    throw error;
  }
}

// edit form
async function editForm(formId, form) {
  try {
    let respone = await axios.put(
      `${process.env.REACT_APP_API_BACKEND}/form/${formId}`,
      {
        id: form.id,
        customer: form.customer,
        customerId: form.customerId,
        amount: form.amount,
      },
      {
        headers: authHeader(),
      }
    );

    return respone.forms;
  } catch (error) {
    throw error;
  }
}

async function deleteForm(formId) {
  try {
    let respone = await axios.delete(
      `${process.env.REACT_APP_API_BACKEND}/form/${formId}`,
      {
        headers: authHeader(),
      }
    );

    return respone;
  } catch (error) {
    console.log(error);

    throw error;
  }
}

// get a form by Id
async function getForm(formId) {
  try {
    let respone = await axios.get(
      `${process.env.REACT_APP_API_BACKEND}/info/form/${formId}`,
      {
        headers: authHeader(),
      }
    );
    return respone.data.result;
  } catch (error) {
    throw error;
  }
}

// get all forms
async function getAllForm() {
  try {
    let respone = await axios.get(`${process.env.REACT_APP_API_BACKEND}/form`, {
      headers: authHeader(),
    });

    return respone.data.forms;
  } catch (error) {
    throw error;
  }
}
//-----------------------------------------------------Form-------------------------------------------//

async function createAction(action) {
  try {
    let respone = await axios.post(
      `${process.env.REACT_APP_API_BACKEND}/action`,

      {
        imgUrl: action.imgUrl,
        action: action.action,
        time: action.time,
        description: action.description,
        formId: action.formId,
      },
      {
        headers: authHeader(),
      }
    );
    return respone.data.action;
  } catch (error) {
    throw error;
  }
}

async function getAllAction(formId) {
  try {
    let respone = await axios.get(
      `${process.env.REACT_APP_API_BACKEND}/info/actions/${formId}`,
      {
        headers: authHeader(),
      }
    );

    return respone.data.actions;
  } catch (error) {
    throw error;
  }
}

//----------------------------------------------CERTIFICATE---------------------------------------------------------------------------------
async function createCertificate(certificate) {
  try {
    let respone = await axios.post(
      `${process.env.REACT_APP_API_BACKEND}/certificate`,
      {
        name: certificate.name,
        description: certificate.description,
        imageUrl: certificate.imageUrl,
      },
      {
        headers: authHeader(),
      }
    );

    return respone.data.certificates;
  } catch (error) {
    throw error;
  }
}

// edit certificate
async function editCertificate(certificateId, certificate) {
  try {
    let respone = await axios.put(
      `${process.env.REACT_APP_API_BACKEND}/certificate/${certificateId}`,
      {
        name: certificate.name,
        description: certificate.description,
        imageUrl: certificate.imageUrl,
      },
      {
        headers: authHeader(),
      }
    );

    return respone.certificates;
  } catch (error) {
    throw error;
  }
}

async function deleteCertificate(certificateId) {
  try {
    let respone = await axios.delete(
      `${process.env.REACT_APP_API_BACKEND}/certificate/${certificateId}`,
      {
        headers: authHeader(),
      }
    );

    return respone;
  } catch (error) {
    console.log(error);

    throw error;
  }
}

// get a certificate by Id
async function getCertificate(username) {
  try {
    let respone = await axios.get(
      `${process.env.REACT_APP_API_BACKEND}/info/certificate/${username}`,
      {
        headers: authHeader(),
      }
    );
    return respone.data.certificate;
  } catch (error) {
    throw error;
  }
}

// get all certificates
async function getAllCertificate() {
  try {
    let respone = await axios.get(
      `${process.env.REACT_APP_API_BACKEND}/certificate`,
      {
        headers: authHeader(),
      }
    );

    return respone.data.certificates;
  } catch (error) {
    throw error;
  }
}
