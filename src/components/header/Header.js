import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from "./Logo";
import Cookies from 'js-cookie';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            loggedIn: false,
            token: 'wp-token',
            username: null,
        };
    }

        handlelogin() {
            let user;
            if (!this.state.username) {
                user = document.getElementById('username').value;
                console.log(user);
            } else {
                user = this.state.username;
            }
            console.log(user)
            fetch('https://pat-cooney.com/wp/wp-json/jwt-auth/v1/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    username: document.getElementById('username').value,
                    password: document.getElementById('password').value,
                }),
            }).then(function(response) {
                if (200 === response.status) {
                    console.log('Logged in');
                    Cookies.set('username', user);
                    Cookies.set('wp-auth-token', response.token);
                    // this.changeState(user);
                    // this.LoginLogic();
                }
            });
        }
        
        //cant change state to add username
        changeState = () => {
            this.setState({
                username: 'pat',
            });
            if (this.state.username != null) {
                console.log(this.state.username);
            } else {
                console.log('nulllllll');
            }
            this.hideModal();
            this.handlelogin();
        }

        handlelogout() {
            console.log('logging out');
            Cookies.remove('wp-auth-token');
            Cookies.remove('username');
            console.log(document.getElementById('log'));
            document.getElementById('log').innerHTML = `<div>
                        <button
                            onClick=${() => {
                                this.showModal();
                            }}
                            id="log-in">
                            Log In
                        </button>
                        <button id="sign-in">Sign Up</button>
                    </div>`;
        }

        hideModal = () => {
            document.getElementById('modal').style.display = 'none';
            document.getElementById('modal-bg').style.display = 'none';
            document.body.style.overflowY = 'visible';
        }

        showModal() {
            document.getElementById('modal').style.display = 'block';
            document.getElementById('modal-bg').style.display = 'block';
            document.body.style.overflowY = 'hidden';
        }

    render() {

        const LoginLogic = () =>
            Cookies.get('wp-auth-token') ? (
                <button
                    id="log-out"
                    onClick={() => {
                        this.handlelogout();
                    }}>
                    logout {Cookies.get('username')}
                </button>
            ) : (
                <div>
                    <button
                        onClick={() => {
                            this.showModal();
                        }}
                        id="log-in">
                        Log In
                    </button>
                    <button id="sign-in">Sign Up</button>
                </div>
            );

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

        window.addEventListener('scroll', debounce(checkPosition));

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
                        <LoginLogic />
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
                            this.hideModal();
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
                                this.changeState();
                            }}
                            className="submit">
                            Login
                        </button>
                    </div>
                </div>
                <div id="modal-bg"></div>
                <button onClick={() => this.changeState()}>test</button>
                {this.state.username}
            </header>
        );
    }
}

export default Header;
