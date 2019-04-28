import React, { Component } from 'react';
import './App.css';
import { Route, Link, Switch } from 'react-router-dom'
import Photo from './Photo'
import CategoryPhotos from './CategoryPhotos'

class Pics extends Component {
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
            fetch("http://localhost:8888/test/wp-json/wp/v2/photography?per_page=24").then(value => value.json()),
            fetch("http://localhost:8888/test/wp-json/wp/v2/categories?per_page=24").then(value => value.json())
        ])
            // .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        items: result.sort()
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
                    <h1>Fabulous Photos</h1>
                    <div className="gallery">
                        {items[1].map(item => (
                            <div
                                key={item.slug}
                                className="gallery-card"
                            >
                                <div className="gallery-imagebox">
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
                                </div>
                                <div className="gallery-textbox">
                                    <h4 className="gallery-title">
                                        <Link
                                            to={`/photos/${
                                                item.slug
                                                }`}
                                        >
                                            {item.title.rendered.replace('#038;', '').replace('&#8217;', '\'')}
                                        </Link>
                                    </h4>
                                    <p className="gallery-categories">
                                        {items[0].map(tag =>
                                            tag.id === item.categories[0] || tag.id === item.categories[1] || tag.id === item.categories[2] || tag.id === item.categories[3]
                                                ? (
                                                    <Link
                                                        key={item.id}
                                                        className="gallery-category"
                                                        style={{
                                                            backgroundColor: tag.acf.color,
                                                            borderTopColor: tag.acf.color
                                                        }}
                                                        to={`/photos/${tag.slug}`}
                                                        data-tooltip={tag.name}
                                                        aria-hidden="true"
                                                    >
                                                        {tag.name.slice(0, 1)}
                                                    </Link>
                                                ) : null
                                        )}
                                    </p>
                                    <Switch>
                                        <Route
                                            path="/photos/:category"
                                            component={
                                                CategoryPhotos
                                            }
                                            render={props => <CategoryPhotos {...props} />}
                                        />
                                        <Route
                                            path="/photos/:title"
                                            component={Photo}
                                        />
                                    </Switch>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
    }
}

export default Pics;
