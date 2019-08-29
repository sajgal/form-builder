import { inject } from "mobx-react";
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Empty, Card, Tag, Divider } from 'antd';

import PageContent from '../components/PageContent';

class SubmissionsPage extends Component {
  componentDidMount() {
    this.props.loadSavedSubmissions(this.props.match.params.formId);
  }

  render() {
    let submissionsList = <Empty />

    if (this.props.savedSubmissions.length > 0) {
      submissionsList = this.props.savedSubmissions.map(submission => {
        const rows = Object.keys(submission.values).map((k) => {
          return <div key={k}>{k}: {submission.values[k]}</div>
        })

        return <Card size="small" key={submission._id}>
          Submission ID <Tag>{submission._id}</Tag>
          <Divider />
          {rows}
        </Card>;
      })
    }

    return (
      <PageContent header="Submissions" subtitle={`Saved submissions for form ${this.props.match.params.formId}`} >
        {submissionsList}
      </PageContent >
    );
  }
}

SubmissionsPage.propTypes = {
  loadSavedSubmissions: PropTypes.func.isRequired,
}

export default inject(stores => {
  return ({
    isLoading: stores.formStore.isLoading,
    savedSubmissions: stores.formStore.savedSubmissions,
    loadSavedSubmissions: stores.formStore.loadSavedSubmissions,
  })
})(SubmissionsPage);