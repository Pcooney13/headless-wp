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
            'https://pat-cooney.com/wp/wp-json/wp/v2/photography?per_page=39';
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
        });
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
            //finds card that was clicked with new url
            if (cards[i].href.includes(this.to)) {
                //put image title in secondary nav when clicked on
                if (window.location.href.indexOf('photo/') > -1) {
                    document.querySelector('.secondary-header').classList.add('show-off')
                    document.querySelector('.secondary-header').children[0].children[0].innerHTML = cards[i].parentElement.parentElement.children[1].children[0].innerHTML
                } else {
                    document.querySelector('.secondary-header').classList.remove('show-off')
                }
                console.log(cards[i].parentElement.parentElement)
                if (cards[i].children[0].src.includes("300x")) {
                    cards[i].children[0].src = cards[i].children[0].src.slice(0, -12) + '.jpg")'
                    document.querySelector('.secondary-header').classList.add('show-off')
                }
                if (!cards[i].parentElement.parentElement.classList.contains("clicked-full")) {
                    cards[i].parentElement.parentElement.classList.add("clicked-full")
                    cards[i].style.height = "unset"
                    cards[i].children[0].style.minWidth = "100%"
                    cards[i].children[0].style.maxWidth = "100%"
                    console.log(cards[i].children[0].src)                    
                } else {
                    cards[i].parentElement.parentElement.classList.remove("clicked-full")
                    cards[i].children[0].style.minWidth = "unset"
                    window.history.back();
                    document.querySelector('.secondary-header').classList.remove('show-off')
                }
            } else {
                cards[i].parentElement.parentElement.classList.remove("clicked-full")
            }
        }
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
                                    >
                                        <img src={post.acf.image.sizes.medium} alt=""></img>
                                    </Link>
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
