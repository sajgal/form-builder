import { inject } from "mobx-react";
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

import PageContent from '../components/PageContent';
import FormBuilder from '../components/FormBuilder';
import FormRenderer from '../components/FormRenderer';

const FormsWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr 1fr;
  grid-gap: 25px;
`;

class CreateFormPage extends Component {
  componentDidMount() {
    this.props.resetBuilderForm();
  }

  render() {
    return (
      <PageContent header="New form" subtitle="Here you can build, submit and preview your form">
        <FormsWrapper>
          <FormBuilder />
          <FormRenderer />
        </FormsWrapper>
      </PageContent >
    );
  }
}

CreateFormPage.propTypes = {
  resetBuilderForm: PropTypes.func.isRequired,
}

export default inject(stores => {
  return ({
    resetBuilderForm: stores.formStore.resetBuilderForm,
  })
})(CreateFormPage);