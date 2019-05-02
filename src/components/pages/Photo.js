import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Photo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
        this.categories = [];
    }

    componentDidMount() {
        Promise.all([
            fetch("http://localhost:8888/pcooney/wp-json/wp/v2/photography?per_page=50").then(value => value.json()),
            fetch("http://localhost:8888/pcooney/wp-json/wp/v2/categories?per_page=50").then(value => value.json())
        ])
            .then(
                result => {
                    let ClickedPage = this.props.match.params.id;
                    for (let i = 0; i < result[0].length; i++) {
                        if (result[0][i].slug === ClickedPage) {
                            // console.log(`${result[0][i].slug} matches ${ClickedPage}`)
                            this.categories.push(result[0][i]);
                        }
                    }
                    result[0] = this.categories;
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                    console.log(this.props)
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

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                    <div className="App">
                        <h1>{items[0][0].title.rendered}</h1>
                        <div className="showcase-card">
                        <div className="showcase-imagebox">
                            <Link
                                to={`/photo/${items[0][0].slug}`}
                                className="showcase-image"
                                style={{ backgroundImage: "url(" + items[0][0].acf.image.sizes.large + ")" }}
                            />
                        </div>
                        <div className="showcase-textbox">
                            <h4 className="gallery-title">
                                {items[0][0].title.rendered.replace('#038;', '').replace('&#8217;', '\'')}
                            </h4>
                            <p className="gallery-categories">
                                {items[1].map(tag =>
                                    tag.id === items[0][0].categories[0] || tag.id === items[0][0].categories[1] || tag.id === items[0][0].categories[2] || tag.id === items[0][0].categories[3]
                                        ? (
                                            <Link
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
                    </div>
            ); 
        }
    }
}
export default Photo;
