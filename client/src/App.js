import React from 'react';
import AppNavbar from "./components/AppNavbar";
import ModuleList from "./components/ModuleList";
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.sass';

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <ModuleList />
    </div>
  );
}

export default App;
