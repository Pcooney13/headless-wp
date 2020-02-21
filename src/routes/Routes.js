import React from "react";
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

//Components
import App from '../App'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import Photos from '../components/pages/Photos'
import Resume from '../components/pages/Resume'
import Weather from "../components/pages/Weather";
import Users from "../components/pages/Users";
import User from "../components/pages/Users";
import Notfound from '../components/pages/404'
import '../App.css';
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
            modalState: undefined,
        };
        this.changeState = this.changeState.bind(this);
    }

    componentDidMount() {
        if (Cookies.get('username')) {
            this.setState({
                username: Cookies.get('username'),
            });
        }
    }
    changeState = user => {
        console.log(user);
        console.log('change state');
        console.log(Cookies.get());
        this.setState({
            username: user,
        });
        console.log(this.state);
    };
    handlelogin = () => {
        console.log(this.state.username);
        let user;
        if (!this.state.username) {
            user = document.getElementById('username').value;
        } else {
            user = this.state.username;
        }
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
                console.log(response);
                if (200 === response.status) {
                    console.log(response.token);
                    Cookies.set('username', user);
                    // Cookies.set('wp-auth-token', response.token);
                    console.log(Cookies.get());
                    return response.json();
                }
            })
            .then(function(post) {
                Cookies.set('wp-auth-token', post.token);
                console.log(post.token); //token response
                // loginFunction();
            });
        this.changeState(user);
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        this.hideModal();
        console.log(this.state);
    };
    handlelogout = () => {
        console.log('logging out');
        Cookies.remove('wp-auth-token');
        Cookies.remove('username');
        console.log(Cookies.get());
        console.log(document.getElementById('log'));
        this.changeState();
    };
    handleSignIn = () => {
        fetch('https://pat-cooney.com/wp/wp-json/wp/v2/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: document.getElementById('username').value,
                password: document.getElementById('password').value,
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
        document.getElementById('password').value = '';
        document.getElementById('email').value = '';
        this.hideModal();
    };
    hideModal = () => {
        document.getElementById('modal').style.display = 'none';
        document.getElementById('modal-bg').style.display = 'none';
        document.body.style.overflowY = 'visible';
    };
    showModal = (e) => {
        console.log(e.target.innerHTML);
        document.getElementById('modal').style.display = 'block';
        document.getElementById('modal-bg').style.display = 'block';
        document.getElementById('modal-title').innerHTML = e.target.innerHTML;
        document.getElementById('modal-submit').innerHTML = e.target.innerHTML;
        document.body.style.overflowY = 'hidden';
        if (e.target.innerHTML === "Log In") {
            document.getElementById('modal-username').style.display = 'block';
            document.getElementById('modal-password').style.display = 'block';
            document.getElementById('modal-email').style.display = 'none';
            document.getElementById('modal-btn-left').innerHTML = 'Sign Up';
            document.getElementById('modal-btn-right').innerHTML = 'Forgot Password';
            // document.getElementById('modal-btn-left').addEventListener("click", (e) => {this.showModal(e)});
        } else if (e.target.innerHTML === "Sign Up") {
            document.getElementById('modal-username').style.display = 'block';
            document.getElementById('modal-password').style.display = 'block';
            document.getElementById('modal-email').style.display = 'block';
            document.getElementById('modal-btn-left').innerHTML = 'Log In';
            document.getElementById('modal-btn-right').innerHTML = 'Forgot Password';
            // document.getElementById('modal-btn-left').addEventListener("click", (e) => { this.showModal(e) });
        } else if (e.target.innerHTML === "Forgot Password") {
            document.getElementById('modal-username').style.display = 'none';
            document.getElementById('modal-password').style.display = 'none';
            document.getElementById('modal-email').style.display = 'block';
            document.getElementById('modal-btn-left').innerHTML = 'Log In';
            document.getElementById('modal-btn-right').innerHTML = 'Sign Up';
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
                    modalState={this.modalState}
                />
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route path="/photos/:category" component={Photos} />
                    <Route path="/photo/:id" component={Photos} />
                    <Route exact path="/weather" component={Weather} />
                    <Route exact path="/resume" component={Resume} />
                    <Route path="/users/:id" component={User} />
                    <Route exact path="/users" component={Users} />

                    <Route
                        exact
                        path="/photos"
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