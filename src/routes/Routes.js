import React from "react";
import styled from 'styled-components';
import createHistory from 'history/createBrowserHistory';
import { Route, Router, Switch } from 'react-router-dom';

//Components
import App from '../App'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import Users from '../components/pages/Users'
import User from '../components/pages/Users'
import Photos from '../components/pages/Photos'
import Green from '../components/pages/Page'
import Photo from '../components/pages/Photo'
import Weather from "../components/pages/Weather";
import Notfound from '../components/pages/404'
import '../App.css';

import Transitions from '../components/transitions'

const Perspective = styled.div`
width: 100vw;
height: 100vh;
perspective: 1200px;
`

const history = createHistory()
export default () => (
    <Router history={history}>
        <Header />
        <Route
            render={({ location }) => (
                <Perspective>
                    <Transitions pageKey={location.key} {...location.state}>
                        <Switch location={location}>
                            <Route exact path="/" component={App} />
                            <Route path="/users/:id" component={User} />
                            <Route exact path='/green' component={Green} />
                            <Route exact path="/users" component={Users} />
                            <Route path="/photos/:category" component={Photos} />
                            <Route path="/photo/:id" component={Photo} />
                            <Route exact path="/photos" component={Photos} />
                            <Route exact path="/weather" component={Weather} />
                            <Route component={Notfound} />
                        </Switch>
                    </Transitions>
                </Perspective>
            )}
        />
        <Footer />
    </Router>
)