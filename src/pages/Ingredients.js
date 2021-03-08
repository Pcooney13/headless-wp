// Polish the transition from blurred image taking up screen to full size image
// Figure out the functionality for zomming from card specifically not just top left corner

//[LIKE] button that stores an array of usernames that likes the pic
import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ReactComponent as SVGFilter } from '../components/svgs/filters.svg';

class Ingredients extends React.Component {
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
            // 'https://pat-cooney.com/wp-json/wp/v2/recipes?per_page=100';
            'https://pat-cooney.com/wp-json/v1/ingredients?per_page=100';

        let splitURL = window.location.pathname.split('/');
        let pathnameURL = splitURL[splitURL.length - 1];

        fetch(dataPosts)
            .then(value => value.json())
            .then(value => {
                this.setState({
                    isLoaded: true,
                    posts: value,
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
    // SORT Drawer accordion
    filterDrawer() {
        const drawer = document.getElementById('filter-drawer')
        const filterSVG = document.getElementById('filter-svg').children[0];
        drawer.classList.toggle('drawer-open')
        if (drawer.classList.contains('drawer-open')) {
            filterSVG.setAttribute("fill", "#4b957b")
        } else {
            filterSVG.setAttribute("fill", "#484848")
        }
    }
    // SORT ALPHABETICALLY
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
    // SORT NUMBERS
    sortNumber(sortByThis) {
        const sorted = this.state.posts.sort(function (a, b) {
            var textA = parseFloat(a.nutrition[sortByThis]);
            var textB = parseFloat(b.nutrition[sortByThis]);
            return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        this.setState({
            posts: sorted,
        })
    }
    // SORT COLORS by HSL VALUE
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
    // SORT BY DATE
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
    // SEARCH - matching titles only
    findMatches(photos, wordToMatch) {
        if (photos.length > 0) {
            return photos.filter(pokemon => {
                const regex = new RegExp(wordToMatch, 'gi');
                return pokemon.title.match(regex)
            });
        }
    }
    // SEARCH - display only those that match
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
        console.log("PROPS/ psyche this only")
        console.log(this);

        const { error, isLoaded } = this.state;
        if (error) {
            return <div>Error: { error.message }</div>;
        } else if (!isLoaded) {
            return (
                <div className="App">
                    <h2 className="text-2xl mb-8 font-bold" >Ingredients</h2>
                    <div className="card-container">
                        <p>Loading</p>
                    </div>
                </div>
            );
        } else {

            window.scrollTo(0, 0);
            let counter = 1;

            return (
                <div className="App">
                    <h2 className="text-2xl mb-8 font-bold" >Ingredients</h2>

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
                                    <div key={counter++} className={ `${post.slug} card apple basil spinach cucumber lime p-0 relative filter-card flex bg-white shadow-md mb-6` }>
                                        <div 
                                            className="absolute bottom-0 left-2 w-28 h-28 bg-center bg-cover mr-4" 
                                            style={
                                                {background:
                                                    `linear-gradient( 
                                                        hsl(${post.color.hsl[0]}, ${post.color.hsl[1]}%, ${post.color.hsl[2]+20}%), 
                                                        hsl(${post.color.hsl[0]}, ${post.color.hsl[1]}%, ${post.color.hsl[2]}%),
                                                        hsl(${post.color.hsl[0]}, ${post.color.hsl[1]}%, ${post.color.hsl[2]-20}%)
                                                    )`
                                                }
                                            }
                                        >
                                        </div>  
                                                                                 
                        	            <Link 
                                            onClick={ e => this.clickedIngredient( post, e ) }
                                            to={ `/ingredients/${post.slug}/`} 
                                            props = {post.id}
                                            className="w-28 z-10 h-28 bg-center bg-cover mr-4" 
                                            style={ { backgroundImage:`url(${post.image.thumb}`} }
                                        >
                                        </Link>
                                        <div className="pl-2 flex-1 flex flex-col justify-center">
                                            {/* <a class="-mb-1 text-black-500 hover:text-green" href={`https://www.nutritionvalue.org/${post.slug}%2C_raw_nutritional_value.html`}>csv link</a> */}
                                            <Link 
                                            // onClick={ e => this.handleCategories(category, e ) } 
                                            className="no-underline text-black" to={`/ingredients/${post.slug}/`}>
                                                <h2 style={{textDecorationColor:post.color.hex}} className="underline text-2xl font-gotham-medium md:font-gotham-bold leading-tight mb-1">
                                                    {post.title}
                                                </h2>        
                                            </Link>                                                
                                            <div className="text-xs flex text-center justify-between pr-4">
                                                { post.nutrition &&
                                                    post.nutrition.calories && 
                                                        <p>Calories:<br/>{post.nutrition.calories}</p>
                                                }
                                                { post.nutrition &&
                                                    post.nutrition.calories && 
                                                        <p>Water Content:<br/>{post.nutrition.water_content}%</p>
                                                }
                                                { post.nutrition &&
                                                    post.nutrition.calories && 
                                                        <p>Protein:<br/>{post.nutrition.protein}g</p>
                                                }
                                                { post.nutrition &&
                                                    post.nutrition.calories && 
                                                        <p>Carbs:<br/>{post.nutrition.carbs}g</p>
                                                }
                                                { post.nutrition &&
                                                    post.nutrition.calories && 
                                                        <p>Sugar:<br/>{post.nutrition.sugar}g</p>
                                                }
                                                { post.nutrition &&
                                                    post.nutrition.calories && 
                                                        <p>Fiber:<br/>{post.nutrition.fiber}g</p>
                                                }
                                                { post.nutrition &&
                                                    post.nutrition.calories && 
                                                        <p>Fat:<br/>{post.nutrition.fat}g</p>
                                                }
                                            </div>
	                                    </div>
                                    </div>
                                    
                                ))
                            }
                        </main>
                        <aside className="pl-4 flex-1 ml-4 mt-4 max-w-screen-xs">
                            
                            <div className="mb-6 filter-bars">
                                <div className="filter-bar">
                                    <p className="text-sm mt-px" style={{marginLeft: "5px"}}>Filters</p>                            
                                    <button id="filter-click" onClick={() => this.filterDrawer()}>                                       
                                        <SVGFilter id="filter-svg" className="h-6 w-6"/>
                                    </button>
                                    
                                </div>
                                <div id="filter-drawer" className="filter-drawer">
                                    <ul>
                                        <li className="mx-4 py-4 border-b border-black-100">            
                                            <button className="flex text-black-700 font-gotham-medium" onClick={() => { this.sortAlpha() }}>Sort Alphabetically</button>
                                        </li>  
                                        <li className="mx-4 py-4 border-b border-black-100">            
                                            <button className="flex text-black-700 font-gotham-medium" onClick={() => { this.sortNewest() }}>Sort By Date</button>
                                        </li>
                                        <li className="mx-4 py-4 border-b border-black-100">            
                                            <button className="flex text-black-700 font-gotham-medium" onClick={() => { this.sortColor() }}>Sort By Color</button>
                                        </li>  



                                        <li className="mx-4 py-4 border-b border-black-100">            
                                            <button className="flex text-black-700 font-gotham-medium" onClick={() => { this.sortNumber('calories') }}>Sort By Calories</button>
                                        </li>  
                                        <li className="mx-4 py-4 border-b border-black-100">            
                                            <button className="flex text-black-700 font-gotham-medium" onClick={() => { this.sortNumber('water_content') }}>Sort By Water Content</button>
                                        </li>     
                                        <li className="mx-4 py-4 border-b border-black-100">            
                                            <button className="flex text-black-700 font-gotham-medium" onClick={() => { this.sortNumber('protein') }}>Sort By Protein</button>
                                        </li>  
                                        <li className="mx-4 py-4 border-b border-black-100">            
                                            <button className="flex text-black-700 font-gotham-medium" onClick={() => { this.sortNumber('carbs') }}>Sort By Carbs</button>
                                        </li>  
                                        <li className="mx-4 py-4 border-b border-black-100">            
                                            <button className="flex text-black-700 font-gotham-medium" onClick={() => { this.sortNumber('sugar') }}>Sort By Sugar</button>
                                        </li>  
                                        <li className="mx-4 py-4 border-b border-black-100">            
                                            <button className="flex text-black-700 font-gotham-medium" onClick={() => { this.sortNumber('fiber') }}>Sort By Fiber</button>
                                        </li>  
                                        <li className="mx-4 py-4 border-b border-black-100">            
                                            <button className="flex text-black-700 font-gotham-medium" onClick={() => { this.sortNumber('fat') }}>Sort By Fat</button>
                                        </li>  
                                        <li className="mx-4 py-4 border-b border-black-100">            
                                            <button className="flex text-black-700 font-gotham-medium" onClick={() => { this.viewCompact() }}>View Compact</button>
                                        </li>  
                                    </ul>
                                </div>
                            </div>
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
                                     <li className="mx-4 py-4 border-b border-black-100">
                                        <Link  className="flex text-black-700 transition-all duration-300 hover:text-" to="/recipes">
                                            <p className="font-gotham-medium">Recipes</p>
                                        </Link>
                                    </li>
                                </ul>
                            </section>
                        </aside>
                    </div>
                    {console.log(Cookies.get('wp-auth-token'))}
                </div>
            );
        }
    }
}

export default Ingredients;
