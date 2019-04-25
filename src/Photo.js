import React, { Component } from 'react';
import './App.css';
// import { Route, Link } from 'react-router-dom'

// const Photo = ({ match }) => <div>
//     <p>{match.params.id}</p><h1>test</h1>
//     </div>
class Photo extends Component {
    render() {
        const { error, isLoaded } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="App">
                    <h1>1 Photo</h1>
                </div>
            );
        }
    }
}
export default Photo;
