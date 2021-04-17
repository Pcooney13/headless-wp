import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import { Link } from 'react-router-dom';

class Archive extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            token: "wp-token",
            count: 0,
            active: null,
            location: this.props.location,
        };
        this.findMatches = this.findMatches.bind(this);
        this.displayMatches = this.displayMatches.bind(this);
        this.sortAlpha = this.sortAlpha.bind(this);
        this.sortNumber = this.sortNumber.bind(this);
        this.sortColor = this.sortColor.bind(this);
        this.sortNewest = this.sortNewest.bind(this);
    }

    componentDidMount() {
        this.loadPosts();
    }

    loadPosts() {
        Promise.all([
            fetch("https://pat-cooney.com/wp-json/v1/ingredients?per_page=100"),
            fetch("https://pat-cooney.com/wp-json/v1/recipes?per_page=100"),
        ])
        .then(function (responses) {
            // Get a JSON object from each of the responses
            return Promise.all(
                responses.map(function (response) {
                    return response.json();
                })
            );
        })
        .then((value) => {
            this.setState(
                {
                    isLoaded: true,
                    ingredients: value[0],
                    recipes: value[1],
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                }
            );
        });
    }

    // SORT ALPHABETICALLY
    sortAlpha(posts) {
        const sorted = posts.sort(function (a, b) {
            var textA = a.slug.toUpperCase();
            var textB = b.slug.toUpperCase();
            return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        this.setState({
            posts: sorted,
        });
    }

    // SORT NUMBERS
    sortNumber(posts, sortByThis) {
        console.log(sortByThis);
        const sorted = posts.sort(function (a, b) {
            var textA = parseFloat(a.nutrition[sortByThis]);
            var textB = parseFloat(b.nutrition[sortByThis]);
            return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        this.setState({
            posts: sorted,
        });
    }

    // SORT COLORS by HSL VALUE
    sortColor(posts) {
        const sorted = posts.sort(function (a, b) {
            var textA = a.color.hsl[0];
            var textB = b.color.hsl[0];
            // last 20 hue points in HSL are reddish so we move those to the top
            if (textA > 340) {
                textA = textA - 360;
            }
            if (textB > 340) {
                textB = textB - 360;
            }
            return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        this.setState({
            posts: sorted,
        });
    }
    // SORT BY DATE
    sortNewest(posts) {
        const sorted = posts.sort(function (a, b) {
            var textA = a.orderdate;
            var textB = b.orderdate;

            return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        this.setState({
            posts: sorted.reverse(),
        });
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

    clickedPost(props, e, current_category) {
        e.preventDefault()
        console.log(props)
    }

    render() {
        const { error, isLoaded } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return (
                <div className="App">
                    <div className="card-container">
                        <p>Loading</p>
                    </div>
                </div>
            );
        } else {
            window.scrollTo(0, 0);
            let counter = 1;
            let current_category = this.props.location.pathname.substring(1);

            return (
                <div className="App max-w-screen-lg p-0 m-auto">
                    <h3 className="text-2xl font-gotham-medium capitalize my-4">
                        {this.props.location.pathname.substring(1)}
                    </h3>
                    <p>Displaying {this.state[
                                this.props.location.pathname.substring(1)
                            ].length}</p>
                    <div className="flex flex-col md:flex-row justify-center max-w-screen-lg m-auto mb-12">
                        <main className="mt-0 flex-1 width-full max-w-screen-md font-gotham">
                            {this.state[
                                this.props.location.pathname.substring(1)
                            ].map((props) => (
                                <div
                                    key={counter++}
                                    className={`${props.slug} card p-0 relative filter-card flex bg-white shadow-md mb-6`}
                                >
                                    <div
                                        className="absolute bottom-0 left-2 w-28 h-28 bg-center bg-cover mr-4"
                                        style={{
                                            background:
                                                props.color &&
                                                `linear-gradient( 
                                                    hsl(${
                                                        props.color.hsl[0]
                                                    }, ${
                                                    props.color.hsl[1]
                                                }%, ${
                                                    props.color.hsl[2] + 15
                                                }%), 
                                                    hsl(${
                                                        props.color.hsl[0]
                                                    }, ${
                                                    props.color.hsl[1]
                                                }%, ${props.color.hsl[2]}%),
                                                    hsl(${
                                                        props.color.hsl[0]
                                                    }, ${
                                                    props.color.hsl[1]
                                                }%, ${props.color.hsl[2] - 15}%)
                                                )`,
                                        }}
                                    ></div>

                                    <Link                                       
                                        to={`/${current_category}/${props.slug}/`}
                                        props={props.id}
                                        className="w-28 z-10 h-28 bg-center bg-cover mr-4"
                                        style={{
                                            backgroundImage:
                                                props.image &&
                                                `url(${props.image.thumb}`,
                                        }}
                                    ></Link>
                                    <div className="pl-2 flex-1 flex flex-col justify-center">
                                        <Link
                                            className="no-underline text-black"
                                            props={"car"}
                                            to={`/${current_category}/${props.slug}/`}
                                        >
                                            <h2
                                                style={
                                                    props.color && {
                                                        textDecorationColor:
                                                            props.color.hex,
                                                    }
                                                }
                                                className="underline text-2xl font-gotham-medium md:font-gotham-bold leading-tight mb-1"
                                            >
                                                {props.title}
                                            </h2>
                                        </Link>
                                        <div className="ingredient-list flex flex-wrap">
                                            {props.items && props.items.map(item => (
                                                <div className="flex bg-black-100 items-center rounded-full mb-1 mr-2 px-2 py-1 text-xs">
                                                    <div className="flex h-3 w-3 rounded-full mr-1" style={{backgroundColor: item.ingredient.ingredient[0].color}}></div>
                                                    <p>{item.ingredient.ingredient[0].post_title}</p>                                                    
                                                </div>
                                            ))}
                                        </div>
                                        {/* <div className="text-xs flex text-center justify-between pr-4">
                                            {props.nutrition &&
                                                props.nutrition.calories && (
                                                    <p>
                                                        Calories:
                                                        <br />
                                                        {
                                                            props.nutrition
                                                                .calories
                                                        }
                                                    </p>
                                                )}
                                            {props.nutrition &&
                                                props.nutrition.calories && (
                                                    <p>
                                                        Water Content:
                                                        <br />
                                                        {
                                                            props.nutrition
                                                                .water_content
                                                        }
                                                        %
                                                    </p>
                                                )}
                                            {props.nutrition &&
                                                props.nutrition.calories && (
                                                    <p>
                                                        Protein:
                                                        <br />
                                                        {
                                                            props.nutrition
                                                                .protein
                                                        }
                                                        g
                                                    </p>
                                                )}
                                            {props.nutrition &&
                                                props.nutrition.calories && (
                                                    <p>
                                                        Carbs:
                                                        <br />
                                                        {props.nutrition.carbs}g
                                                    </p>
                                                )}
                                            {props.nutrition &&
                                                props.nutrition.calories && (
                                                    <p>
                                                        Sugar:
                                                        <br />
                                                        {props.nutrition.sugar}g
                                                    </p>
                                                )}
                                            {props.nutrition &&
                                                props.nutrition.calories && (
                                                    <p>
                                                        Fiber:
                                                        <br />
                                                        {props.nutrition.fiber}g
                                                    </p>
                                                )}
                                            {props.nutrition &&
                                                props.nutrition.calories && (
                                                    <p>
                                                        Fat:
                                                        <br />
                                                        {props.nutrition.fat}g
                                                    </p>
                                                )}
                                        </div> */}
                                    </div>
                                </div>
                            ))}
                        </main>
                        <Sidebar
                            {...this.props}
                            posts={
                                this.state[
                                    this.props.location.pathname.substring(1)
                                ]
                            }
                            findMatches={this.findMatches}
                            displayMatches={this.displayMatches}

                            sortAlpha={this.sortAlpha}
                            sortNumber={this.sortNumber}
                            sortColor={this.sortColor}
                            sortNewest={this.sortNewest}
                            type={this.props.location.pathname.substring(1)}
                        />
                    </div>
                </div>
            );
        }
    }
}

export default Archive;

