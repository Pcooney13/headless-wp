//add onclick handler for categories
//click checks what category was clicked and runs through all posts for a match

//another handler for when image is clicekd changing it out from medium to large and zoom effect to look like a screen change

// Polish the transition from blurred image taking up screen to full size image
// Figure out the functionality for zomming from gallery card specifically not just top left corner

import React from 'react';
import { Link } from 'react-router-dom';

class Photos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
        };
    }

    componentDidMount() {
        const dataPosts =
            'http://localhost:8888/pcooney/wp-json/wp/v2/photography?per_page=24';
        const dataCategories =
            'http://localhost:8888/pcooney/wp-json/wp/v2/categories?per_page=12';

        Promise.all([
            fetch(dataPosts).then(value => value.json()),
            fetch(dataCategories).then(value => value.json()),
        ]).then(value => {
            const PostArrays = value[0].map(post => {
                post.category = [];
                post.categories.map(category => {
                    value[1].map(datacat => {
                        if (category === datacat.id) {
                            category = datacat.slug;
                            post.category.push([
                                datacat.slug,
                                datacat.acf.color,
                            ]);
                        }
                    });
                    return category;
                });
                delete post.categories;
                return post;
            });
            this.setState(
                {
                    isLoaded: true,
                    posts: PostArrays,
                    allPosts: PostArrays,
                },
                error => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                }
            );
        });
    }

    handleImage(image) {
        console.log(image)
        console.log(this)
    }

    handleCategories(tag) {
        const categorizedPosts = []
        this.state.allPosts.map(post => {
           post.category.map(categories => {
               if (categories[0] === tag[0]) {
                categorizedPosts.push(post);
               }
           })
        })
        this.setState({
            posts: categorizedPosts,
        });
    }
    
    render() {
        const { error, isLoaded } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return (
                <div className="App">
                    <h1>Photos</h1>
                </div>
            );
        } else {
            return (
                <div className="App">
                    <h1>Photos</h1>
                    <div className="gallery">
                        {this.state.posts.map(post => (
                            <div key={post.slug} className="gallery-card">
                                <div className="gallery-imagebox">
                                    <Link
                                        to={`/photo/${post.slug}`}
                                        className="gallery-image"
                                        onClick={() => this.handleImage(post)}
                                        style={{
                                            backgroundImage:
                                                'url(' +
                                                post.acf.image.sizes.medium +
                                                ')',
                                        }}
                                    />
                                </div>
                                <div className="gallery-textbox">
                                    <h4 className="gallery-title">
                                        <Link to={`/photo/${post.slug}`}>
                                            {post.title.rendered
                                                .replace('#038;', '')
                                                .replace('&#8217;', "'")}
                                        </Link>
                                    </h4>
                                    <p className="gallery-categories">
                                        {post.category.map(tag => (
                                            <Link
                                                key={Math.floor(Math.random() * 1000)}
                                                className="gallery-category"
                                                style={{
                                                    backgroundColor: tag[1],
                                                    borderTopColor: tag[1],
                                                }}
                                                to={`/photos/${tag[0]}`}
                                                onClick={() => this.handleCategories(tag)}
                                                data-tooltip={tag[0].charAt(0).toUpperCase() + tag[0].slice(1)}
                                                aria-hidden="true">
                                                {tag[0]
                                                    .slice(0, 1)
                                                    .toUpperCase()}
                                            </Link>
                                        ))}
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

export default Photos;
