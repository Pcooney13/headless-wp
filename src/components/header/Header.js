//create a new user --> [SIGN UP] button

//



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
            username: Cookies.get('username'),
            login: false,
        };
        this.changeState = this.changeState.bind(this);
    }

    changeState = (user) => {
        console.log(user);
        console.log("change state");
        console.log(Cookies.get());
        this.setState({
            login: !this.state.login,
            username: user,
        });
        console.log(this.state);
    };

    handlelogin() {
        console.log(this.state.username);
        let user;
        if (!this.state.username) {
            user = document.getElementById('username').value;
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
            console.log(response);
            if (200 === response.status) {
                console.log(response.token);
                Cookies.set('username', user);
                // Cookies.set('wp-auth-token', response.token);
                console.log(Cookies.get());
                return response.json();
            }
        }).then(function (post) {
            Cookies.set('wp-auth-token', post.token);
            console.log(post.token); //token response
            // loginFunction();
        });
        this.changeState(user);
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        this.hideModal();
        console.log(this.state);
    }

    handlelogout() {
        console.log('logging out');
        Cookies.remove('wp-auth-token');
        Cookies.remove('username');
        console.log(Cookies.get());
        console.log(document.getElementById('log'));
        this.changeState();
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

        const { login, username } = this.state;

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
                        <NavLink activeClassName="active" to="/photos" username={username}>
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
                        {username ?
                            <button
                                id="log-out"
                                onClick={() => {
                                    this.handlelogout();
                                }}>
                                logout {username}
                            </button> :
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
                                this.handlelogin();
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
