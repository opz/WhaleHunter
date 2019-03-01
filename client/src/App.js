import React, { Component } from 'react';
import Routes from './Routes';

import 'semantic-ui-less/semantic.less';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes />
      </div>
    );
  }
}

export default App;
