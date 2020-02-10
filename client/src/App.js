import React from 'react';
import AppNavbar from "./components/AppNavbar";
import ModuleList from "./components/ModuleList";
import ModulePop from "./components/ModulePop";
import './App.sass';
import {Provider} from 'react-redux'
import store from './store'

function App() {
  return (
      <Provider store={store}>
          <div className="App">
              <AppNavbar />
              <ModuleList />
              <ModulePop />
          </div>
      </Provider>
  );
}

export default App;
