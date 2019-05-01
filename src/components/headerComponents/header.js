import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';

class Header extends Component {
  render() {
    return (
        <header>
      	  <div className="logo">
      	    <img src="https://www.pat-cooney.com/images/logo.svg" alt="Pat Cooney Designs Logo"/>
      	  </div>

     	  <nav>
        	<ul>
        	  <li>
							<Link to='/'>Home</Link>
        	  </li>
        	  <li>
							<Link to='/Products'>Products</Link>
        	  </li>
        	  <li>
							<Link to='/Contact'>Contact</Link>
        	  </li>
        	</ul>
          </nav>

        
        </header>
    );
  }
}

export default Header;
