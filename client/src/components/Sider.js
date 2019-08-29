import { Layout, Menu, Icon } from 'antd';
import { withRouter } from "react-router-dom";
import React from 'react';
import styled from 'styled-components';

const { Sider } = Layout;

const Logo = styled.div`
  color: white;
  text-align: center;
  padding: 15px 10px 10px 10px;
  font-style: italic;
`;

const SiderComponent = () => {
  const SiderWithRouter = withRouter(({ history, location }) => {
    return (
      <Sider breakpoint="md" collapsedWidth="0">
        <Logo>
          Form Builder
        </Logo>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['/']}
          selectedKeys={[location.pathname]}
          defaultOpenKeys={["show-submenu"]}
          forceSubMenuRender={true}
        >
          <Menu.Item key="/" onClick={() => history.push('/')}>
            <span className="nav-text"><Icon type="home" /> Forms</span>
          </Menu.Item>

          <Menu.Item key="/form/create" onClick={() => history.push('/form/create')}>
            <span className="nav-text"><Icon type="star" /> Create New Form</span>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  });

  return <SiderWithRouter />
}

export default SiderComponent;