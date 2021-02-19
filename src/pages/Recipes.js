// Polish the transition from blurred image taking up screen to full size image
// Figure out the functionality for zomming from card specifically not just top left corner

//[LIKE] button that stores an array of usernames that likes the pic
import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

class Recipes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            token: 'wp-token',
            count: 0,
            active: null,
        };
        this.postshit = this.postshit.bind(this)
    }

    componentDidMount() {
        this.loadPosts()
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

    loadPosts() {
        const dataPosts =
            // 'https://pat-cooney.com/wp-json/wp/v2/recipes?per_page=100';
            'https://pat-cooney.com/wp-json/v1/recipes?per_page=100';

        let splitURL = window.location.pathname.split('/');
        let pathnameURL = splitURL[splitURL.length - 1];

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
            document.querySelector('main').appendChild(para)
        }
    }

    postshit = (e) => {
        e.preventDefault()
        // console.log(this)

        const inputDogs = document.getElementById('new-post-category--dogs')
        const inputCats = document.getElementById('new-post-category--cats')
        const inputLandscape = document.getElementById('new-post-category--landscape')
        const inputPeople = document.getElementById('new-post-category--people')
        let categoryArray = []

        if(inputDogs.checked === true) {
            categoryArray.push(inputDogs.name)
        }
        if (inputCats.checked === true) {
            categoryArray.push(inputCats.name)
        }
        if (inputLandscape.checked === true) {
            categoryArray.push(inputLandscape.name)
        }
        if (inputPeople.checked === true) {
            categoryArray.push(inputPeople.name)
        }

        const mediaEndpoint = "https://pat-cooney.com/wp/wp-json/wp/v2/media";
        const postTitle = document.getElementById("new-post-title").value;
        const profilePicInput = document.getElementById("main_image");

        // console.log(postTitle)

        const formData = new FormData();
        formData.append("file", profilePicInput.files[0]);
        formData.append("title", postTitle);
        // console.log(profilePicInput.files[0])


        //send image to media library
        fetch(mediaEndpoint, {
            method: "POST",
            headers: {
                //when using FormData(), the 'Content-Type' will automatically be set to 'form/multipart'
                //so there's no need to set it here
                Authorization: 'Bearer ' + Cookies.get('wp-auth-token'),
            },
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                const input = {
                    id: data.id,
                    post_image: data.source_url,
                    title: postTitle,
                    data: data,
                }
                //send image url to backend
                if (input) {
                    this.createPost(input, categoryArray)
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    createPost(input, categoryArray) {
        console.log(input)

        const uploadedImage = `https://pat-cooney.com/wp/wp-json/wp/v2/media/${input.id}`

        fetch(uploadedImage)
            .then(value => value.json())
            .then(data => {
                console.log(data)
                return fetch('https://pat-cooney.com/wp/wp-json/wp/v2/photography', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: 'Bearer ' + Cookies.get('wp-auth-token'),
                    },
                    body: JSON.stringify({
                        title: input.title,
                        featured_media:554,
                        // 'acf.image.id': data.id,
                        'acf.image.id': 554,
                        'acf.location': {
                            "address": "30 W Broad St, Stamford, CT 06902, USA",
                            "lat": 41.05548280000000005429683369584381580352783203125,
                            "lng": -73.5458043999999944162482279352843761444091796875,
                            "zoom": 14,
                            "place_id": "ChIJHzX4a-WhwokRFKxPV7pX0ao",
                            "street_number": "30",
                            "street_name": "West Broad Street",
                            "street_name_short": "W Broad St",
                            "city": "Stamford",
                            "state": "Connecticut",
                            "state_short": "CT",
                            "post_code": "06902",
                            "country": "United States",
                            "country_short": "US"
                        },
                        status: 'publish',
                        // Need to get the ID of the categories...
                        categories: categoryArray,
                    }),
                })
                .then((res) => {
                    if (res.status === 201) {
                        // confused on _this2
                        this.loadPosts()
                    }
                })
            }
            )
            .catch(error => {
                console.error(error);
            });
        alert("new Post Created!");
    }

    render() {
        console.log("state posts")
        console.log(this.state.posts);

        const { error, isLoaded } = this.state;
        if (error) {
            return <div>Error: { error.message }</div>;
        } else if (!isLoaded) {
            return (
                <div className="App">
                {console.log(Cookies.get('wp-auth-token'))}
                    <h2 class="text-2xl mb-8 font-bold" >Recipes</h2>
                    
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
                    <h2 class="text-2xl mb-8 font-bold" >Recipes</h2>

                    <div className="flex flex-col md:flex-row justify-center max-w-screen-lg m-auto mb-12">
                        <main className="mt-0 md:mt-4 flex-1 width-full max-w-screen-md font-gotham">
                            <div className="mb-6 filter-bars">
                        <div className="filter-bar">
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
                            <p class="text-sm mt-px" style={{marginLeft: "5px"}}>Filters</p>                            
                        </div>
                        <div id="filter-drawer" className="filter-drawer">
                            <button className="filter-button has-children" onClick={() => { this.sortAlpha() }}>Sort Alphabetically</button>
                            <button className="filter-button has-children" onClick={() => { this.sortNewest() }}>Sort By Date</button>
                        </div>
                    </div>
                            { this.state.posts === 0 ? <p>No matches</p> :
                                    this.state.posts.map(post => (
                                        <div className={ `${post.slug} card apple basil spinach cucumber lime p-0 relative filter-card flex bg-white md:p-4 shadow-md mb-6` }>
                                            <div className="absolute bottom-0 left-2 md:left-0 w-32 h-32 bg-center bg-cover mr-4" style={{background:post.color}}>
                                            </div>
                        	                <a href="https://pat-cooney.com/recipes/dont-basil-ly/" className="w-32 z-10 h-32 bg-center bg-cover mr-4" style={{backgroundImage:`url(${post.image.thumb}`}}>
                                            </a>
                                            <div className="pl-2 md:pl-0 flex-1 flex flex-col justify-center">
                                                <a className="no-underline text-black" href="https://pat-cooney.com/recipes/dont-basil-ly/">
                                                    <h2 style={{textDecorationColor:post.color}} className="underline text-2xl font-gotham-medium md:font-gotham-bold leading-tight mb-1">
                                                        {post.title}
                                                    </h2>
                                                </a>
	                	                        <div className="flex-wrap flex mb-2">
                                                    <div className="mt-0 md:mt-2 bg-transparent inline-flex mr-2 p-px rounded-md md:bg-black-100 hover:bg-black-200 duration-300 transition-all">
                        	                            <a className="no-underline mt-px mx-0 md:mx-2 text-black-500 md:text-black text-xs font-gotham" href="https://pat-cooney.com/apple/">Apple</a>
                                                    </div>
                                                    <div className="mt-0 md:mt-2 bg-transparent inline-flex mr-2 p-px rounded-md md:bg-black-100 hover:bg-black-200 duration-300 transition-all">
                        	                            <a className="no-underline mt-px mx-0 md:mx-2 text-black-500 md:text-black text-xs font-gotham" href="https://pat-cooney.com/basil/">Basil</a>
                                                    </div>
                                                    <div className="mt-0 md:mt-2 bg-transparent inline-flex mr-2 p-px rounded-md md:bg-black-100 hover:bg-black-200 duration-300 transition-all">
                        	                            <a className="no-underline mt-px mx-0 md:mx-2 text-black-500 md:text-black text-xs font-gotham" href="https://pat-cooney.com/spinach/">Spinach</a>
                                                    </div>
                                                    <div className="mt-0 md:mt-2 bg-transparent inline-flex mr-2 p-px rounded-md md:bg-black-100 hover:bg-black-200 duration-300 transition-all">
                        	                            <a className="no-underline mt-px mx-0 md:mx-2 text-black-500 md:text-black text-xs font-gotham" href="https://pat-cooney.com/cucumber/">Cucumber</a>
                                                    </div>
                                                    <div className="mt-0 md:mt-2 bg-transparent inline-flex mr-2 p-px rounded-md md:bg-black-100 hover:bg-black-200 duration-300 transition-all">
                        	                            <a className="no-underline mt-px mx-0 md:mx-2 text-black-500 md:text-black text-xs font-gotham" href="https://pat-cooney.com/lime/">Lime</a>
                                                    </div>
                                                </div>
	                                        </div>
                                        </div>
                                    ))
                                }
                            
                        </main>
                        <aside className="pl-4 flex-1 ml-4 mt-4 max-w-screen-xs">
                            <section className="bg-white shadow-md">
                                <h3 className="sidebar__header p-4 bg-blue-200 font-gotham-medium text-blue">Ingredient Type</h3>
                                <ul>
                                    <li className="mx-4 py-4 border-b border-black-100">            
                                        <a className="flex text-black-700 transition-all duration-300 hover:text-" href="https://pat-cooney.com/category/fruits/">
                                            <p className="font-gotham-medium">Fruits</p>
                                        </a>    
                                    </li>        
                                    <li className="mx-4 py-4 border-b border-black-100">
                                        <a className="flex text-black-700 transition-all duration-300 hover:text-" href="https://pat-cooney.com/category/herbs/">
                                            <p className="font-gotham-medium">Herbs</p>
                                        </a>
                                    </li>
                                    <li className="mx-4 py-4 border-b border-black-100">
                                        <a className="flex text-black-700 transition-all duration-300 hover:text-" href="https://pat-cooney.com/category/vegetables/">
                                            <p className="font-gotham-medium">Vegetables</p>
                                        </a>
                                    </li>
                                </ul>
                            </section>
                        </aside>
                    </div>

                    
                </div>
            );
        }
    }
}

export default Recipes;
