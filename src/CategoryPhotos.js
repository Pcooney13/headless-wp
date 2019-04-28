import React, { Component } from "react";
import { Link } from "react-router-dom";

class CategoryPhotos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
        };
        this.dogs = [];
        this.cats = [];
        this.people = [];
        this.landscape = [];
        this.categories = [];
    }

    getData() {

        Promise.all([
            fetch("http://localhost:8888/test/wp-json/wp/v2/photography?per_page=50").then(value => value.json()),
            fetch("http://localhost:8888/test/wp-json/wp/v2/categories?per_page=50").then(value => value.json())
        ])
            .then(
                result => {
                    //[0] = posts
                    //[1] = categories
                    //[6] = color
                    for (let i = 0; i < result[0].length; i++) {
                        for (let j = 0; j < result[0][i].categories.length; j++) {
                            console.log(result[0][i].categories[j]);
                            if (result[0][i].categories[j] === 2) {
                                this.dogs.push(result[0][i]);
                            }
                            if (result[0][i].categories[j] === 3) {
                                this.landscape.push(result[0][i]);
                            }
                            if (result[0][i].categories[j] === 4) {
                                this.people.push(result[0][i]);
                            }
                            if (result[0][i].categories[j] === 5) {
                                this.cats.push(result[0][i]);
                            }
                        }
                        console.log(result[0][i].slug);
                    }
                    let currentCategory = this.props.match.params.category;
                    const categoryColor = [];

                    //checks categories  against current page category to get the color
                    for (let i = 0; i < result[1].length; i++) {
                        if (result[1][i].slug === currentCategory) {
                            currentCategory = result[1][i].id.toString();
                            categoryColor.push(result[1][i].acf.color);
                        }
                    }
                    result[2] = this.dogs;
                    result[3] = this.landscape;
                    result[4] = this.people;
                    result[5] = this.cats;
                    result[6] = categoryColor; //add color to results
                    //checks posts to match the current category
                    for (let i = 0; i < result[0].length; i++) {
                        if (result[0][i].categories) {
                            result[0][i].categories.map(cats =>
                                cats.toString() === currentCategory
                                    ? this.categories.push(result[0][i])
                                    : null
                            );
                        }
                    }
                    result[0] = this.categories; //add categories to results
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                    // console.log(result);
                },
                error => {
                    this.setState({
                        isLoaded: true,
                        categories: this.categories,
                        error
                    });
                }
            );
    }

    componentDidMount() {
        this.getData();
        
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            console.log(this.state)
            console.log(this.props.match.params.category)
            if (this.props.match.params.category === 'dogs') {
                items[0] = items[2]
            }
            if (this.props.match.params.category === 'landscape') {
                items[0] = items[3]
            }
            if (this.props.match.params.category === 'people') {
                items[0] = items[4]
            }
            if (this.props.match.params.category === 'cats') {
                items[0] = items[5]
            }
            return (
                    <div className="App">
                        <h1 style={{ color:items[6]}}>{this.props.match.params.category.charAt(0).toUpperCase() + this.props.match.params.category.slice(1)}</h1>
                        <div className="gallery">
                            {items[0].map(item => (
                                <div
                                    key={item.slug}
                                    className="gallery-card"
                                >
                                    <div className="gallery-imagebox">
                                        <Link
                                            to={`/photo/${item.slug}`}
                                            className="gallery-image"
                                            style={{ backgroundImage: "url(" + item.acf.image.sizes.medium + ")" }}
                                        />
                                    </div>
                                    <div className="gallery-textbox">
                                        <h4 className="gallery-title">
                                            <Link to={`/photo/${item.slug}`}>
                                                {item.title.rendered.replace('#038;', '').replace('&#8217;', '\'')}
                                            </Link>
                                        </h4>
                                        <p className="gallery-categories">
                                            {items[1].map(tag =>
                                                tag.id === item.categories[0] || tag.id === item.categories[1] || tag.id === item.categories[2] || tag.id === item.categories[3]
                                                    ? (
                                                        <Link
                                                            key={this.state.key}
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
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
            );
        }
    }
}

export default CategoryPhotos;
