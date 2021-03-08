// Polish the transition from blurred image taking up screen to full size image
// Figure out the functionality for zomming from card specifically not just top left corner

//[LIKE] button that stores an array of usernames that likes the pic
import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Ingredients from '../pages/Ingredients';

class Ingredient extends Ingredients {
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

    render() {
        console.log("state posts")
        console.log(this.state);
        console.log(this.props);

        const { error, isLoaded } = this.state;
        if (error) {
            return <div>Error: { error.message }</div>;
        } else if (!isLoaded) {
            return (
                <div className="App">
                {console.log(Cookies.get('wp-auth-token'))}
                    <h2 className="text-2xl mb-8 font-bold" >{this.props.match.params.ingredient}</h2>
                    
                    <div className="card-container">
                        <p>Loading</p>
                    </div>
                </div>
            );
        } else {

            window.scrollTo(0, 0);
            let counter = 1;
            let colorArray = []

            return (
                <div className="App">
                    {console.log(this.props)}
                    {console.log(this.state)}
                    <h2 className="text-2xl mb-8 font-bold" >{this.props.match.params.ingredient}</h2>

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
                                            // onClick={ e => this.handleCategories(category, e ) }
                                            to={ `/ingredients/${post.slug}/`} 
                                            className="w-28 z-10 h-28 bg-center bg-cover mr-4" 
                                            style={ { backgroundImage:`url(${post.image.thumb}`} }
                                        >
                                        </Link>
                                        <div className="pl-2 flex-1 flex flex-col justify-center">
                                            <Link 
                                            // onClick={ e => this.handleCategories(category, e ) } 
                                            className="no-underline text-black" to={`/ingredients/${post.slug}/`}>
                                                <h2 style={{textDecorationColor:post.color.hex}} className="underline text-2xl font-gotham-medium md:font-gotham-bold leading-tight mb-1">
                                                    {post.title}
                                                </h2>        
                                            </Link>                                                
	                                    </div>
                                    </div>
                                ))
                            }
                            {console.log(colorArray)}
                        </main>
                        <aside className="pl-4 flex-1 ml-4 mt-4 max-w-screen-xs">
                            <div className="mb-6 filter-bars">
                                <div className="filter-bar">
                                    <p className="text-sm mt-px" style={{marginLeft: "5px"}}>Filters</p>                            
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

                    
                </div>
            );
        }
    }
}

export default Ingredient;
