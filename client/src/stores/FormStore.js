import { observable, decorate, action } from 'mobx';

class FormStore {
  endpoint = "http://localhost:9000/api"; // this would be normally stored in .env file or in environment, not in the code
  fields = [];
  newFieldForm = {
    label: "",
    type: "",
    formName: "",
  };
  formId = null;
  isLoading = false;
  savedForms = [];
  savedSubmissions = [];

  constructor(transportLayer) {
    this.transportLayer = transportLayer;
  }

  addField(type, label) {
    this.fields = [
      ...this.fields,
      { type, label }
    ]
  }

  resetNewFieldForm() {
    this.newFieldForm.label = "";
    this.newFieldForm.type = "";
  }

  resetBuilderForm() {
    this.fields = [];
    this.newFieldForm = {
      label: "",
      type: "",
      formName: "",
    };
    this.formId = null;
  }

  onNewFieldChange(event) {
    const { name, value } = event.target;

    if (name === 'label') {
      this.newFieldForm.label = value;
    }

    if (name === 'type') {
      this.newFieldForm.type = value;
    }

    if (name === 'form-name') {
      this.newFieldForm.formName = value;
    }
  }

  submitNewFieldForm(event) {
    event.preventDefault();

    this.addField(this.newFieldForm.type, this.newFieldForm.label);
    this.resetNewFieldForm();
  }

  saveForm() {
    this.isLoading = true;
    return this.transportLayer.createForm(
      this.endpoint,
      {
        name: this.newFieldForm.formName,
        fields: this.fields,
      }
    );
  }

  setFormId(formId) {
    this.formId = formId;
    this.isLoading = false;
  }

  submitFormData(formId, formData) {
    this.isLoading = true;

    var formDataNormalised = {};
    formData.forEach(function (value, key) {
      // if uploading File, just save the name for simplicity
      if (value instanceof File) {
        value = value.name;
      }

      formDataNormalised[key] = value;
    });

    return this.transportLayer.submitData(
      this.endpoint,
      {
        formId,
        values: formDataNormalised,
      }
    );
  }

  loadingFinished() {
    this.isLoading = false;
  }

  setSavedForms(forms) {
    this.savedForms = forms;
  }

  loadSavedForms() {
    this.isLoading = true;

    this.transportLayer.getAllForms(this.endpoint)
      .then(res => {
        this.setSavedForms(res.data);
      })
      .finally(() => {
        this.loadingFinished();
      });
  }

  setSavedSubmissions(submissions) {
    this.savedSubmissions = submissions;
  }

  loadSavedSubmissions(formId) {
    this.isLoading = true;
    this.transportLayer.getSubmissionsByFormId(this.endpoint, formId)
      .then(res => {
        this.setSavedSubmissions(res.data);
      })
      .finally(() => {
        this.loadingFinished();
      });
  }
}

export default decorate(FormStore, {
  fields: observable,
  newFieldForm: observable,
  isLoading: observable,
  formId: observable,
  savedForms: observable,
  addField: action.bound,
  onNewFieldChange: action.bound,
  resetNewFieldForm: action.bound,
  submitNewFieldForm: action.bound,
  saveForm: action.bound,
  setFormId: action.bound,
  submitFormData: action.bound,
  loadingFinished: action.bound,
  loadSavedForms: action.bound,
  setSavedForms: action.bound,
  loadSavedSubmissions: action.bound,
  setSavedSubmissions: action.bound,
  resetBuilderForm: action.bound,
});