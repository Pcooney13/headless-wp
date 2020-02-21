//add onclick handler for categories
//click checks what category was clicked and runs through all posts for a match

//another handler for when image is clicekd changing it out from medium to large and zoom effect to look like a screen change

// Polish the transition from blurred image taking up screen to full size image
// Figure out the functionality for zomming from card specifically not just top left corner

//[LIKE] button that stores an array of usernames that likes the pic
import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

class Photos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            token: 'wp-token',
            count: 0,
        };
    }

    componentDidMount() {
        const dataPosts =
            'https://pat-cooney.com/wp/wp-json/wp/v2/photography?per_page=24&_embed';

        fetch(dataPosts).then(value => value.json())
            .then(value => {
            value.sort(function(a, b) {
                var textA = a.slug.toUpperCase();
                var textB = b.slug.toUpperCase();
                return textA < textB ? -1 : textA > textB ? 1 : 0;
            });
            this.setState(
                {
                    isLoaded: true,
                    posts: value,
                    allPosts: value,
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
        console.log(tag.id)
        // console.log(tag);
        const categorizedPosts = [];
        document
            .querySelector('.secondary-header')
            .classList.remove('show-secondary-nav');
        this.state.allPosts.forEach(function(post) {
            post.categories.forEach(function(categories) {
                // console.log(categories);
                if (categories === tag.id) {
                    console.log("match");
                    categorizedPosts.push(post);
                }
            });
            // console.log(post.categories)
        });
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
                console.log(this);
            }
            if (showSecondaryNav) {
                secondaryNav.classList.add('show-secondary-nav');
            } else {
                secondaryNav.classList.remove('show-secondary-nav');
            }
        }
    }

    postshit() {
        console.log(this.state);
        console.log(Cookies.get());
        let thePost = []
        // get post.token from above and paste into variable below
        fetch('https://pat-cooney.com/wp/wp-json/wp/v2/photography', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + Cookies.get('wp-auth-token'),
            },
            body: JSON.stringify({
                title: 'AA borem catsum',
                content: 'Lorem ipsum dolor sit amet.',
                status: 'publish',
            }),
        })
            .then(function(response) {
                return response.json();
            })
            .then(function(post) {
                console.log(post);
                thePost.push(post);
            });
            this.setState({
                allPosts: thePost[0],
            })
            console.log(this.state);
    }

    clickedHeart(e, user) {
        e.target.innerHTML === '♥️'
            ? (e.target.innerHTML = '♡')
            : (e.target.innerHTML = '♥️');
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
                    {console.log(this.state)}
                    
                        <button onClick={() => this.postshit()}>
                            post shit
                        </button>
                    
                    <div className="card-container">
                        {this.state.posts.map(post => (
                            <div key={post.slug} className="card">
                                <div className="card-imagebox">
                                    <Link
                                        to={`/photo/${post.slug}`}
                                        className="card-image-link"
                                        onClick={() =>
                                            this.handleImage(post.acf.image)
                                        }>
                                        <img
                                            src={
                                                post.acf.image
                                                    ? post.acf.image.sizes
                                                          .medium
                                                    : 'https:via.placeholder.com/300x350/126b4c/ffffff'
                                            }
                                            className="card-image"
                                            alt={post.title.rendered
                                                .replace('#038;', '')
                                                .replace('&#8217;', "'")}></img>
                                        <div className="author-box">
                                            <div
                                                className="author-image"
                                                style={{
                                                    backgroundImage: `url(${post._embedded.author[0]['avatar_urls']['24']})`,
                                                }}
                                                ></div>
                                            <p className="author">
                                                {post._embedded.author[0].name}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                                <div className="card-textbox">
                                    {/* {this.props.username ? <button onClick={() => "boobs"}>♡</button>: '' } */}
                                    <div className="card-titlebox">
                                        <div className="text-container">
                                            <h4 className="card-title">
                                                {post.title.rendered
                                                    .replace('#038;', '')
                                                    .replace('&#8217;', "'")}
                                            </h4>
                                        </div>
                                        {/* <input className="likes" type="checkbox" /> */}
                                        <div className="heart-box">
                                            <input
                                                id={`hrt-${post.slug}`}
                                                class="heart-input"
                                                type="checkbox"
                                            />
                                            <label
                                                onClick={e => {
                                                    this.clickedHeart(
                                                        e,
                                                        this.props.username
                                                    );
                                                }}
                                                htmlFor={`hrt-${post.slug}`}>
                                                ♡
                                            </label>
                                        </div>
                                    </div>
                                    <p className="card-categories">
                                        {post._embedded['wp:term'] ?
                                            post._embedded['wp:term'][0].map(tag => (
                                                <Link
                                                    key={counter++}
                                                    className="card-category"
                                                    style={{
                                                        backgroundColor: tag.acf.color,
                                                        borderTopColor: tag.acf.color,
                                                    }}
                                                    to={`/photos/${tag.slug}`}
                                                    onClick={() =>
                                                        this.handleCategories(tag)
                                                    }
                                                    data-tooltip={
                                                        tag.name
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                        tag.name.slice(1)
                                                    }
                                                    aria-hidden="true"
                                                >
                                                    {tag.name
                                                        .slice(0, 1)
                                                        .toUpperCase()}
                                                </Link>
                                        ))
                                        :
                                        <p></p>
                                    }
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
