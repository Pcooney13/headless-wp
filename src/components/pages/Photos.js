//Lazy loading

//another handler for when image is clicekd changing it out from medium to large and zoom effect to look like a screen change

// Polish the transition from blurred image taking up screen to full size image
// Figure out the functionality for zomming from card specifically not just top left corner

//[LIKE] button that stores an array of usernames that likes the pic
import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import LazyLoad from 'react-lazyload';


const Loading = () => (
    <div>
        <h5>Loading...</h5>
    </div>
)

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
        this.loadPosts()
    }

    loadPosts() {
        const dataPosts =
            'https://pat-cooney.com/wp/wp-json/wp/v2/photography?per_page=50&_embed';

        fetch(dataPosts)
            .then(value => value.json())
            .then(value => {
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
        let categoryPosts = [];

        this.state.allPosts.map(post =>
            post.categories.map(
                category =>
                    //match post category to clicked category
                    category === tag.id && categoryPosts.push(post)
            )
        );
        this.setState(
            {
                isLoaded: true,
                posts: categoryPosts,
            },
            error => {
                this.setState({
                    isLoaded: true,
                    error,
                });
            }
        );
    }

    handleImage(e, image) {
        console.log(e.target);
        if (e.target.className !== "delete-trash") {
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
    }

    postshit() {
        const newTitle = document.getElementById('new-post-title');
        const newColor = document.getElementById('new-post-image');

        const categories = [
            document.getElementById('new-post-category--dogs'),
            document.getElementById('new-post-category--cats'),
            document.getElementById('new-post-category--landscape'),
            document.getElementById('new-post-category--people')
        ]

        console.log(categories);

        let categoryArray = []

        categories.map(category => 
            category.checked &&
                categoryArray.push(category.name)
        );

        console.log(categoryArray);

        fetch('https://pat-cooney.com/wp/wp-json/wp/v2/photography', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + Cookies.get('wp-auth-token'),
            },
            body: JSON.stringify({
                title: newTitle.value,
                content: 'Lorem ipsum dolor sit amet.',
                status: 'publish',
                categories: categoryArray,
                acf: {
                    image: {
                        sizes: {
                            medium:`https:via.placeholder.com/300x350/${newColor.value}/ffffff`,
                        }
                    }
                },                
            }),
        }).then((res) => {
            if (res.status === 201) {
                this.loadPosts()
            }
        }).catch(error => {
            console.error(error);
        });

    }

    deleteshit(image) {
        fetch(
            `https://pat-cooney.com/wp/wp-json/wp/v2/photography/${image}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + Cookies.get('wp-auth-token'),
                },
            }
        ).then((res) => {
            if (res.status === 200) {
                this.loadPosts()
            }
        })
        .catch(error => {
            console.error(error);
        });
        
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

                    {this.props.username && (
                        <div>
                            <div className="form">
                                <label className="main-label">Title:</label>
                                <input
                                    id="new-post-title"
                                    className="username"
                                    type="text"
                                    name="title"
                                />
                                <label className="main-label">Background Color:</label>
                                <input
                                    id="new-post-image"
                                    className="username"
                                    type="text"
                                    name="bg-color"
                                />
                                <div>
                                    <label className="main-label">Category:</label>
                                    
                                    <input
                                        id="new-post-category--dogs"
                                        className="new-post-category"
                                        type="checkbox"
                                        name="2"
                                    />
                                    <label>Dogs</label>
                                    <input
                                        id="new-post-category--cats"
                                        className="new-post-category"
                                        type="checkbox"
                                        name="5"
                                    />
                                    <label>Cats</label>
                                    <input
                                        id="new-post-category--landscape"
                                        className="new-post-category"
                                        type="checkbox"
                                        name="4"
                                    />
                                    <label>Landscape</label>
                                    <input
                                        id="new-post-category--people"
                                        className="new-post-category"
                                        type="checkbox"
                                        name="3"
                                    />
                                    <label>People</label>
                                </div>

                            </div>
                            <button onClick={() => this.postshit()}>
                                post shit
                            </button>
                        </div>
                    )}
                    {console.log(this.state.posts)}

                    <div className="card-container">
                        {this.state.posts.map(post => (
                            <LazyLoad key={post.slug} placeholder={<Loading />}>
                                <div key={post.slug} className="card">
                                    <div className="card-imagebox">
                                        <Link
                                            to={`/photo/${post.slug}`}
                                            className="card-image-link"
                                            onClick={(e) =>
                                                this.handleImage(e, post.acf.image)
                                            }
                                            >
                                            <img
                                                src={
                                                    post.acf.image
                                                        ? post.acf.image.sizes.medium
                                                        : 'https:via.placeholder.com/300x350/9aaca0/ffffff'
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
                                                    }}></div>
                                                <p className="author">
                                                    {post._embedded.author[0].name}
                                                </p>
                                                {post._embedded.author[0].slug ===
                                                    Cookies.get('username') && (
                                                    <button
                                                        className="delete-trash"
                                                        onClick={(e) =>
                                                            this.deleteshit(post.id)
                                                        }>
                                                        &#128465;
                                                    </button>
                                                )}
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
                                                    className="heart-input"
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
                                            {post._embedded['wp:term']
                                                ? post._embedded['wp:term'][0].map(
                                                    tag => (
                                                        <Link
                                                            key={counter++}
                                                            className="card-category"
                                                            style={{
                                                                backgroundColor:
                                                                    tag.acf.color,
                                                                borderTopColor:
                                                                    tag.acf.color,
                                                            }}
                                                            to={`/photos/${tag.slug}`}
                                                            onClick={() =>
                                                                this.handleCategories(
                                                                    tag
                                                                )
                                                            }
                                                            data-tooltip={
                                                                tag.name
                                                                    .charAt(0)
                                                                    .toUpperCase() +
                                                                tag.name.slice(1)
                                                            }
                                                            aria-hidden="true">
                                                            {tag.name
                                                                .slice(0, 1)
                                                                .toUpperCase()}
                                                        </Link>
                                                    )
                                                )
                                                : ''}
                                        </p>
                                    </div>
                                </div>
                            </LazyLoad>
                        ))}
                    </div>
                </div>
            );
        }
    }
}

export default Photos;
