import React, { Component } from "react";
import "./App.css";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import Photos from "./Photos";

class CategoryPhotos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        Promise.all([
            fetch("http://localhost:8888/pcooney/wp-json/wp/v2/photography?per_page=12").then(value => value.json()),
            fetch("http://localhost:8888/pcooney/wp-json/wp/v2/categories?per_page=12").then(value => value.json())
        ])
            .then(
                result => {
                    let currentCategory = this.props.match.params.category;
                    console.log(currentCategory)
                    const categories = [];
                    for (let i = 0; i < result[1].length; i++) {
                        if (result[1][i].slug === currentCategory) {
                            currentCategory = result[1][i].id.toString();
                        }
                    }
                    for (let i = 0; i < result[0].length; i++) {
                        if (result[0][i].categories) {
                            result[0][i].categories.map(cats =>
                                cats.toString() === currentCategory
                                    ? categories.push(result[0][i])
                                    : console.log(currentCategory)
                            );
                        }
                    }
                    this.setState({
                        isLoaded: true,
                        items: categories.sort()
                    });
                },
                error => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <Router>
                    <div className="App">
                        <h1>{this.props.match.params.category.charAt(0).toUpperCase() + this.props.match.params.category.slice(1)}</h1>
                        <div className="gallery">
                            {items.map(item => (
                                <div
                                    key={item.acf.title}
                                    className="gallery-card"
                                >
                                    <Link
                                        to={`/photos/${item.slug}`}
                                        className="gallery-image"
                                        style={{
                                            backgroundImage:
                                                "url(" +
                                                item.acf.image.sizes
                                                    .medium +
                                                ")"
                                        }}
                                    />
                                    <div className="gallery-textbox">
                                        <Link
                                            to={`/photos/${
                                                item.slug
                                            }`}
                                        >
                                            <p className="gallery-title">
                                                {item.acf.title}
                                            </p>
                                        </Link>
                                        <p>
                                            <Link
                                                to={`/photos/${
                                                    items.slug
                                                }`}
                                                className="gallery-category"
                                            >
                                                {items.name}
                                            </Link>
                                        </p>
                                        <Switch>
                                            {/* <Route path="/photos/:title" component={CategoryPhotos} /> */}
                                            <Route
                                                exact
                                                path="/photos/"
                                                component={Photos}
                                            />
                                        </Switch>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Router>
            );
        }
    }
}

export default CategoryPhotos;
