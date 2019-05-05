import React from "react";
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

//Components
import styled from 'styled-components'
import {CSSTransition}from 'react-transition-group';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Photos from './components/pages/Photos'


// Styled component to host the app.
const PageContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #e3f2fd;
  font-family: "Open Sans", sans-serif;
`;

// Starting point of our app
function App() {
    return (
        <Router>
            <Route
                render={({ location }) => {
                    return (
                        <div className="App">
                            <h1>Home</h1>
                        </div>
                    );
                }}
            />
        </Router>
    );
}

export default App;