import { Layout } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import Sider from '../components/Sider';
import styled from 'styled-components';

const LayoutFullHeight = styled(Layout)`
  height: 100vh;
`;

const Page = props => {
  return (
    <LayoutFullHeight>
      <Sider path={"/"} />
      <Layout>
        {props.children}
      </Layout>
    </LayoutFullHeight>
  );
}

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]),
}

export default Page;