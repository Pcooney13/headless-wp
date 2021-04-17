// Polish the transition from blurred image taking up screen to full size image
// Figure out the functionality for zomming from card specifically not just top left corner

//[LIKE] button that stores an array of usernames that likes the pic
import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Sidebar from '../components/sidebar/Sidebar';

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
        // this.postshit = this.postshit.bind(this)
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
            post.items && post.items.map(
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

    sortColor() {
        const sorted = this.state.posts.sort(function (a, b) {
            var textA = a.color.hsl[0];
            var textB = b.color.hsl[0];
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

    findMatches(photos, wordToMatch) {
        if (photos.length > 0) {
            return photos.filter(pokemon => {
                const regex = new RegExp(wordToMatch, 'gi');
                return pokemon.title.match(regex)
            });
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

                    <div className="flex flex-col md:flex-row justify-center max-w-screen-lg m-auto mb-12">
                        <main className="mt-0 md:mt-4 flex-1 width-full max-w-screen-md font-gotham">
                           
                            <form className="shadow-md h-16 search mb-6 w-full">
                                <input className="text-base px-4 h-full search__input" value={this.state.value} autoComplete="off" onChange={(e) => this.displayMatches(this.state.posts, e)} type="text" placeholder="Search..." name="search" />
                                <input style={{ position: "absolute", left: "-9999px" }} type="submit" />
                                <div className="search__results" style={{ display: "none" }}>
                                    <ul className="suggestions">
                                        <li>Filter by Name</li>
                                        <li>and by Number</li>
                                    </ul>
                                </div>
                            </form>

                            { this.state.posts === 0 ? <p>No matches</p> :
                                    this.state.posts.map(post => (
                                        <div key={`recipe-${counter++}`} className={ `${post.slug} card apple basil spinach cucumber lime p-0 relative filter-card flex bg-white md:p-4 shadow-md mb-6` }>
                                            <div className="absolute bottom-0 left-2 md:left-0 w-32 h-32 bg-center bg-cover mr-4" style={{background:post.color.hex}}>
                                            </div>
                        	                <a href={`https://pat-cooney.com/recipes/${post.slug}/`} className="w-32 z-10 h-32 bg-center bg-cover mr-4" style={{backgroundImage:`url(${post.image.thumb}`, boxShadow: `-.25rem .25rem .5rem rgba(0,0,0,0.25)`}}>
                                            </a>
                                            <div className="pl-2 md:pl-0 flex-1 flex flex-col justify-center">
                                                <a className="no-underline text-black" href={`https://pat-cooney.com/recipes/${post.slug}/`}>
                                                    <h2 style={{textDecorationColor:post.color.hex}} className="underline text-2xl font-gotham-medium md:font-gotham-bold leading-tight mb-1">
                                                        {post.title}
                                                    </h2>
                                                </a>
                                                <div className="flex-wrap flex mb-2">
                                                    {post.items.map(item => (                                                        
                                                        <div key={`${item.ingredient.ingredient[0].post_name}-${counter}`} className="mt-0 md:mt-2 bg-transparent inline-flex mr-2 p-px rounded-md md:bg-black-100 hover:bg-black-200 duration-300 transition-all">                        	                                
                                                            
                                                            <Link 
                                                                className="no-underline mt-px mx-0 md:mx-2 text-black-500 md:text-black text-xs font-gotham" 
                                                                to={ `/ingredients/${item.ingredient.ingredient[0].post_name}` }
                                                                onClick={ e =>
                                                                    this.handleCategories(
                                                                        item.ingredient.ingredient[0],
                                                                        e
                                                                    )
                                                                }
                                                            >
                                                                {item.ingredient.ingredient[0].post_title}
                                                            </Link>
                                                        </div>
                                                    ))}                                                    
                                                </div>
	                                        </div>
                                        </div>
                                    ))
                                }
                            
                        </main>
                        <Sidebar />
                    </div>

                    
                </div>
            );
        }
    }
}

export default Recipes;
