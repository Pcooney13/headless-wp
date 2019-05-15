// 1. create new array of [id, name, acf[], slug] using slug as array name
// 2. create new variable & map each post.categories to map new [array]
// 2a. if match push matching array into matching post object
// 3. return new post object with added category info

// Polish the transition from blurred image taking up screen to full size image
// Figure out the functionality for zomming from gallery card specifically not just top left corner

import React, { Component } from 'react';
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom';

class Photos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            posts: [],
            categories: [],
            categoryColor: '#126b4c',
        };
    }
    getData() {
        this.dogs = [];
        this.cats = [];
        this.art = [];
        this.people = [];
        this.landscape = [];
        this.categories = [];
        Promise.all([
            fetch(
                //change to localhost - mobile viewing
                'http://localhost:8888/pcooney/wp-json/wp/v2/photography?per_page=12'
            ).then(value => value.json()),
            fetch(
                'http://localhost:8888/pcooney/wp-json/wp/v2/categories?per_page=12'
            ).then(value => value.json()),
        ]).then(
            result => {
                const categoryColor = [];
                let currentCategory = this.props.match.params.category;

                //seperates posts into categories
                for (let i = 0; i < result[0].length; i++) {
                    for (let j = 0; j < result[0][i].categories.length; j++) {
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
                        if (result[0][i].categories[j] === 6) {
                            this.art.push(result[0][i]);
                        }
                    }
                }

                //checks categories against current page category to get the color
                for (let i = 0; i < result[1].length; i++) {
                    if (result[1][i].slug === currentCategory) {
                        currentCategory = result[1][i].id.toString();
                        categoryColor.push(result[1][i].acf.color);
                    }
                }

                //adds categories to State array
                result[2] = this.dogs;
                result[3] = this.landscape;
                result[4] = this.people;
                result[5] = this.cats;
                result[6] = this.art;
                //add color to results
                result[7] = categoryColor;

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
                if (this.categories === null) {
                    result[0] = this.categories; //add categories to results
                }
                this.setState({
                    isLoaded: true,
                    items: result,
                    posts: result[0],
                    categories: result[1],
                    categoryColor: result[7].join(),
                });
            },
            error => {
                this.setState({
                    isLoaded: true,
                    error,
                });
            }
        );
    }
    componentDidMount() {
        this.getData();
    }
    // handleCategory = (id) => {
    //         console.log(id)
    //         const clickedCategory = id;
    //         if (clickedCategory.toLowerCase() in this) {
    //             this.setState({
    //                 isLoaded: true,
    //                 posts: clickedCategory,
    //             });
    //         }
    //         console.log(this)
    //         console.log(this.dogs)
    // }

    render() {
        window.scrollTo(0, 0);
        console.log(this.state);
        const { error, isLoaded, items, categories, posts } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return (
                <div className="App">
                    <h1>
                        {this.props.match.params.category
                            ? this.props.match.params.category
                                  .charAt(0)
                                  .toUpperCase() +
                              this.props.match.params.category.slice(1)
                            : 'Photos'}
                    </h1>
                </div>
            );
        } else {
            let header = document.getElementsByClassName('header');
            let matchingPosts = [];
            let categoryColor = items[7];
            if (this.props.match.params.category === 'dogs') {
                matchingPosts = items[2];
                categoryColor = categories[2].acf.color;
                header[0].style.backgroundColor = categories[2].acf.color;
            }
            if (this.props.match.params.category === 'landscape') {
                matchingPosts = items[3];
                categoryColor = categories[3].acf.color;
                header[0].style.backgroundColor = categories[3].acf.color;
            }
            if (this.props.match.params.category === 'people') {
                matchingPosts = items[4];
                categoryColor = categories[4].acf.color;
                header[0].style.backgroundColor = categories[4].acf.color;
            }
            if (this.props.match.params.category === 'cats') {
                matchingPosts = items[5];
                categoryColor = categories[1].acf.color;
                header[0].style.backgroundColor = categories[1].acf.color;
            }
            if (this.props.match.params.category === 'art-design') {
                matchingPosts = items[6];
                categoryColor = categories[0].acf.color;
                header[0].style.backgroundColor = categories[0].acf.color;
            }
            if (this.props.match.params.category === undefined) {
                matchingPosts = posts;
                categoryColor = null;
                header[0].style.backgroundColor = categories[0].acf.color;
            }
            matchingPosts.sort(function(a, b) {
                var textA = a.slug.toUpperCase();
                var textB = b.slug.toUpperCase();
                return textA < textB ? -1 : textA > textB ? 1 : 0;
            });

            // this.props.match.params.category === 'art-design' ? this.props.match.params.category = 'Art & Design' : null;
            return (
                <div className="App">
                    <h1
                        style={{
                            color:
                                categoryColor !== undefined
                                    ? categoryColor
                                    : null,
                        }}>
                        {this.props.match.params.category
                            ? this.props.match.params.category
                                  .charAt(0)
                                  .toUpperCase() +
                              this.props.match.params.category.slice(1)
                            : 'Photos'}
                    </h1>
                    <div className="gallery">
                        {matchingPosts.slug}
                        {matchingPosts.map(item => (
                            <div key={item.slug} className="gallery-card">
                                <div className="gallery-imagebox">
                                    <Link
                                        to={`/photo/${item.slug}`}
                                        className="gallery-image"
                                        style={{
                                            backgroundImage:
                                                'url(' +
                                                item.acf.image.sizes.medium +
                                                ')',
                                        }}
                                    />
                                </div>
                                <div className="gallery-textbox">
                                    <h4 className="gallery-title">
                                        <Link to={`/photo/${item.slug}`}>
                                            {item.title.rendered
                                                .replace('#038;', '')
                                                .replace('&#8217;', "'")}
                                        </Link>
                                    </h4>
                                    <p className="gallery-categories">
                                        {categories.map(tag =>
                                            tag.id === item.categories[0] ||
                                            tag.id === item.categories[1] ||
                                            tag.id === item.categories[2] ||
                                            tag.id === item.categories[3] ? (
                                                <Link
                                                    key={tag.slug}
                                                    className="gallery-category"
                                                    style={{
                                                        backgroundColor:
                                                            tag.acf.color,
                                                        borderTopColor:
                                                            tag.acf.color,
                                                    }}
                                                    to={`/photos/${tag.slug}`}
                                                    data-tooltip={tag.name.replace(
                                                        'amp;',
                                                        ''
                                                    )}
                                                    aria-hidden="true">
                                                    {tag.name.slice(0, 1)}
                                                </Link>
                                            ) : null
                                        )}
                                    </p>
                                </div>
                            </div>
                        ))}
                        <Router>
                            <Switch>
                                <Route path="/photo/:id" component={Photo} />
                            </Switch>
                        </Router>
                    </div>
                </div>
            );
        }
    }
}

function Photo({ match, ...props }) {
    return (
        <div>
            <h2>User: {match.params.id}</h2>
            {console.log(match)}
            {console.log(props)}
        </div>
    );
}

export default Photos;
