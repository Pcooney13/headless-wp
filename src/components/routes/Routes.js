import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

//Components
import Home from '../../pages/Home'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import Ingredient from '../../pages/Ingredient'
import Recipe from '../../pages/Recipe'
import PhotosMap from '../../pages/PhotosMap'
import Resume from '../../pages/Resume'
import List from '../../pages/List'
import Weather from '../../pages/Weather'
// import Users from "../pages/Users";
import User from '../../pages/User'
import Notfound from '../../pages/404'
import '../../assets/css/App.scss'
import Cookies from 'js-cookie'

class Routes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: undefined,
        }
    }

    componentDidMount() {
        //Check cookies if user is logged in && forces a reload on login
        if (Cookies.get('user_id')) {
            console.log('someone is logged in')
            console.log(Cookies.get())
            fetch(
                `https://pat-cooney.com/wp-json/v1/users/${Cookies.get(
                    'username'
                )}`
            )
                .then((response) => {
                    return response.json()
                })
                .then((value) => {
                    console.log(value)
                    this.setState({
                        user: value,
                    })
                })
        }
    }

    breadcrumbsRegEx = (path) => {
        let prevPost = ''
        Cookies.remove('account-form')
        path = path.substring(1) // remove slash (/) at beginning
        let pathArray = path.split('/') //split pathname at each slash (/)
        pathArray = pathArray.filter((v) => v !== '')

        return (
            <div className="mx-6 max-w-screen-lg lg:m-auto">
                {path === '' ? (
                    //home
                    <div className="py-6 border-b border-black-200 font-gotham-light">
                        <span className="capitalize text-black-500">home</span>
                    </div>
                ) : (
                    //all other pages
                    <div
                        id="breadcrumbs"
                        className="py-6 border-b border-black-200 font-gotham-light"
                    >
                        <span>
                            <a
                                href="/"
                                className="underline opacity-75 text-green font-gotham-bold transition-all duration-300 hover:text-bright-green focus:text-bright-green"
                                rel="v:url"
                                property="v:title"
                            >
                                Home
                            </a>
                            <span className="mx-1 text-black-500">/</span>
                        </span>

                        {pathArray.map((path, i) =>
                            i + 1 !== pathArray.length ? (
                                <span key={i}>
                                    <a
                                        href={`/${pathArray[ i-1 ] ? pathArray[ i-1 ] + '/' : '' }${path.toLowerCase()}${
                                            i === 1 ? '/' : ''
                                        }`}
                                        className="capitalize underline opacity-75 text-green font-gotham-bold transition-all duration-300 hover:text-bright-green focus:text-bright-green"
                                        rel="v:url"
                                        property="v:title"
                                    >
                                        {path}
                                    </a>
                                    <span className="mx-1 text-black-500">
                                        /
                                    </span>
                                </span>
                            ) : (
                                <span
                                    key={i}
                                    className="capitalize text-black-500"
                                >
                                    <span>{path}</span>
                                    <span></span>
                                </span>
                            )
                        )}
                    </div>
                )}
            </div>
        )
    }

    render() {
        return (
            <Router>
                {/* {console.log('Routes rendered')}
                {console.log('state', this.state)} */}
                {console.log(Cookies.get("wp-auth-token"))}
                <Header
                    user={this.state.user}
                />
                <Route
                    render={({ location }) => {
                        return this.breadcrumbsRegEx(location.pathname)
                    }}
                />
                <AnimatePresence exitBeforeEnter>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/weather" component={Weather} />
                        <Route
                            exact
                            path="/list"
                            render={(props) => <List {...props} />}
                        />
                        <Route exact path="/resume" component={Resume} />
                        <Route exact path="/map" component={PhotosMap} />
                        <Route path="/users/:slug" component={User} />
                        <Route
                            exact
                            path="/users"
                            render={(props) => (
                                <List {...props} type={'users'} />
                            )}
                        />
                        <Route path="/recipes/:recipe" component={Recipe} />
                        <Route
                            exact
                            path="/recipes"
                            render={(props) => (
                                <List {...props} type={'recipes'} />
                            )}
                        />
                        <Route
                            path="/ingredients/:ingredient"
                            component={Ingredient}
                        />
                        <Route
                            exact
                            path="/ingredients"
                            render={(props) => (
                                <List {...props} type={'ingredients'} />
                            )}
                        />
                        <Route component={Notfound} />
                    </Switch>
                </AnimatePresence>
                <Footer />
            </Router>
        )
    }
}

export default Routes
