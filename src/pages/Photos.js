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
            active: null,
        };
    }

    componentDidMount() {
        this.loadPosts()
    }

    loadPosts() {
        const dataPosts =
            'https://pat-cooney.com/wp/wp-json/pcd/v1/photos';

        fetch(dataPosts)
        .then(value => value.json())
        .then(value => {
            this.setState({
                isLoaded: true,
                posts: value, 
                allPosts: value,
            },
            error => {
                this.setState({
                    isLoaded: true,
                    error,
                });
            });
        });
    }

    lazyLoad() {
        var lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));
        if ('IntersectionObserver' in window) {
            let lazyImageObserver = new IntersectionObserver(function(
                entries,
                observer
            ) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        let lazyImage = entry.target;
                        lazyImage.src = lazyImage.dataset.src;
                        lazyImage.srcset = lazyImage.dataset.srcset;
                        lazyImage.classList.remove('lazy');
                        lazyImageObserver.unobserve(lazyImage);
                    }
                });
            });

            lazyImages.forEach(function(lazyImage) {
                lazyImageObserver.observe(lazyImage);
            });
        } else {
            // Possibly fall back to a more compatible method here
        }
    }

    handleCategories(category, e) {
        e.preventDefault();
        console.log(category);
        console.log(this.state);
        let categoryPosts = [];

        this.state.allPosts.map(post =>
            post.categories && post.categories.map(
                clickedCategory =>
                    category.title === clickedCategory.title &&
                    categoryPosts.push(post)
            )
        );
        this.setState({
            isLoaded: true,
            posts: categoryPosts,
        },
        error => {
            this.setState({
                isLoaded: true,
                error,
            });
        });
    }

    handleImage(e, image) {
        let card = document.querySelectorAll('.card');
        for (var i = 0; i < card.length; i++) {
            if (!e.target.parentElement.parentElement.parentElement.classList.contains('clicked-full')) {
                card[i].classList.remove('clicked-full');
            }
        }
        if (e.target.className !== "delete-trash") {
            image
            ?
                e.target.srcset = image.full
            :
                e.target.srcset = "https:via.placeholder.com/1200x800/" + e.target.src.substring(36)

            e.target.parentElement.parentElement.parentElement.classList.toggle('clicked-full');
            e.target.classList.toggle('image-full')
            e.target.parentElement.classList.toggle('image-big')
            //Put image title in secondary nav

            // for (var i = 0; i < cardLinks.length; i++) {
            //         showSecondaryNav++;
            //         secondaryNav.children[0].children[0].innerHTML =
            //             card.children[1].children[0].innerHTML;

            //         //Makes image full-width of the page
            //         if (!card.classList.contains('clicked-full')) {
            //             card.classList.add('clicked-full');
            //             cardLinks[i].style.height = 'unset';
            //             cardImage.style.maxWidth = '100%';
            //             cardImage.style.width = '100%';
            //             cardImage.style.height = '100%';
            //         } else {
            //             card.classList.remove('clicked-full');
            //             cardImage.style.minWidth = 'unset';
            //             cardImage.style.maxWidth = 'unset';
            //         }
            //     } else {
            //         card.classList.remove('clicked-full');
            //         // console.log(this);
            //     }
            //     if (showSecondaryNav) {
            //         secondaryNav.classList.add('show-secondary-nav');
            //     } else {
            //         secondaryNav.classList.remove('show-secondary-nav');
            //     }
            // }
        }
        this.setState(
            {
                isLoaded: true,
                active: image,
            },
            error => {
                this.setState({
                    isLoaded: true,
                    error,
                });
            }
        );
    }

    sortAlpha() {
        const sorted = this.state.posts.sort(function(a, b) {
            var textA = a.slug.toUpperCase();
            var textB = b.slug.toUpperCase();
            return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        this.setState({
            posts: sorted,
        })
    }

    sortNewest() {
        const sorted = this.state.posts.sort(function(a, b) {
            var textA = a.date;
            var textB = b.date;
            return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        this.setState({
            posts: sorted,
        })
    }

    postshit = (e) => {
        e.preventDefault();
        const newTitle = document.getElementById('new-post-title');
        const newColor = document.getElementById('new-post-image').value.slice(1,7);

        const categories = [
            document.getElementById('new-post-category--dogs'),
            document.getElementById('new-post-category--cats'),
            document.getElementById('new-post-category--landscape'),
            document.getElementById('new-post-category--people')
        ]

        let categoryArray = []
        // const fileName = 'poop'
        categories.map(category => 
            category.checked &&
                categoryArray.push(category.title)
        );
        // fetch('https://pat-cooney.com/wp/wp-json/wp/v2/media', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //         'Content-Disposition': 'attachment; filename=' + fileName,
        //         Authorization: 'Bearer ' + Cookies.get('wp-auth-token'),
        //     },
        //     body: JSON.stringify({
        //         file: fileName,
        //     }),
        // })
        //     .then(res => {
        //         if (res.status === 201) {
        //             this.hidePostModal();
        //             this.loadPosts();
        //         }
        //     })
        //     .catch(error => {
        //         console.error(error);
        //     });
        fetch('https://pat-cooney.com/wp/wp-json/wp/v2/photography', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + Cookies.get('wp-auth-token'),
            },
            body: JSON.stringify({
                title: newTitle.value,
                content: newColor,
                status: 'publish',
                // categories: categoryArray,         
            }),
        }).then((res) => {
            if (res.status === 201) {
                this.hidePostModal()
                this.loadPosts()
            }
        }).catch(error => {
            console.error(error);
        });

    }

    showPostModal(){
        document.getElementById('post-modal').style.display = 'block';
        document.getElementById('modal-bg').style.display = 'block';
    }

    hidePostModal() {
        document.getElementById('post-modal').style.display = 'none';
        document.getElementById('modal-bg').style.display = 'none';
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

    clickedHeart(e, user, slug) {
        let heartSVG;
        if (e.target.classList.contains('heart-svg')) {
            heartSVG = e.target
        } else if (e.target.parentElement.classList.contains('heart-svg')) {
            heartSVG = e.target.parentElement;
        }
            console.log(heartSVG);

            heartSVG.classList.toggle('not-liked');


        fetch(`https://pat-cooney.com/wp/wp-json/wp/v2/users/${user}`, {
            method: 'PUT',
            headers: {
                'Access-Control-Allow-Methods': 'PUT',
                'Access-Control-Request-Headers': 'X-Custom-Header',
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + Cookies.get('wp-auth-token'),
            },
            body: JSON.stringify({
                likes: slug,
            }),
        })
        .then(res => {
            console.log(res.status);
            if (res.status === 200) {
                this.loadPosts();
            }
        })
        .catch(error => {
            console.error(error);
        });




        // e.target.classList.contains('not-liked') &&
        //     e.target.classList.remove('not-liked');
        // e.target.parentElement.classList.contains('not-liked') &&
        //     e.target.parentElement.classList.remove('not-liked');
            // ?
            //     e.target.categoryName === 'svg' || e.target.categoryName === 'path'
            //         ? console.table("yes")
            //         : console.table(e.target.type)
            // :
            // console.log('otherthing');

        // e.target.classList.contains('not-liked')
        //     ? e.target.classList.remove('not-liked')
        //     : e.target.classList.add('not-liked');
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
            this.lazyLoad();
            let counter = 1;
            
            return (
                <div className="App">
                    {console.log(this.state)}
                    <div className="photo-title-flex">
                        <h1>Photos</h1>
                        {this.props.username && (
                            <button onClick={() => this.showPostModal()}>
                                +
                            </button>
                        )}
                    </div>
                    {this.props.username && (
                        <div>
                            <div id="post-modal">
                                <span
                                    onClick={() => {
                                        this.hidePostModal();
                                    }}
                                    className="close-modal">
                                    &times;
                                </span>
                                <form className="form" onSubmit={this.postshit}>
                                    <h2 id="modal-title">Add New Photo</h2>
                                    <label className="main-label">Title:</label>
                                    <input
                                        maxLength="24"
                                        id="new-post-title"
                                        className="username"
                                        type="text"
                                        name="title"
                                    />
                                    <label className="main-label">
                                        Background Color:
                                    </label>
                                    <input
                                        id="new-post-image"
                                        className="username"
                                        type="color"
                                        name="bg-color"
                                    />
                                    <div>
                                        <label className="main-label">
                                            Category:
                                        </label>
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
                                    <button type="submit">post shit</button>
                                </form>
                            </div>
                        </div>
                    )}
                    <button onClick={() => {this.sortAlpha()}}>Sort Alphabetically</button>
                    <button onClick={() => {this.sortNewest()}}>Sort By Date</button>
                    <div className="card-container">
                        {this.state.posts.map(post => (
                            <div key={post.slug} className="card">
                                <div className="card-imagebox">
                                    <Link
                                        to={`/photos/${post.slug}`}
                                        className="card-image-link"
                                        onClick={e =>
                                            this.handleImage(e, post.image)
                                        }>
                                        <img
                                            data-src={
                                                post.image
                                                    ? post.image.medium
                                                    : `https:via.placeholder.com/300x200/${post.color}/ffffff'`
                                            }
                                            data-srcset={
                                                post.image
                                                    ? post.image.medium
                                                    : `https:via.placeholder.com/300x200/${post.color}/ffffff'`
                                            }
                                            height="200"
                                            width="300"
                                            className="card-image lazy"
                                            alt={post.title
                                                .replace('#038;', '')
                                                .replace('&#8217;', "'")}></img>
                                        <div className="author-box">
                                            <div
                                                className="author-image"
                                                style={{
                                                    backgroundImage: `url(${
                                                        post.author
                                                            .custom_avatar
                                                            ? post.author
                                                                  .custom_avatar
                                                            : post.author.avatar
                                                    })`,
                                                }}></div>
                                            <p className="author">
                                                {post.author.title}
                                            </p>
                                            {post.author.slug ===
                                                Cookies.get('username') && (
                                                <button
                                                    className="delete-trash"
                                                    onClick={e =>
                                                        this.deleteshit(post.id)
                                                    }>
                                                    <svg
                                                        className="bi bi-trash"
                                                        width="24px"
                                                        height="24px"
                                                        viewBox="0 0 20 20"
                                                        fill="white"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.5 7.5A.5.5 0 018 8v6a.5.5 0 01-1 0V8a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V8a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V8z" />
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.5 5a1 1 0 01-1 1H15v9a2 2 0 01-2 2H7a2 2 0 01-2-2V6h-.5a1 1 0 01-1-1V4a1 1 0 011-1H8a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM6.118 6L6 6.059V15a1 1 0 001 1h6a1 1 0 001-1V6.059L13.882 6H6.118zM4.5 5V4h11v1h-11z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
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
                                                {post.title
                                                    .replace('#038;', '')
                                                    .replace('&#8217;', "'")}
                                            </h4>
                                            {/* {post.location && post.location.city && post.location.state_short ? (
                                                <p className="card-location">
                                                    {post.location.city},{' '}
                                                    {post.location.state_short}
                                                </p>
                                            ) 
                                            : 
                                            post.location && post.location.city && post.location.country && (
                                                <p className="card-location">
                                                    {post.location.city},{' '}
                                                    {post.location.country}
                                                </p>
                                            )} */}
                                            <p className="card-location">
                                                {post.location &&
                                                    post.location.city
                                                    ? 
                                                        `${post.location.city}, ${post.location && post.location.state_short && post.location.state_short}`
                                                    : post.location && post.location.state &&
                                                        `${post.location.state}, `
                                                }
                                                {post.location && post.location.country !== 'United States' &&
                                                    `${post.location.country}`}
                                            </p>
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
                                                        this.props.username,
                                                        post.slug
                                                    );
                                                }}
                                                htmlFor={`hrt-${post.slug}`}>
                                                {/* <svg
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10 4.748l-.717-.737C7.6 2.281 4.514 2.878 3.4 5.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.837-3.362.314-4.385-1.114-2.175-4.2-2.773-5.883-1.043L10 4.748zM10 17C-5.333 6.868 5.279-1.04 9.824 3.143c.06.055.119.112.176.171a3.12 3.12 0 01.176-.17C14.72-1.042 25.333 6.867 10 17z"
                                                            clipRule="evenodd"
                                                            />
                                                    </svg> */}

                                                <svg
                                                    width="18px"
                                                    height="18px"
                                                    className="heart-svg not-liked"
                                                    data-name="Layer 1"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 34 29.7">
                                                    <path
                                                        className="outline"
                                                        d="M21,35.85l-.6-.5C7.5,24.85,4,21.15,4,15.15a9,9,0,0,1,9-9c4.1,0,6.4,2.3,8,4.1,1.6-1.8,3.9-4.1,8-4.1a9,9,0,0,1,9,9c0,6-3.5,9.7-16.4,20.2ZM13,8.15a7,7,0,0,0-7,7c0,5.1,3.2,8.5,15,18.1,11.8-9.6,15-13,15-18.1a7,7,0,0,0-7-7c-3.5,0-5.4,2.1-6.9,3.8L21,13.25,19.9,12C18.4,10.25,16.5,8.15,13,8.15Z"
                                                        transform="translate(-4 -6.15)"
                                                    />
                                                    <path
                                                        className="fill"
                                                        d="M20.37,34.18C8.46,24.49,5,20.84,5,15.31a7.91,7.91,0,0,1,8-8c4,0,6.2,2.49,7.65,4.13l.35.42.34-.4C22.8,9.8,25,7.31,29,7.31a7.91,7.91,0,0,1,8,8c0,5.53-3.46,9.18-15.37,18.87l-.63.51Z"
                                                        transform="translate(-4 -6.15)"
                                                    />
                                                </svg>
                                            </label>
                                        </div>
                                    </div>
                                    <p className="card-categories">
                                        {post.categories
                                            ? post.categories.map(category => (
                                                  <Link
                                                      key={counter++}
                                                      className="card-category"
                                                      style={{
                                                          backgroundColor:
                                                              category.color,
                                                          borderTopColor:
                                                              category.color,
                                                      }}
                                                      to={`/photos/${category.slug}`}
                                                      onClick={e =>
                                                          this.handleCategories(
                                                              category,
                                                              e
                                                          )
                                                      }
                                                      data-tooltip={
                                                          category.title
                                                              .charAt(0)
                                                              .toUpperCase() +
                                                          category.title.slice(
                                                              1
                                                          )
                                                      }
                                                      aria-hidden="true">
                                                      {category.title
                                                          .slice(0, 1)
                                                          .toUpperCase()}
                                                  </Link>
                                              ))
                                            : ''}
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
