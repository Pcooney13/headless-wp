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
        // this.setState({
        //     isLoaded: true,
        //     posts: 0,
        //     allPosts: 0,
        // });
    }

    loadPosts() {
        const dataPosts =
            'https://pat-cooney.com/wp/wp-json/pcd/v1/photos';

        let splitURL = window.location.pathname.split('/');
        let pathnameURL = splitURL[splitURL.length - 1];
        console.log(pathnameURL);

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
            }).then(() =>
                this.state.posts.forEach(post => post.slug === pathnameURL && this.setState({
                    active: post,
                },
                    error => {
                        this.setState({
                            isLoaded: true,
                            error,
                        });
                    }))
            );
    }

    activeImage(post, e) {
        console.log(e.target.tagName);
        // e.preventDefault();
        this.state.active === post
            ?
            this.setState({
                active: null,
            },
                error => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                }
            )
            :
            this.setState({
                active: post,
            },
                error => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                }
            )
            ;
    }

    lazyLoad() {
        var lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));
        if ('IntersectionObserver' in window) {
            let lazyImageObserver = new IntersectionObserver(function (
                entries,
                observer
            ) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        let lazyImage = entry.target;
                        lazyImage.src = lazyImage.dataset.src;
                        lazyImage.srcset = lazyImage.dataset.srcset;
                        lazyImage.classList.remove('lazy');
                        lazyImageObserver.unobserve(lazyImage);
                    }
                });
            });

            lazyImages.forEach(function (lazyImage) {
                lazyImageObserver.observe(lazyImage);
            });
        } else {
            // Possibly fall back to a more compatible method here
        }
    }

    handleCategories(category, e) {
        // e.preventDefault();
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

    sortAlpha() {
        const sorted = this.state.posts.sort(function (a, b) {
            var textA = a.slug.toUpperCase();
            var textB = b.slug.toUpperCase();
            return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        this.setState({
            posts: sorted,
        })
    }

    sortNewest() {
        const sorted = this.state.posts.sort(function (a, b) {

            var textA = a.orderdate;
            var textB = b.orderdate;

            return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        this.setState({
            posts: sorted.reverse(),
        })
    }

    postshit2 = (e) => {
        e.preventDefault()
        console.log(this)
        const mediaEndpoint = "https://pat-cooney.com/wp/wp-json/wp/v2/media";
        const form = document.getElementById("postshit");
        const profilePicInput = document.getElementById("main_image");
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            const formData = new FormData();
            formData.append("file", profilePicInput.files[0]);
            formData.append("title", "Hello World!");
            formData.append("caption", "Have a wonderful day!");
            console.log(profilePicInput.files[0])
            console.log(formData)
            //display spinner
            //send image to media library
            fetch(mediaEndpoint, {
                method: "POST",
                headers: {
                    //when using FormData(), the 'Content-Type' will automatically be set to 'form/multipart'
                    //so there's no need to set it here
                    Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcGF0LWNvb25leS5jb21cL3dwIiwiaWF0IjoxNTkzODk0MTI0LCJuYmYiOjE1OTM4OTQxMjQsImV4cCI6MTU5NDQ5ODkyNCwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.fChxSR2nFeC-0jZ5r62BTr22jgn4FTazObaKMwqrzJU'
                },
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    const input = {
                        profile_image: data.source_url
                    }
                    //send image url to backend
                    console.log(input)
                    fetch('https://pat-cooney.com/wp/wp-json/wp/v2/photography', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                            Authorization: 'Bearer ' + Cookies.get('wp-auth-token'),
                        },
                        body: JSON.stringify({
                            title: "newTitle.value",
                            'acf.image': input.profile_image,
                            status: 'publish',
                            // categories: categoryArray,         
                        }),
                    }).then((res) => {
                        if (res.status === 201) {
                            // this.hidePostModal()
                            console.log(this);
                            console.log(this.state);
                            console.log(window);
                            console.log(window.state);
                            // window.this.loadPosts()
                        }
                    }).catch(error => {
                        console.error(error);
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        });
    }
    //BLOCKED BY CORS - Request header field content-disposition is not allowed by Access-Control-Allow-Headers in preflight response.
    postshit = (e) => {
        e.preventDefault();
        console.log(e)
        console.log(this)
        const newTitle = document.getElementById('new-post-title');
        const newColor = document.getElementById('new-post-color').value.slice(1, 7);
        // const newImage = document.getElementById('new-post-image');
        const newPost = document.getElementById('postshit');

        var data = new FormData(newPost);
        
        console.log([...data.keys()].length);
        console.log([...data.keys()]);
        console.log([...data][2][1]);

        const categories = [
            document.getElementById('new-post-category--dogs'),
            document.getElementById('new-post-category--cats'),
            document.getElementById('new-post-category--landscape'),
            document.getElementById('new-post-category--people')
        ]

        let categoryArray = []
        categories.map(category =>
            category.checked &&
            categoryArray.push(category.title)
        );

        // var formdata = new FormData(newImage);
        // console.log(formdata);
        fetch('https://pat-cooney.com/wp/wp-json/wp/v2/media', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + Cookies.get('wp-auth-token'),
                'Content-Type': 'image/jpeg',
                Accept: 'application/json',
                // 'Content-Disposition': newImage.name,
                'Content-Disposition': 'form-data; filename=' + [...data][2][1].name,
            },
            body: [...data][2][1],
        })
            // .then(res => {
            //     if (res.status === 201) {
            //         this.hidePostModal();
            //         this.loadPosts();
            //     }
            // })
            .catch(error => {
                console.error(error);
            }).then(
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
        })).then((res) => {
            if (res.status === 201) {
                this.hidePostModal()
                this.loadPosts()
            }
        }).catch(error => {
            console.error(error);
        });

    }

    showPostModal() {
        document.getElementById('post-modal').style.display = 'block';
        document.getElementById('modal-bg').style.display = 'block';
    }

    hidePostModal() {
        document.getElementById('post-modal').style.display = 'none';
        document.getElementById('modal-bg').style.display = 'none';
    }

    deleteshit(image, e) {
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

    findMatches(photos, wordToMatch) {
        if (photos.length > 0) {
            return photos.filter(pokemon => {
                const regex = new RegExp(wordToMatch, 'gi');
                return pokemon.title.match(regex)
            });
        }
    }

    filterDrawer() {
        const drawer = document.getElementById('filter-drawer')
        const filterSVGBlur = document.getElementById('filter-path-1')
        const filterSVG = document.getElementById('filter-path-2')
        drawer.classList.toggle('drawer-open')
        if (drawer.classList.contains('drawer-open')) {
            filterSVGBlur.classList.toggle('svg-blur')
            filterSVGBlur.setAttribute("fill", "#4b957b")
            filterSVG.setAttribute("fill", "#4b957b")
        } else {
            filterSVGBlur.setAttribute("fill", "#484848")
            filterSVG.setAttribute("fill", "#484848")
        }
    }

    displayMatches(value, e) {
        const searchMatch = this.findMatches(value, e.target.value)
        let cards = document.querySelectorAll('.card')
        let searchPosts = []
        //First remove No Match if it is already on screen
        if (document.querySelector('.no-match')) document.querySelector('.no-match').remove()
        //Brings all cards back if user inputs text then deletes
        if (!e.target.value) {
            for (var n = 0; n < cards.length; n++) {
                cards[n].classList.remove('hide')
            }
        }
        //Display cards whose title matches the search input text
        else if (searchMatch && searchMatch.length >= 1 && e.target.value) {
            for (var i = 0; i < searchMatch.length; i++) {
                for (var k = 0; k < cards.length; k++) {
                    cards[k].classList.add('hide')
                    if (cards[k].classList.contains(searchMatch[i].slug)) {
                        searchPosts.push(cards[k])
                        cards[k].classList.remove('hide')
                    } else {
                        cards[k].classList.add('hide')
                    }
                }
            }
            for (var m = 0; m < searchPosts.length; m++) {
                searchPosts[m].classList.remove('hide')
            }
        //Display no matches text
        } else {
            searchPosts = null;
            for (var a = 0; a < cards.length; a++) {
                cards[a].classList.add('hide')
            }
            //need to fix this up a wee bit
            var para = document.createElement("p")
            para.classList.add('no-match')
            var node = document.createTextNode("No Matches Found")
            para.appendChild(node)
            document.querySelector('.card-container').appendChild(para)
        }
    }

    render() {
        const { error, isLoaded } = this.state;
        if (error) {
            return <div>Error: { error.message }</div>;
        } else if (!isLoaded) {
            return (
                <div className="App">
                {console.log(Cookies.get('wp-auth-token'))}
                    <h1>Photos</h1>
                    <div className="filter-bar">
                        <button className="filter-button has-children">Sort Alphabetically</button>
                        <button className="filter-button has-children">Sort By Date</button>
                        <Link className="filter-button" to="/map">View Map</Link>
                        <form className="search">
                            <input className="search__input" value={ this.state.value } autoComplete="off" onChange={ (e) => this.displayMatches(this.state.posts, e) } type="text" placeholder="Search..." name="search" />
                            <input style={ { position: "absolute", left: "-9999px" } } type="submit" />
                            <div className="search__results" style={ { display: "none" } }>
                                <ul className="suggestions">
                                    <li>Filter by Name</li>
                                    <li>and by Number</li>
                                </ul>
                            </div>
                        </form>
                    </div>
                    <div className="card-container">
                        <p>Loading</p>
                    </div>
                </div>
            );
        } else {

            window.scrollTo(0, 0);
            this.lazyLoad();
            let counter = 1;

            return (
                <div className="App">
                    { console.log(this.state) }
                    <div className="photo-title-flex">
                        <h1>Photos</h1>
                        { this.props.username && (
                            <button onClick={ () => this.showPostModal() }>
                                +
                            </button>
                        ) }
                    </div>
                    { this.props.username && (
                        <div>
                            <div id="post-modal">
                                <span
                                    onClick={ () => {
                                        this.hidePostModal();
                                    } }
                                    className="close-modal">
                                    &times;
                                </span>
                                <form id="postshit" className="form" encType="multipart/form-data" onSubmit={ this.postshit2 }>
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
                                        id="new-post-color"
                                        className="username"
                                        type="color"
                                        name="bg-color"
                                    />
                                    <label className="main-label">
                                        Image:
                                    </label>
                                    <input 
                                        type="file" 
                                        className="username"
                                        id="main_image" 
                                        multiple={false} 
                                        accept=".png, .jpg, .jpeg, .gif" 
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
                                    <button id="upload-post" type="submit">post shit</button>
                                </form>
                            </div>
                        </div>
                    ) }
                    <div className="filter-bars">
                    <div className="filter-bar">
                        <button id="filter-click" onClick={() => this.filterDrawer()}>
                                <svg id="filter-svg-blur" version="1.1" width="1.5em" height="1.5em" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 980 982">
                                <path id="filter-path-1" fill="#484848" d="M980,103.96c-0.85,4.04-1.54,8.11-2.56,12.11c-5.53,21.71-16.71,40.45-32.53,55.88
	                            c-37.69,36.77-240.93,227.38-304.21,286.58c-1.84,1.73-2.98,5.13-3,7.76c-0.38,83.16-1.94,274.45-2.24,286.94
	                            c-0.12,5.26-2.41,9.13-5.98,12.67c-22.85,22.63-221.61,211.86-232.59,213.57c-16.42,2.55-31.21-0.53-43.63-11.99
	                            c-6.61-6.1-6.79-14.76-7.12-22.77c-1.18-28.96-3.95-346.91-4.44-476.9c-0.02-5.14-1.62-8.53-5.33-11.99
	                            c-92.5-86.27-184.9-172.65-277.28-259.05c-14.74-13.78-29.13-27.9-40.28-44.92c-9.34-14.26-15.97-29.53-18-46.61
	                            c-0.09-0.78-0.54-1.52-0.82-2.28c0-6.67,0-13.33,0-20c0.28-0.93,0.7-1.84,0.81-2.79c2.98-26.11,16.92-45.14,38.66-58.76
	                            C55.09,11.63,71.64,3.38,90.51,2.93C139.82,1.76,789.76,1.39,877.92,2c16.12,0.11,31.39,3.37,45.98,9.97
	                            c26.47,11.98,45.98,30.33,53.59,59.36c1.01,3.83,1.68,7.76,2.51,11.64C980,89.96,980,96.96,980,103.96z M876.38,100.58
	                            c-0.36-0.54-0.72-1.08-1.08-1.62c-1.8,0-3.6,0.02-5.39,0c-15.33-0.18-30.66-0.47-45.98-0.53c-102.81-0.4-492.73-1.31-584.88-1.23
	                            c-41.66,0.03-83.31,0.44-124.97,0.82c-3.59,0.03-7.18,1.15-10.76,1.76c-0.14,0.64-0.29,1.29-0.43,1.93
	                            c4.92,5.11,9.68,10.39,14.79,15.29c44.9,42.98,89.95,85.79,134.78,128.84c57.44,55.17,114.67,110.56,172.15,165.69
	                            c5.28,5.06,7.33,10.69,7.47,17.66c0.54,26.65,1.59,53.3,1.8,79.95c0.81,100.81,1.36,201.62,2.03,302.44
	                            c0.01,1.54,0.18,3.08,0.32,5.27c1.62-1.44,2.63-2.28,3.58-3.19c33.46-32.03,66.87-64.12,100.44-96.04c3.53-3.35,5.02-6.7,5.01-11.63
	                            c-0.14-68.99-0.12-137.98,0.01-206.96c0.04-19.99,0.72-39.99,0.78-59.98c0.04-12.06,2.79-22.68,12.83-30.45
	                            c1.96-1.52,3.48-3.58,5.28-5.32c61.85-59.48,123.7-118.96,185.57-178.42c39.77-38.21,79.61-76.36,119.31-114.63
	                            C871.92,107.44,873.96,103.81,876.38,100.58z"/>
                            </svg>
                            <svg id="filter-svg" version="1.1" width="1.5em" height="1.5em" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 980 982">
                                <path id="filter-path-2" fill="#484848" d="M980,103.96c-0.85,4.04-1.54,8.11-2.56,12.11c-5.53,21.71-16.71,40.45-32.53,55.88
	                            c-37.69,36.77-240.93,227.38-304.21,286.58c-1.84,1.73-2.98,5.13-3,7.76c-0.38,83.16-1.94,274.45-2.24,286.94
	                            c-0.12,5.26-2.41,9.13-5.98,12.67c-22.85,22.63-221.61,211.86-232.59,213.57c-16.42,2.55-31.21-0.53-43.63-11.99
	                            c-6.61-6.1-6.79-14.76-7.12-22.77c-1.18-28.96-3.95-346.91-4.44-476.9c-0.02-5.14-1.62-8.53-5.33-11.99
	                            c-92.5-86.27-184.9-172.65-277.28-259.05c-14.74-13.78-29.13-27.9-40.28-44.92c-9.34-14.26-15.97-29.53-18-46.61
	                            c-0.09-0.78-0.54-1.52-0.82-2.28c0-6.67,0-13.33,0-20c0.28-0.93,0.7-1.84,0.81-2.79c2.98-26.11,16.92-45.14,38.66-58.76
	                            C55.09,11.63,71.64,3.38,90.51,2.93C139.82,1.76,789.76,1.39,877.92,2c16.12,0.11,31.39,3.37,45.98,9.97
	                            c26.47,11.98,45.98,30.33,53.59,59.36c1.01,3.83,1.68,7.76,2.51,11.64C980,89.96,980,96.96,980,103.96z M876.38,100.58
	                            c-0.36-0.54-0.72-1.08-1.08-1.62c-1.8,0-3.6,0.02-5.39,0c-15.33-0.18-30.66-0.47-45.98-0.53c-102.81-0.4-492.73-1.31-584.88-1.23
	                            c-41.66,0.03-83.31,0.44-124.97,0.82c-3.59,0.03-7.18,1.15-10.76,1.76c-0.14,0.64-0.29,1.29-0.43,1.93
	                            c4.92,5.11,9.68,10.39,14.79,15.29c44.9,42.98,89.95,85.79,134.78,128.84c57.44,55.17,114.67,110.56,172.15,165.69
	                            c5.28,5.06,7.33,10.69,7.47,17.66c0.54,26.65,1.59,53.3,1.8,79.95c0.81,100.81,1.36,201.62,2.03,302.44
	                            c0.01,1.54,0.18,3.08,0.32,5.27c1.62-1.44,2.63-2.28,3.58-3.19c33.46-32.03,66.87-64.12,100.44-96.04c3.53-3.35,5.02-6.7,5.01-11.63
	                            c-0.14-68.99-0.12-137.98,0.01-206.96c0.04-19.99,0.72-39.99,0.78-59.98c0.04-12.06,2.79-22.68,12.83-30.45
	                            c1.96-1.52,3.48-3.58,5.28-5.32c61.85-59.48,123.7-118.96,185.57-178.42c39.77-38.21,79.61-76.36,119.31-114.63
	                            C871.92,107.44,873.96,103.81,876.38,100.58z"/>
                            </svg>
                        </button>
                        <p style={{marginLeft: "5px"}}>Filters</p>
                        <form className="search">
                            <input className="search__input" value={this.state.value} autoComplete="off" onChange={(e) => this.displayMatches(this.state.posts, e)} type="text" placeholder="Search..." name="search" />
                            <input style={{ position: "absolute", left: "-9999px" }} type="submit" />
                            <div className="search__results" style={{ display: "none" }}>
                                <ul className="suggestions">
                                    <li>Filter by Name</li>
                                    <li>and by Number</li>
                                </ul>
                            </div>
                        </form>
                    </div>
                    <div id="filter-drawer" className="filter-drawer">
                        <button className="filter-button has-children" onClick={() => { this.sortAlpha() }}>Sort Alphabetically</button>
                        <button className="filter-button has-children" onClick={() => { this.sortNewest() }}>Sort By Date</button>
                        <Link className="filter-button" to="/map">View Map</Link>  
                    </div>
                    </div>

                    <div className="card-container">
                        { this.state.posts === 0 ? <p>No matches</p> :
                            this.state.posts.map(post => (
                                <div key={ post.slug } className={ `card ${post.slug} ${this.state.active === post && 'clicked-full'}` }>
                                    <div className="card-imagebox">
                                        <Link
                                            to={ `${this.state.active === post ? '/photos' : '/photos/' + post.slug}` }
                                            className={ `card-image-link ${this.state.active === post && 'image-big'}` }
                                            onClick={ e =>
                                                this.activeImage(post, e)
                                            }
                                        >
                                            <img
                                                data-src={
                                                    this.state.active === post
                                                        ? post.image.full
                                                        : post.image
                                                            ? post.image.medium
                                                            : `https:via.placeholder.com/300x200/${post.color}/ffffff'`
                                                }
                                                data-srcset={
                                                    this.state.active === post
                                                        ? post.image.full
                                                        : post.image
                                                            ? post.image.medium
                                                            : `https:via.placeholder.com/300x200/${post.color}/ffffff'`
                                                }
                                                height="200"
                                                width="300"
                                                className={ `card-image lazy ${this.state.active === post && 'clicked-full'}` }
                                                alt={ post.title
                                                    .replace('#038;', '')
                                                    .replace('&#8217;', "'") }></img>
                                            <div className="author-box">
                                                <div
                                                    className="author-image"
                                                    style={ {
                                                        backgroundImage: `url(${
                                                            post.author
                                                                .custom_avatar
                                                                ? post.author
                                                                    .custom_avatar
                                                                : post.author.avatar
                                                            })`,
                                                    } }></div>
                                                <p className="author">
                                                    { post.author.title }
                                                </p>
                                                { post.author.slug === Cookies.get('username') && (
                                                    <Link
                                                        to="/photos"
                                                        className="delete-trash"
                                                        onClick={ e =>
                                                            this.deleteshit(post.id, e)
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
                                                    </Link>
                                                ) }
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="card-textbox">
                                        {/* {this.props.username ? <button onClick={() => "boobs"}>♡</button>: '' } */ }
                                        <div className="card-titlebox">
                                            <div className="text-container">
                                                <h4 className="card-title">
                                                    { post.title
                                                        .replace('#038;', '')
                                                        .replace('&#8217;', "'") }
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
                                                    { post.location &&
                                                        post.location.city
                                                        ?
                                                        `${post.location.city}, ${post.location && post.location.state_short && post.location.state_short}`
                                                        : post.location && post.location.state &&
                                                        `${post.location.state}, `
                                                    }
                                                    { post.location && post.location.country !== 'United States' &&
                                                        `${post.location.country}` }
                                                </p>
                                            </div>
                                            {/* <input className="likes" type="checkbox" /> */ }
                                            <div className="heart-box">
                                                <input
                                                    id={ `hrt-${post.slug}` }
                                                    className="heart-input"
                                                    type="checkbox"
                                                />
                                                <label
                                                    onClick={ e => {
                                                        this.clickedHeart(
                                                            e,
                                                            this.props.username,
                                                            post.slug
                                                        );
                                                    } }
                                                    htmlFor={ `hrt-${post.slug}` }>
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
                                            { post.categories
                                                ? post.categories.map(category => (
                                                    <Link
                                                        key={ counter++ }
                                                        className="card-category"
                                                        style={ {
                                                            backgroundColor:
                                                                category.color,
                                                            borderTopColor:
                                                                category.color,
                                                        } }
                                                        to={ `/photos/${category.slug}` }
                                                        onClick={ e =>
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
                                                        { category.title
                                                            .slice(0, 1)
                                                            .toUpperCase() }
                                                    </Link>
                                                ))
                                                : '' }
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            );
        }
    }
}

export default Photos;
