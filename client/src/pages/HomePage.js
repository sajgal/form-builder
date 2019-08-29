import { inject } from "mobx-react";
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Empty, Tag, Button } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom'

import PageContent from '../components/PageContent';

const StyledCard = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 300px auto 200px;
  align-items: center;
  padding: 0 10px;
  margin: 10px 0px;

  &:hover {
    background: #f4f4f4;
  }
`;

class HomePage extends Component {
  componentDidMount() {
    this.props.loadSavedForms();
  }

  render() {
    let formsList = <Empty />

    if (this.props.savedForms.length > 0) {
      formsList = this.props.savedForms.map(form => {
        return <StyledCard size="small" key={form._id}>
          <span><Tag>ID: {form._id}</Tag></span>
          <span>Form Name: {form.name}</span>
          <span><Link to={`/submissions/${form._id}`}><Button type="primary">Show submissions</Button></Link></span>
        </StyledCard>;
      })
    }

    return (
      <PageContent header="Welcome to Form Builder" subtitle="These are your forms" hideBack={true}>
        {formsList}
      </PageContent >
    );
  }
}

HomePage.propTypes = {
  loadSavedForms: PropTypes.func.isRequired,
}

export default inject(stores => {
  return ({
    isLoading: stores.formStore.isLoading,
    savedForms: stores.formStore.savedForms,
    loadSavedForms: stores.formStore.loadSavedForms,
    resetBuilderForm: stores.formStore.resetBuilderForm,
  })
})(HomePage);