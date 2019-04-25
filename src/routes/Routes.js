import React, { Component } from "react";
import { Route, NavLink, BrowserRouter as Router, Switch } from 'react-router-dom'
import App from '../App'
import Users from '../users'
import User from '../users'
import Photos from '../Photos'
import Photo from '../Photos'
import CategoryPhotos from '../CategoryPhotos'
import Notfound from '../notfound'
import '../App.css';

class Routes extends Component {
    render() {
            return (
<Router>
    <div>
      <ul className="header">
        <li>
          <img src = "https://via.placeholder.com/30x30/ffffff/026a03?text=Pat" alt="logo" />
        </li>
        <li>
          <NavLink exact activeClassName="active" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/users">
            Users
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/photos">
            Photos
          </NavLink>
        </li>
      </ul>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/users/:id" component={User} />
        <Route exact path="/users" component={Users} />
        <Route path="/photos/:category" component={CategoryPhotos} />
        <Route path="/photos/:id" component={Photo} />
        <Route exact path="/photos" component={Photos} />
        <Route component={Notfound} />
      </Switch>
    </div>
  </Router>
    );
    }
    }


  export default Routes;