import React from 'react';
import { Button, Icon, Card, Timeline, notification } from 'antd';
import styled from 'styled-components';
import { inject } from "mobx-react";
import PropTypes from 'prop-types';

import { Input } from './Styles';

const AddFieldForm = styled.form`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 300px 200px 150px;
  grid-gap: 10px;
`;

const StepBox = styled.span`
  font-size: 1.1em;
  font-weight: bolder;
`;

const FormBuilder = props => {
  const { submitNewFieldForm, newLabel, newType, onNewFieldChange, newFormName, saveForm, setFormId } = props;

  const onFormSave = () => {
    saveForm()
      .then(res => {
        setFormId(res.data);
        notification["success"]({
          message: 'Success!',
          description: `Form saved successfully, new ID: ${res.data}`,
        });
      })
      .catch(error => {
        notification["error"]({
          message: 'Could not save form',
          description: error,
        });
      });
  }

  return (
    <div>
      <Card>
        <Timeline>
          <Timeline.Item>
            <p>
              <StepBox>Step 1.</StepBox> Please select new Form Name
            </p>
            <p>
              <label htmlFor="">Form Name: </label>
              {" "}<Input type="text" name="form-name" id="form-name" value={newFormName} onChange={onNewFieldChange} />
            </p>
          </Timeline.Item>

          <Timeline.Item>
            <p>
              <StepBox>Step 2.</StepBox> Add as many fields as you want
            </p>
            <AddFieldForm onSubmit={submitNewFieldForm}>
              <Input id="label" name="label" placeholder="Field Label" type="text" value={newLabel} onChange={onNewFieldChange} />
              <select id="type" name="type" value={newType} onChange={onNewFieldChange}>
                <option value="">Select field type</option>
                <option value="input">Input</option>
                <option value="checkbox">Checkbox</option>
                <option value="file">File</option>
                <option value="dropdown">Random dropdown</option>
              </select>

              <Button type="primary" htmlType="submit"><Icon type="plus" /> Add to Form</Button>
            </AddFieldForm>
          </Timeline.Item>

          <Timeline.Item>
            <p>
              <StepBox>Step 3.</StepBox> If you're happy with your form please save it. <Button type="primary" onClick={onFormSave}>
                {props.isLoading ?
                  <Icon type="loading" spin /> : <span><Icon type="cloud-upload" /> Save form</span>
                }
              </Button>
            </p>
          </Timeline.Item>
        </Timeline>
      </Card>
    </div>
  );
};

FormBuilder.propTypes = {
  submitNewFieldForm: PropTypes.func.isRequired,
  onNewFieldChange: PropTypes.func.isRequired,
  saveForm: PropTypes.func.isRequired,
  newLabel: PropTypes.string.isRequired,
  newType: PropTypes.string.isRequired,
  newFormName: PropTypes.string.isRequired,
  setFormId: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

export default inject(stores => {
  return ({
    onNewFieldChange: stores.formStore.onNewFieldChange,
    newLabel: stores.formStore.newFieldForm.label,
    newType: stores.formStore.newFieldForm.type,
    submitNewFieldForm: stores.formStore.submitNewFieldForm,
    newFormName: stores.formStore.newFieldForm.formName,
    saveForm: stores.formStore.saveForm,
    setFormId: stores.formStore.setFormId,
    isLoading: stores.formStore.isLoading,
  })
})(FormBuilder);