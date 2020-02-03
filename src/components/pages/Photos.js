//add onclick handler for categories
//click checks what category was clicked and runs through all posts for a match

//another handler for when image is clicekd changing it out from medium to large and zoom effect to look like a screen change

// Polish the transition from blurred image taking up screen to full size image
// Figure out the functionality for zomming from card specifically not just top left corner

import React from 'react';
import { Link } from 'react-router-dom';

fetch('https://pat-cooney.com/wp/wp-json/jwt-auth/v1/token', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    body: JSON.stringify({
        username: 'username', //change
        password: 'password', //change
    }),
})
    .then(function(response) {
        return response.json();
    })
    .then(function(post) {
        console.log(post.token); //token response
    });

// get post.token from above and paste into variable below
// var token = post.token;
// fetch('https://pat-cooney.com/wp/wp-json/wp/v2/posts', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//         Authorization: 'Bearer ' + token,
//     },
//     body: JSON.stringify({
//         title: 'Lorem catsum',
//         content: 'Lorem ipsum dolor sit amet.',
//         status: 'draft',
//     }),
// })
// .then(function(response) {
//     return response.json();
// })
// .then(function(post) {
//     console.log(post);
// });

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
        document.querySelector('.secondary-header').classList.remove('show-secondary-nav');
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
            
            let cardLinks = document.getElementsByClassName('card-image-link');
            let showSecondaryNav = 0;
            let secondaryNav = document.querySelector('.secondary-header');
            
            for (var i = 0; i < cardLinks.length; i++) {
                let card = cardLinks[i].parentElement.parentElement;
                let cardImage = cardLinks[i].children[0];
                //finds card that matchs url
                if (
                    image.sizes.medium === cardLinks[i].children[0].src ||
                    image.url === cardLinks[i].children[0].src
                ) {
                    //Put image title in secondary nav
                    showSecondaryNav++;
                    secondaryNav.children[0].children[0].innerHTML =
                        card.children[1].children[0].innerHTML;

                    //changes image src to full-rez
                    if (cardImage.src === image.sizes.medium) {
                        cardImage.src = image.url;
                    }
                    //Makes image full-width of the page
                    if (!card.classList.contains('clicked-full')) {
                        card.classList.add('clicked-full');
                        cardLinks[i].style.height = 'unset';
                        cardImage.style.maxWidth = '100%';
                        cardImage.style.width = '100%';
                        cardImage.style.height = '100%';
                    } else {
                        card.classList.remove('clicked-full');
                        cardImage.style.minWidth = 'unset';
                        cardImage.style.maxWidth = 'unset';
                    }
                } else {
                    card.classList.remove('clicked-full');
                    console.log(this)
                }
                if (showSecondaryNav) {
                    secondaryNav.classList.add('show-secondary-nav')
                } else {
                    secondaryNav.classList.remove('show-secondary-nav')
                }
            }
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
            window.scrollTo(0, 0);
            let counter = 1;        
            return (
                <div className="App">
                    <h1>Photos</h1>
                    <div className="card-container">
                        {this.state.posts.map(post => (
                            <div key={post.slug} className="card">
                                <div className="card-imagebox">
                                    <Link
                                        to={`/photo/${post.slug}`}
                                        className="card-image-link"
                                        onClick={() =>
                                            this.handleImage(
                                                post.acf.image
                                            )
                                        }>
                                        <img
                                            src={post.acf.image.sizes.medium}
                                            className="card-image"
                                            alt={post.title.rendered
                                                .replace('#038;', '')
                                                .replace('&#8217;', "'")}></img>
                                    </Link>
                                </div>
                                <div className="card-textbox">
                                    <h4 className="card-title">
                                        {post.title.rendered
                                            .replace('#038;', '')
                                            .replace('&#8217;', "'")}
                                    </h4>
                                    <p className="card-categories">
                                        {post.category.map(tag => (
                                            <Link
                                                key={counter++}
                                                className="card-category"
                                                style={{
                                                    backgroundColor: tag[1],
                                                    borderTopColor: tag[1],
                                                }}
                                                to={`/photos/${tag[0]}`}
                                                onClick={() =>
                                                    this.handleCategories(tag)
                                                }
                                                data-tooltip={
                                                    tag[0]
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                    tag[0].slice(1)
                                                }
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
