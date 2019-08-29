import "antd/dist/antd.css";
import { configure } from 'mobx';
import { HashRouter, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import React from 'react';

import HomePage from './pages/HomePage';
import CreateFormPage from './pages/CreateFormPage';
import SubmissionPage from './pages/SubmissionsPage';
import Page from './components/Page';
import RootStore from './stores/RootStore';

configure({ enforceActions: "observed" });
const store = new RootStore();

const App = () => {
  return (
    <Provider {...store}>
        <HashRouter>
          <Page>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/form/create" component={CreateFormPage} />
            <Route exact path="/submissions/:formId" component={SubmissionPage} />
          </Page>
        </HashRouter>
      </Provider>
  );
}

export default App;
