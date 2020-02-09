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


class Routes extends React.Component {
    render() {
         return (
             <Router>
                 <Header/>
                 <Switch>
                     <Route exact path="/" component={App} />
                     <Route path="/photos/:category" component={Photos} />
                     <Route path="/photo/:id" component={Photos} />
                     <Route exact path="/photos" component={Photos} />
                     <Route exact path="/weather" component={Weather} />
                     <Route exact path="/resume" component={Resume} />
                     <Route path="/users/:id" component={User} />
                     <Route exact path="/users" component={Users} />
                     <Route component={Notfound} />
                 </Switch>
                 <Footer />
             </Router>
         );}
}

export default Routes;