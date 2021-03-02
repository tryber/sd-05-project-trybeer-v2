import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import {
  Login,
  Register,
  Products,
  Orders,
  Profile,
  Checkout,
  OrderDetails,
  ClientChat,
  AdminChatList,
  AdminOrders,
  AdminOrderDetails,
} from '.';

const Home = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/products" component={ Products } />
      <Route exact path="/checkout" component={ Checkout } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/orders" component={ Orders } />
      <Route exact path="/orders/:id" component={ OrderDetails } />
      <Route exact path="/admin/orders/:id" component={ AdminOrderDetails } />
      <Route exact path="/admin/orders" component={ AdminOrders } />
      <Route exact path="/admin/profile" component={ Profile } />
      <Route exact path="/admin/chats" component={ AdminChatList } />
      <Route exact path="/chat" component={ ClientChat } />
    </Switch>
  </Router>
);

export default Home;
