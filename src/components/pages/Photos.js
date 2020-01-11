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
            'https://pat-cooney.com/wp/wp-json/wp/v2/photography?per_page=30';
        const dataCategories =
            'https://pat-cooney.com/wp/wp-json/wp/v2/categories?per_page=12';

        Promise.all([
            fetch(dataPosts).then(value => value.json()),
            fetch(dataCategories).then(value => value.json()),
        ]).then(value => {
            const PostArrays = value[0].map(post => {
                post.category = [];
                post.categories.map(category => {
                    value[1].forEach(function(datacat) {
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
            PostArrays.sort(function(a, b) {
                var textA = a.slug.toUpperCase();
                var textB = b.slug.toUpperCase();
                return textA < textB ? -1 : textA > textB ? 1 : 0;
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
        })
        .then(
            window.location.href.indexOf('photo/') > -1 ? document.querySelector('.secondary-header').classList.add('show-off') : document.querySelector('.secondary-header').classList.remove('show-off')        );
    }



    handleCategories(tag) {
        const categorizedPosts = []
        this.state.allPosts.forEach(function(post) {
            post.category.forEach(function(categories) {
                if (categories[0] === tag[0]) {
                    categorizedPosts.push(post);
                }
            })
        })
        this.setState({
            posts: categorizedPosts,
        });
    }
    
    handleImage(image) {
        // image.preventDefault()
        let cards = document.getElementsByClassName(this.className)
        for (var i = 0; i < cards.length; i++) {
            //finds card that was clicked
            if (cards[i].href.includes(this.to)) {
                console.log(cards[i].parentElement.parentElement)
                if (cards[i].style.backgroundImage.includes("300")) {
                    console.log(cards[i].style.backgroundImage);
                    cards[i].style.backgroundImage = cards[i].style.backgroundImage.slice(0, -14) + '.jpg")'
                }
                if (cards[i].parentElement.parentElement.style.order !== "-1") {
                    console.log(cards[i].parentElement.parentElement.style.order);
                    cards[i].parentElement.parentElement.style.width = "100%"
                    cards[i].parentElement.parentElement.style.order = "-1"
                    cards[i].style.height = "600px"
                    cards[i].parentElement.parentElement.style.left = 0
                    cards[i].parentElement.parentElement.style.maxWidth = "100%"
                    cards[i].parentElement.parentElement.style.zIndex = 5

                    
                } else {
                    cards[i].parentElement.parentElement.style.width = "calc(100% / 3)"
                    cards[i].parentElement.parentElement.style.order = "0"
                    cards[i].style.height = "200px"
                    cards[i].parentElement.parentElement.style.maxWidth = "300px"
                    cards[i].parentElement.parentElement.style.zIndex = 1
                    console.log(cards[i])
                }
            }
        }

        // this.setState(prevState => {
        //     const postShowcase = prevState.posts.map(post => {
        //         if (post.id === image.id) {
        //             // console.log(post.title.rendered)
        //         }
        //         return post
        //     })
        //     return {
        //         posts: postShowcase
        //     }
        // });
    }
    render() {
        window.scrollTo(0, 0);
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
                                        onClick={this.handleImage}//this.handleImage(post)}
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
