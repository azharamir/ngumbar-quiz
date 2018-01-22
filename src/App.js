import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Topic from './components/Topic';
import './App.css';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={Topic} />
        </div>
      </Router>
    );
  }

}

export default App;