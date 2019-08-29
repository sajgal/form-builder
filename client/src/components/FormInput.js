import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Input } from './Styles';

const StyledInput = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 15px;
  grid-template-columns: 100px auto;
  margin-bottom: 15px;
`;

const FormInput = props => {
  const { label, type, index } = props;
  let input = "";
  const fieldId = `${index}-${label}`;

  switch (type) {
    case "input":
      input = <StyledInput>
        <label htmlFor={fieldId}>{label}</label>
        <Input type="text" name={fieldId} id={fieldId} />
      </StyledInput>
      break;
    case "checkbox":
      input = <StyledInput>
        <label htmlFor={fieldId}>{label}</label>
        <input type="checkbox" name={fieldId} id={fieldId} />
      </StyledInput>
      break;
    case "file":
      input = <StyledInput>
        <label htmlFor={fieldId}>{label}</label>
        <input type="file" name={fieldId} id={fieldId} />
      </StyledInput>
      break;
    case "dropdown":
      input = <StyledInput>
        <label htmlFor={fieldId}>{label}</label>
        <select name={fieldId} id={fieldId}>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </select>
      </StyledInput>
      break;
    default:
      input = <StyledInput>Unknown input</StyledInput>
      break;
  }

  return input;
};

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
}

export default FormInput;