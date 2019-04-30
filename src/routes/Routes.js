import React, { Component } from "react";
import { Route, NavLink, BrowserRouter as Router, Switch } from 'react-router-dom'
import App from '../App'
import Users from '../users'
import User from '../users'
import Photos from '../Photos'
import Photo from '../Photo'
import Logo from '../Logo'
import Notfound from '../notfound'
import '../App.css';

class Routes extends Component {
  
    render() {
    //   function debounce(func, wait = 100, immediate = true) {
    //     let timeout;
    //     return function () {
    //       let context = this, args = arguments;
    //       let later = function () {
    //         timeout = null;
    //         if (!immediate) func.apply(context, args);
    //       };
    //       let callNow = immediate && !timeout;
    //       clearTimeout(timeout);
    //       timeout = setTimeout(later, wait);
    //       if (callNow) func.apply(context, args);
    //     };
    //   };

      let scrollPos = 0;
    //   const nav = document.querySelector('.header');
    //   console.log(nav);

      function checkPosition() {
        let windowY = window.scrollY;
        // console.log("scroll" + scrollPos);
        // console.log("window" + windowY);
        if (windowY < scrollPos) {
          // Scrolling UP
        //   console.log("show");
          document.querySelector('.header').classList.add('is-visible');
          document.querySelector('.header').classList.remove('is-hidden');
        } else {
          // Scrolling DOWN
        //   console.log("hide");
          document.querySelector('.header').classList.add('is-hidden');
          document.querySelector('.header').classList.remove('is-visible');
        }
        scrollPos = windowY;
      }

      // window.addEventListener('scroll', checkPosition);
      window.addEventListener('scroll', checkPosition);
            return (
<Router>
    <div>
    <div className="header-wrap">
      <ul id="header" className="header">
        <li>
          <Logo />
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
      </div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/users/:id" component={User} />
        <Route exact path="/users" component={Users} />
        <Route path="/photos/:category" component={Photos} />
        <Route path="/photo/:id" component={Photo} />
        <Route exact path="/photos" component={Photos} />
        <Route component={Notfound} />
      </Switch>
    </div>
  </Router>
    );
    }
    }


  export default Routes;