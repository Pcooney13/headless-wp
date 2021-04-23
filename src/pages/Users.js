import React from 'react'
import Sidebar from "../components/sidebar/Sidebar";

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            token: "wp-token",
            count: 0,
            active: null,
        };
        this.findMatches = this.findMatches.bind(this);
        this.displayMatches = this.displayMatches.bind(this);
    }

    // SEARCH - matching titles only
    findMatches(photos, wordToMatch) {
        if (photos.length > 0) {
            return photos.filter((pokemon) => {                
                const regex = new RegExp(wordToMatch, "gi");
                if (pokemon.last_name.match(regex)) {
                    return pokemon.last_name.match(regex); 
                } else if (pokemon.first_name.match(regex)) {
                    return pokemon.first_name.match(regex); 
                } else if (pokemon.roles[0].match(regex)) {
                    return pokemon.roles[0].match(regex);
                }
                return ''
            });
        }
    }

    // SEARCH - display only those that match
    displayMatches(value, e) {
        const searchMatch = this.findMatches(value, e.target.value);
        let cards = document.querySelectorAll(".card");
        let searchPosts = [];
        //First remove No Match if it is already on screen
        if (document.querySelector(".no-match"))
            document.querySelector(".no-match").remove();
        //Brings all cards back if user inputs text then deletes
        if (!e.target.value) {
            for (var n = 0; n < cards.length; n++) {
                cards[n].classList.remove("hide");
            }
        }
        //Display cards whose title matches the search input text
        else if (searchMatch && searchMatch.length >= 1 && e.target.value) {
            for (var i = 0; i < searchMatch.length; i++) {
                for (var k = 0; k < cards.length; k++) {
                    cards[k].classList.add("hide");
                    if (cards[k].classList.contains(searchMatch[i].first_name) || cards[k].classList.contains(searchMatch[i].last_name)) {
                        searchPosts.push(cards[k]);
                        cards[k].classList.remove("hide");
                    } else {
                        cards[k].classList.add("hide");
                    }
                }
            }
            for (var m = 0; m < searchPosts.length; m++) {
                searchPosts[m].classList.remove("hide");
            }
            //Display no matches text
        } else {
            searchPosts = null;
            for (var a = 0; a < cards.length; a++) {
                cards[a].classList.add("hide");
            }
            //need to fix this up a wee bit
            var para = document.createElement("p");
            para.classList.add("no-match");
            var node = document.createTextNode("No Matches Found");
            para.appendChild(node);
            document.querySelector("main").appendChild(para);
        }
    }

    componentDidMount() {
        this.loadPosts();
    }

    loadPosts() {
        fetch("https://pat-cooney.com/wp-json/v1/users?per_page=100")
            .then(function (response) {
                return response.json();
            })
            .then((value) => {
                this.setState(
                    {
                        isLoaded: true,
                        users: value,
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

    render() {
        const { error, isLoaded } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return (
                <div className="App">
                    <h2 className="capitalize text-2xl mb-8 font-gotham-bold">
                        {this.props.match.params.ingredient}
                    </h2>

                    <div className="card-container">
                        <p>Loading</p>
                    </div>
                </div>
            );
        } else {
            // const { url } = this.props.match
            const alphaUsers = this.state.users.sort(function (a, b) {
                if (a.last_name < b.last_name) {
                    return -1;
                }
                if (a.last_name > b.last_name) {
                    return 1;
                }
                return 0;
            });
            return (
                <div className="App max-w-screen-lg p-0 m-auto">
                    <h3 className="text-2xl font-gotham-medium capitalize my-4">
                        Users
                    </h3>
                    <div className="flex flex-col md:flex-row justify-center max-w-screen-md m-auto mb-12">
                        <main className="flex-1">
                            {alphaUsers.map((user) => (
                                <div
                                    key={user.id}
                                    className={`${user.first_name} ${user.last_name} card max-w-lg mb-4 mx-auto flex items-center bg-white border-black-200 border p-4 rounded-lg`}
                                >
                                    <img
                                        alt="team"
                                        className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                                        src={
                                            user.image.full
                                                ? user.image.full
                                                : "https://via.placeholder.com/80x80"
                                        }
                                    />
                                    <div className="flex-grow">
                                        <h2 className="-mb-1 text-xl font-gotham-medium md:font-gotham-bold leading-tight mb-1 tracking-tight">
                                            {`${user.first_name} ${user.last_name}`}
                                        </h2>
                                        <p className="text-gray-500">
                                            {user.roles}
                                        </p>
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
export default Users