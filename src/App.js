import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/cart" component={ Cart } />
      </Switch>
    </Router>
  );
}

export default App;
