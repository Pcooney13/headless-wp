import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from "./Logo";
import Cookies from 'js-cookie';

class Header extends Component {
    
    render() {

        function handlelogin() {
            let user = document.getElementById('username').value;
            console.log(user);
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
            })
            .then(function(response) {
                if (200 === response.status) {
                    console.log('Logged in');
                    Cookies.set('wp-auth-token', response.token);
                    document.getElementById('log').innerHTML = `<button
                                onClick=${() => {
                                    handlelogout();
                                }}>
                                Logout ${user}
                            </button>`;
                }
            })
        }

        function handlelogout() {
            console.log("logging out");
            Cookies.remove('wp-auth-token');
            document.getElementById('log').innerHTML = `<div>
                                <p><label>Username:</label></p>
                                <p><input id="username" class="username" type="text" name="username"/></p>
                                <p><label>Password:</label></p>
                                <p><input id="password" class="password" type="password" name="password"/></p>
                                <p><button onClick=${() => {handlelogin();}} class="submit">Login</button></p>
                            </div>`
        }

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
                    <li id="log">
                        {Cookies.get('wp-auth-token') ? (
                            <button
                                onClick={() => {
                                    handlelogout();
                                }}>
                                logout
                            </button>
                        ) : (
                            <div>
                                <p><label>Username:</label></p>
                                <p><input id="username" className="username" type="text" name="username"/></p>
                                <p><label>Password:</label></p>
                                <p><input id="password" className="password" type="password" name="password"/></p>
                                <p><button onClick={() => {handlelogin();}} className="submit">Login</button></p>
                            </div>
                        )}
                    </li>
                </ul>
                <ul className="header secondary-header">
                    <div className="container">
                        <li>Photos</li>
                    </div>
                </ul>
            </header>
        );
    }
}

export default Header;
