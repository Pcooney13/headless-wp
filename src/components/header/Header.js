import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from "./Logo";

class Header extends Component {
    
    render() {
        
        function debounce(func, wait = 13, immediate = true) {
            var timeout;
            return function() {
                var context = this,
                    args = arguments;
                var later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        }
        
        let scrollPos = 0;

        function checkPosition() {
            let windowY = window.scrollY;
            if (window.scrollY < 95){
                document.querySelector('.header').classList.add('is-visible');
                document.querySelector('.header').classList.remove('is-hidden');  
            }
            else if (windowY < scrollPos) {
                // Scrolling UP
                document.querySelector('.header').classList.add('is-visible');
                document.querySelector('.header').classList.remove('is-hidden');
            } else {
                // Scrolling DOWN
                document.querySelector('.header').classList.add('is-hidden');
                document.querySelector('.header').classList.remove('is-visible');
            }
            scrollPos = windowY;
        }

        window.addEventListener('scroll', debounce(checkPosition));

        return (
            <header className="header-wrap">
                <ul id="header" className="header is-visible">
                    <li>
                        <NavLink to="/">
                            <Logo />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/photos">
                            Photos
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/weather">
                            Weather
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/resume">
                            Resume
                        </NavLink>
                    </li>
                </ul>
                <ul
                    className="header secondary-header">
                    <div className="container">
                        <li>Photos</li>
                    </div>
                </ul>
            </header>
        );
    }
}

export default Header;
