import { Layout, PageHeader } from 'antd';
import { withRouter } from "react-router-dom";
import React from 'react';

const { Footer, Content } = Layout;

const PageContent = props => {
  const TopHeader = withRouter(({ history }) => {
    return (
      <PageHeader
        title={props.header}
        subTitle={props.subtitle || ""}
        onBack={props.hideBack ? undefined : () => history.push(props.back || '/')}
      />
    );
  });

  return (
    <span>
      <TopHeader />

      <Content style={{ margin: '24px 16px 0' }}>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>{props.children}</div>
      </Content>

      <Footer style={{ textAlign: 'center' }}>Matej Sajgal © {new Date().getFullYear()}</Footer>
    </span>
  );
}

export default PageContent;