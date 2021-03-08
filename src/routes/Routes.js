import React from "react";
import { Route, BrowserRouter as Router, Switch, } from 'react-router-dom';

//Components
import App from '../App'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import Photos from '../pages/Photos'
import Recipes from '../pages/Recipes'
import Ingredients from '../pages/Ingredients'
import Ingredient from '../pages/Ingredient'
import PhotosMap from '../pages/PhotosMap'
import Resume from '../pages/Resume'
import Weather from "../pages/Weather";
import Users from "../pages/Users";
import User from "../pages/Users";
import Notfound from '../pages/404'
import '../components/styles/App.scss';
import Cookies from 'js-cookie';


class Routes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            loggedIn: false,
            token: 'wp-token',
            username: undefined,
            user:undefined,
            modalState: undefined,
        };
        this.changeUser = this.changeUser.bind(this);
    }
    componentDidMount() {
        //Check cookies if user is logged in && forces a reload on login
        if (Cookies.get('username')) {
            this.setState({
                username: Cookies.get('username'),
            });
        }
    }
    changeUser = user => {
        if (user) {
            this.setState({
                username: user,
            });
        } else {
            this.setState({
                username: undefined,
            });
        }
    };
    // Add api call to /:user and setState: {user: res.apidata}
    handlelogin = (e) => {
        e.preventDefault();
        console.log(this.state);
        let user;
        if (!this.state.username) {
            user = document.getElementById('username').value;
        } else {
            user = this.state.username;
        }
        console.log(user);
        fetch('https://pat-cooney.com/wp-json/jwt-auth/v1/token', {
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
            .then(response => {
                console.log(response);
                if (200 === response.status) {
                    Cookies.set('username', user);
                    // Cookies.set('wp-auth-token', response.token);
                    console.log(Cookies.get());
                    return response.json();
                }
            })
            .then(post => {
                Cookies.set('wp-auth-token', post.token);
                console.log(post.token); //token response
                // loginFunction();
                return fetch('https://pat-cooney.com/wp-json/wp/v2/users/me', {
                    headers: {
                        Authorization: 'Bearer ' + Cookies.get('wp-auth-token'),
                    }
                }).then(boobs => {
                    return boobs.json()
                }).then(data => {
                    Cookies.remove("userImageLink")
                    if (data.profile_image) {
                        Cookies.set("userImageLink", data.profile_image)
                    }
                    console.log(Cookies.get("userImageLink"))
                    this.setState({
                        user:data
                    })
                })
            });
            user &&
                this.changeUser(user);
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
            this.hideModal();
            console.log(this.state);
    };
    handleSignIn = (e) => {
        e.preventDefault();
        fetch('https://pat-cooney.com/wp-json/wp/v2/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: document.getElementById('username').value,
                password: document.getElementById('password').value,
                first_name: document.getElementById('firstname').value,
                last_name: document.getElementById('lastname').value,
                email: document.getElementById('email').value,
            }),
        })
        .then(function(response) {
            if (200 === response.status) {
                return response.json();
            }
        })
        .then(function(post) {
            // Cookies.set('wp-auth-token', post.token);
        });
        document.getElementById('username').value = '';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        document.getElementById('re-password').value = '';
        document.getElementById('firstname').value = '';
        document.getElementById('lastname').value = '';
        this.hideModal();
    };
    handlelogout = () => {
        Cookies.remove('wp-auth-token');
        Cookies.remove('username');
        Cookies.remove('userImageLink');
        this.changeUser();
    };
    handleAccountForm = (e) => {
        e.preventDefault()
        console.log(e.target.children[0].innerHTML)
        if (e.target.children[0].innerHTML === "Log In") {
            this.handlelogin(e)
        } else if (e.target.children[0].innerHTML === "Sign Up") {
            this.handleSignIn(e)
        } else if (e.target.children[0].innerHTML === "Forgot Password") {
            //figure out forgot password
            alert("sucks to suck... Still need to make this")
        }
    }
    hideModal = () => {
        document.getElementById('modal').style.display = 'none';
        document.getElementById('modal-bg').style.display = 'none';
        document.body.style.overflowY = 'visible';
    };
    showModal = (e) => {
        document.getElementById('modal').style.display = 'block';
        document.getElementById('modal-bg').style.display = 'block';
        document.getElementById('modal-title').innerHTML = e.target.innerHTML;
        document.getElementById('modal-submit').innerHTML = e.target.innerHTML;
        document.body.style.overflowY = 'hidden';
        if (e.target.innerHTML === "Log In") {
            document.getElementById('modal-username').style.display = 'block';
            document.getElementById('modal-password').style.display = 'block';
            document.getElementById('modal-password').classList.remove('input__half');
            document.getElementById('modal-re-password').style.display = 'none';
            document.getElementById('modal-firstname').style.display = 'none';
            document.getElementById('modal-lastname').style.display = 'none';
            document.getElementById('modal-email').style.display = 'none';
            document.getElementById('modal-btn-left').innerHTML = 'Sign Up';
            
            // document.getElementById('account-form').onsubmit = e => this.handlelogin(e);
            // document.getElementById('modal-btn-left').addEventListener("click", (e) => {this.showModal(e)});
        } else if (e.target.innerHTML === "Sign Up") {
            document.getElementById('modal-username').style.display = 'block';
            document.getElementById('modal-password').style.display = 'block';
            document.getElementById('modal-password').classList.add('input__half');
            document.getElementById('modal-firstname').style.display = 'block';
            document.getElementById('modal-re-password').style.display = 'block';
            document.getElementById('modal-lastname').style.display = 'block';
            document.getElementById('modal-email').style.display = 'block';
            document.getElementById('modal-btn-left').innerHTML = 'Log In';
            document.getElementById('modal-btn-right').innerHTML = 'Forgot Password';
            
            // document.getElementById('account-form').onsubmit = e => this.handleSignIn(e);
            // document.getElementById('modal-btn-left').addEventListener("click", (e) => { this.showModal(e) });
        } else if (e.target.innerHTML === "Forgot Password") {
            document.getElementById('modal-username').style.display = 'none';
            document.getElementById('modal-password').style.display = 'none';
            document.getElementById('modal-email').style.display = 'block';
            document.getElementById('modal-btn-left').innerHTML = 'Log In';
            document.getElementById('modal-btn-right').innerHTML = 'Sign Up';
            document.getElementById('modal-firstname').style.display = 'none';
            document.getElementById('modal-lastname').style.display = 'none';
            document.getElementById('modal-re-password').style.display = 'none';
            document.getElementById('modal-password').classList.remove('input__half');
            Cookies.set('account-form', 'forgotpw');
            console.log(Cookies.get())
            // document.getElementById('modal-btn-left').addEventListener("click", (e) => { this.showModal(e) });
            // document.getElementById('modal-btn-right').innerHTML = 'login';
            // document.getElementById('modal-btn-left').addEventListener("click", () => { this.showModal("Login") });
        }
    };

    
    render() {
        return (
            <Router>
                <Header
                    showModal={this.showModal}
                    hideModal={this.hideModal}
                    handlelogout={this.handlelogout}
                    handlelogin={this.handlelogin}
                    handleSignIn={this.handleSignIn}
                    username={this.state.username}
                    user={this.state.user}
                    modalState={this.modalState}
                    handleAccountForm = {this.handleAccountForm}
                />
                
                <Switch>
                    {/* <Route 
                        render={({ location }) => {
                            return (
                                <div className="py-6 mx-6 max-w-screen-lg border-b border-black-200 font-gotham-light lg:m-auto">
                                    <a href="/" className="underline text-black transition-all duration-300 hover:text-blue focus:text-blue" rel="v:url" property="v:title">
                                        Home
                                    </a> / <span className="font-gotham-bold text-gray-400">                                
                                        {location.pathname.substring(1)}                            
                                    </span>
                                </div> 
                            )
                        }}
                    /> */}
                    <Route exact path="/" component={App} />
                    <Route path="/photos/:category" render={props => (
                            <Photos {...props} username={this.state.username} />
                        )} />
                    <Route path="/photo/:id" render={props => (
                            <Photos {...props} username={this.state.username} />
                        )} />
                    <Route exact path="/weather" component={Weather} />
                    <Route exact path="/resume" component={Resume} />
                    <Route exact path="/map" component={PhotosMap} />
                    <Route path="/users/:id" component={User} />
                    <Route exact path="/users" component={Users} />
                    <Route exact path="/recipes" component={Recipes} />
                    <Route path="/ingredients/:ingredient" component={Ingredient} />
                    <Route 
                        exact path="/ingredients" 
                        render={props => (
                            <Ingredients {...props} username={this.state.username} />
                        )}
                    />

                    <Route
                        exact path="/photos"
                        render={props => (
                            <Photos {...props} username={this.state.username} />
                        )}
                    />

                    <Route component={Notfound} />
                </Switch>
                <Footer />
            </Router>
        );
    }
}

export default Routes;