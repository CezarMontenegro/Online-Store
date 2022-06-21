import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import DetailedProduct from './pages/DetailedProduct';
import { CartContextProvider } from './context/CartContex';

function App() {
  return (
    <CartContextProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/cart" component={ Cart } />
          <Route path="/detailed/:productId" component={ DetailedProduct } />
        </Switch>
      </Router>
    </CartContextProvider>
  );
}

export default App;
