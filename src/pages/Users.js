import React from 'react'
import Sidebar from "../components/sidebar/Sidebar";
import { Route, Link } from 'react-router-dom'

const User = ({ match }) => <p>{match.params.id}</p>




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
            return (
                <div className="App max-w-screen-lg p-0 m-auto">
                    <h3 class="text-2xl font-gotham-medium capitalize my-4">
                        Users
                    </h3>
                    <div className="flex flex-col md:flex-row justify-center max-w-screen-md m-auto mb-12">
                        <main className="flex-1">
                            {this.state.users.map((user) => (
                                <div class="max-w-md mb-2 mx-auto flex items-center bg-white border-black-200 border p-4 rounded-lg">
                                    <img
                                        alt="team"
                                        class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                                        src={
                                            user.image.full
                                                ? user.image.full
                                                : "https://via.placeholder.com/80x80"
                                        }
                                    />
                                    {console.log(user)}
                                    <div class="flex-grow">
                                        <h2 class="text-gray-900 title-font font-medium">
                                            {`${user.first_name} ${user.last_name}`}
                                        </h2>
                                        <p class="text-gray-500">{user.roles}</p>
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