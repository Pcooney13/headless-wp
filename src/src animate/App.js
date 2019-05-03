import React from 'react'
import styled from 'styled-components'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import {SubpageProps} from './Subpage'
import './App.css'

import Transitions from './transitions'
import {Green} from './Page'

const Perspective = styled.div`
width: 100vw;
height: 100vh;
perspective: 1200px;
`

const history = createHistory()
export default () => (
  <Router history={history}>
    <Route
      render={({ location }) => (
        <Perspective>
          <Transitions pageKey={location.key} {...location.state}>
            <Switch location={location}>
              <Route exact path='/' component={Green} />
              <Route exact path='/subpage' component={SubpageProps} />
              <Redirect to='/' />
            </Switch>
          </Transitions> 
        </Perspective>
      )}
     />
  </Router>
)