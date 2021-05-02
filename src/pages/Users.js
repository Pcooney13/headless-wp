import React, { useState, useEffect } from "react";
import { Route, NavLink, Link } from "react-router-dom";
import axios from "axios";

const About = ({ match }) => (
    <div className="max-w-screen-md mx-auto mt-6 p-4 bg-white rounded-lg border border-black-200 h-128">
        <p className="capitalize">{match.params.ingredient} About</p>
    </div>
);
const Favorites = ({ match }) => (
    <div className="max-w-screen-md mx-auto mt-6 p-4 bg-white rounded-lg border border-black-200 h-128">
        <div className="watermelon-cucumber-juice card overflow-hidden p-0 relative filter-card mb-4 flex bg-white border-black-200 border rounded-lg">
            <Link
                className="w-28 z-10 h-28 rounded-l-lg bg-center bg-cover mr-4 bg-green-200"
                to="/ingredients"
            ></Link>
            <div class="pl-2 flex-1 flex flex-col justify-center">
                <button class="text-black-200 hover:text-black-300 hover:fill-current">
                    <svg
                        class="h-12 mr-4 w-6 absolute hover:fill-current top-0 right-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        ></path>
                    </svg>
                </button>
                <a
                    class="no-underline text-black"
                    props="car"
                    href="/recipes/watermelon-cucumber-juice/"
                >
                    <h2 class="underline text-xl font-gotham-medium md:font-gotham-bold leading-tight mb-px tracking-tight">
                        Watermelon Cucumber Juice
                    </h2>
                    <p class="text-black-500 text-sm">Juice</p>
                </a>
            </div>
        </div>
        <div className="watermelon-cucumber-juice card overflow-hidden p-0 relative filter-card mb-4 flex bg-white border-black-200 border rounded-lg">
            <Link
                className="w-28 z-10 h-28 rounded-l-lg bg-center bg-cover mr-4 bg-bright-green"
                href="/"
            ></Link>
            <div class="pl-2 flex-1 flex flex-col justify-center">
                <button class="text-black-200 hover:text-black-300 hover:fill-current">
                    <svg
                        class="h-12 mr-4 w-6 absolute hover:fill-current top-0 right-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        ></path>
                    </svg>
                </button>
                <a
                    class="no-underline text-black"
                    props="car"
                    href="/recipes/watermelon-cucumber-juice/"
                >
                    <h2 class="underline text-xl font-gotham-medium md:font-gotham-bold leading-tight mb-px tracking-tight">
                        Watermelon Cucumber Juice
                    </h2>
                    <p class="text-black-500 text-sm">Juice</p>
                </a>
            </div>
        </div>
        <div className="watermelon-cucumber-juice card overflow-hidden p-0 relative filter-card mb-4 flex bg-white border-black-200 border rounded-lg">
            <Link
                className="w-28 z-10 h-28 rounded-l-lg bg-center bg-cover mr-4 bg-green"
                href="/"
            ></Link>
            <div class="pl-2 flex-1 flex flex-col justify-center">
                <button class="text-black-200 hover:text-black-300 hover:fill-current">
                    <svg
                        class="h-12 mr-4 w-6 absolute hover:fill-current top-0 right-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        ></path>
                    </svg>
                </button>
                <a
                    class="no-underline text-black"
                    props="car"
                    href="/recipes/watermelon-cucumber-juice/"
                >
                    <h2 class="underline text-xl font-gotham-medium md:font-gotham-bold leading-tight mb-px tracking-tight">
                        Watermelon Cucumber Juice
                    </h2>
                    <p class="text-black-500 text-sm">Juice</p>
                </a>
            </div>
        </div>
    </div>
);
const Comments = ({ match }) => (
    <div className="max-w-screen-md mx-auto mt-6 p-4 bg-white rounded-lg border border-black-200 h-128">
        <p className="capitalize">{match.params.ingredient} Comments</p>
    </div>
);

const Users = (props) => {
    console.log(props.match.params.slug)
    const url = `https://pat-cooney.com/wp-json/v1/users/${props.match.params.slug}`;
    const [user, setuser] = useState({
        loading: false,
        data: null,
        search: null,
        error: false,
    });
    useEffect(() => {
        setuser({
            loading: true,
            data: null,
            search: null,
            error: false,
        });
        axios
            .get(url)
            .then((response) => {                
                setuser({
                    loading: false,
                    data: response.data,
                    search: null,
                    error: false,
                });
                // console.log(active)
            })
            .catch(() => {
                setuser({
                    loading: false,
                    data: null,
                    search: null,
                    error: true,
                });
            });
    }, [url])     
    
    // let runFirstTest = (user) => {
    //     const fixBreadCrumb = document.querySelector("#breadcrumbs");

    //     for(var i = 0; i < fixBreadCrumb.children.length; i++) {
    //         if ( fixBreadCrumb.children[i].children[0].innerHTML === props.match.params.id ) {
    //             fixBreadCrumb.children[
    //                 i
    //             ].children[0].innerHTML = fixBreadCrumb.children[
    //                 i
    //             ].children[0].innerHTML.replace(
    //                 props.match.params.id,
    //                 `${user.first_name} ${user.last_name}`
    //             );
    //         }
    //     }        
    // }
    
    let content = null;

    if (user.error) {
        content = <p>There was an error, please try again.</p>;
    }
    if (user.loading) {
        content = <p className="text-black-300">Loading ...</p>;
    }
    if (user.data) {

        content = (
            <div className="flex">
                {/* {runFirstTest(user.data)} */}
                <div className="p-12 relative">
                    <div className="absolute w-64 h-64 rounded-2xl bg-green-200 rotate-6 transform z-10"></div>
                    <div
                        className="w-64 h-64 rounded-lg bg-center bg-cover z-20 relative"
                        style={{
                            backgroundImage: `url(${user.data.image.full})`,
                        }}
                    ></div>
                    <h3 className="py-4 font-gotham-medium text-xl text-dark-green">
                        {user.data.first_name} {user.data.last_name}
                    </h3>
                </div>
                <div className="flex-1">
                    <div className="py-4 px-8">
                        <div className="flex items-center justify-center border-b border-green-200">
                            <NavLink
                                activeClassName="font-gotham-bold border-b-4 text-green"
                                className="pb-2 px-4"
                                exact to={`/users/${user.data.slug}`}
                                >
                                About
                            </NavLink>
                            <NavLink
                                activeClassName="font-gotham-bold border-b-4 text-green"
                                className="pb-2 px-4 mx-8"
                                to={`/users/${user.data.slug}/favorites`}
                                >
                                Favorite Recipes
                            </NavLink>
                            <NavLink
                                activeClassName="font-gotham-bold border-b-4 text-green"
                                className="pb-2 px-4"
                                to={`/users/${user.data.slug}/comments`}
                                >
                                Comments
                            </NavLink>
                        </div>
                        <Route path={`/users/:slug/favorites`} component={Favorites} />
                        <Route path={`/users/:slug/comments`} component={Comments} />
                        <Route exact path={`/users/:slug`} component={About} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-24 mb-32 max-w-screen-lg mx-auto bg-white rounded-lg border border-black-200">
            <div
                id="sidebar"
                className="sticky top-6 transition-all duration-300"
            >
                <div className="mb-6">                    
                    {content}
                </div>
            </div>
        </div>
    );
};


export default Users;
