import React from 'react';
import { Card, Empty, Button, Icon, notification } from 'antd';
import { inject } from "mobx-react";
import PropTypes from 'prop-types';

import FormInput from './FormInput';

const FormRenderer = props => {
  let fieldsRendered = <Empty description={"No fields in this form yet."} />

  if (props.fields.length > 0) {
    const onFormSave = (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);

      props.saveForm(props.formId, formData)
        .then(() => {
          notification["success"]({
            message: 'Success!',
            description: 'Values saved successfully',
          });
        })
        .finally(() => {
          props.loadingFinished();
        })
        .catch(error => {
          notification["error"]({
            message: 'Could not save form values',
            description: error,
          });
        });
    }

    const inputs = props.fields.map((field, index) => {
      return <FormInput key={index} label={field.label} type={field.type} index={index} />;
    })

    fieldsRendered = <div>
      <form onSubmit={onFormSave}>
        {inputs}
        <Button key="submit" htmlType="submit" disabled={props.formId ? false : true} type="primary">
          {props.isLoading ?
            <Icon type="loading" spin /> : <span><Icon type="cloud-upload" /> Save data</span>
          }
        </Button>
      </form>
    </div>
  }

  return (
    <Card>
      {fieldsRendered}
    </Card>
  );
};

FormRenderer.propTypes = {
  fields: PropTypes.array.isRequired,
  formId: PropTypes.string,
  saveForm: PropTypes.func.isRequired,
  loadingFinished: PropTypes.func.isRequired,
}

export default inject(stores => {
  return ({
    fields: stores.formStore.fields,
    formId: stores.formStore.formId,
    saveForm: stores.formStore.submitFormData,
    loadingFinished: stores.formStore.loadingFinished,
  })
})(FormRenderer);