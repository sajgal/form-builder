import axios from 'axios';

axios.defaults.timeout = 2000;

class FormTransportLayer {
  createForm(endpoint, data) {
    const url = `${endpoint}/forms`;
    return axios.post(url, data);
  }

  getAllForms(endpoint) {
    const url = `${endpoint}/forms`;
    return axios.get(url);
  }

  submitData(endpoint, data) {
    const url = `${endpoint}/submissions`;
    return axios.post(url, data);
  }

  getSubmissionsByFormId(endpoint, formId) {
    const url = `${endpoint}/submissions/${formId}`;
    return axios.get(url);
  }
}

export default FormTransportLayer;