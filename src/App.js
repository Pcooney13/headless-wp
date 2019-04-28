import React, { Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("http://localhost:8888/test/wp-json/acf/v3/locations")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="App">
                    <h1>Home</h1>
                    <div className="gallery">
                        {items.map(item => (
                            <div key={item.acf.location} className="gallery-card">
                                <div className="gallery-image" style={{backgroundImage: "url(" + item.acf.image.sizes.medium + ")"}}></div>
                                <div className="gallery-textbox">
                                    <p className="gallery-title">{item.acf.location}</p>
                                </div>
                            </div>
                            ))}
                        </div>
                </div>
            );
        }
    }
}

export default App;
