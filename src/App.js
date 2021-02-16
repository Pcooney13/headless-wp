import React from "react";
import { Route, BrowserRouter as Router } from 'react-router-dom'

// Starting point of our app
function App() {
    return (
        <Router>
            <Route
                render={({ location }) => {
                    return (
                        <div className="App">
                            <h1>Home</h1>
                            <p className="text-xl color-red bg-yellow my-12">zeet</p>
                        </div>
                    );
                }}
            />
        </Router>
    );
}

export default App;