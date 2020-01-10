import React from "react";
import { Route, BrowserRouter as Router } from 'react-router-dom'

    // function checkPageResume() {
    //     if (window.location.href.indexOf('localhost') > -1) {
    //         setTimeout(function() {
    //             document.querySelector('.secondary-header').classList.add('show-off');
    //         }, 2000);
    //     }
    // }
    // checkPageResume();

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