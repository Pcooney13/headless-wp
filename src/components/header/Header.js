//create a new user --> [SIGN UP] button

//



import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from "./Logo";
import Cookies from 'js-cookie';


class Header extends React.Component {

    render() {

        const { username } = this.props;

        let scrollPos = 0;
        window.addEventListener('scroll', debounce(checkPosition));

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

        function checkPosition() {
            let windowY = window.scrollY;
            if (window.scrollY < 95) {
                document.querySelector('.header').classList.add('is-visible');
                document.querySelector('.header').classList.remove('is-hidden');
            } else if (windowY < scrollPos) {
                // Scrolling UP
                document.querySelector('.header').classList.add('is-visible');
                document.querySelector('.header').classList.remove('is-hidden');
            } else {
                // Scrolling DOWN
                document.querySelector('.header').classList.add('is-hidden');
                document
                    .querySelector('.header')
                    .classList.remove('is-visible');
            }
            scrollPos = windowY;
        }

        return (
            <header className="header-wrap">
                <ul id="header" className="header primary-header is-visible">
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
                    <li id="log">
                        {username !== undefined || Cookies.get('username') !== undefined ?
                            <button
                                id="log-out"
                                onClick={() => {
                                    this.props.handlelogout();
                                }}>
                                logout {username}
                            </button> :
                            <div>
                                <button
                                    onClick={() => {
                                        this.props.showModal();
                                    }}
                                    id="log-in">
                                    Log In
                                </button>
                                <button id="sign-in">Sign Up</button>
                            </div>
                            }
                    </li>
                </ul>
                <ul className="header secondary-header">
                    <div className="container">
                        <li>Photos</li>
                    </div>
                </ul>
                <div id="modal">
                    <span
                        onClick={() => {
                            this.props.hideModal();
                        }}
                        className="close-modal">
                        &times;
                    </span>
                    <div className="form">
                        <h2>Log in</h2>
                        <label>Username:</label>
                        <input
                            id="username"
                            className="username"
                            type="text"
                            name="username"
                            />
                        <label>Password:</label>
                        <input
                            id="password"
                            className="password"
                            type="password"
                            name="password"
                            />
                        <button
                            onClick={() => {
                                this.props.handlelogin();
                            }}
                            className="submit">
                            Login
                        </button>
                    </div>
                </div>
                <div id="modal-bg"></div>
            </header>
        );
    }
}

export default Header;
