import React, { useState, useEffect } from "react";
import { Route, NavLink } from "react-router-dom";
import { motion } from 'framer-motion'
import axios from "axios";

import Card from '../components/Card'

const About = ({ match }) => (
    <div className="max-w-screen-md mx-auto mt-6 p-4 bg-white rounded-lg border border-black-200 h-128">
        <p className="capitalize">{match.params.ingredient} About</p>
    </div>
);

const Favorites = ({ match, user, recipes }) => (
    <div className="overflow-scroll max-w-screen-md mx-auto mt-6 p-4 bg-white rounded-lg border border-black-200 h-128">
        {console.log('peep', recipes)}
        {console.log('like', user.liked_recipes)}
        {user.liked_recipes ? (
            recipes.map((product, key) =>
                user.liked_recipes.map(
                    (recipe_id) =>
                        product.id === recipe_id && (
                            <Card key={key} number={key + 1} displayItem={product} />
                        )
                )
            )
        ) : (
            <p>{user.first_name} doesn't seem to have any recipes saved.</p>
        )}
    </div>
)

const Comments = ({ match }) => (
    <div className="max-w-screen-md mx-auto mt-6 p-4 bg-white rounded-lg border border-black-200 h-128">
        <p className="capitalize">{match.params.ingredient} Comments</p>
    </div>
);
const User = (props) => {    
    const user_url = `https://pat-cooney.com/wp-json/v1/users/${props.match.params.slug}`
    const recipe_url = 'https://pat-cooney.com/wp-json/v1/recipes'

    const userRequest = axios.get(user_url)
    const recipeRequest = axios.get(recipe_url)

    const [user, setuser] = useState({
        loading: false,
        data: null,
        recipes: null,
        error: false,
    });
    useEffect(() => {
        setuser({
            loading: true,
            data: null,
            recipes: null,
            error: false,
        });

        axios.all([userRequest, recipeRequest])
            .then(
                axios.spread((...responses) => {
                    setuser({
                        loading: false,
                        data: responses[0].data,
                        recipes: responses[1].data,
                        error: false,
                    })
                })
            )
            .catch(() => {
                setuser({
                    loading: false,
                    data: null,
                    recipes: null,
                    error: true,
                })
            })
        }, [user_url])     
    
    let content = null;

    if (user.error) {
        content = <p>There was an error, please try again.</p>;
    }
    if (user.loading) {
        content = <p className="text-black-300">Loading ...</p>;
    }
    if (user.data) {
        {
            console.log(user.data)
        }

        const hoverWrapper = {
            rest: {
                x:0
            },
            hover: {
                x:0
            }
        }

        const bgHoverEffects = {
            rest: {
                rotate: 6,
            },
            hover: {
                rotate: 0,
            },
        }
        const hoverEffects = {
            rest: {
                x: 0,
                y:0
            },
            hover: {
                x: -10,
                y: -10
            }
        }

        content = (
            <div className="flex">
                {/* {runFirstTest(user.data)} */}
                <motion.div
                    whileHover="hover"
                    animate="rest"
                    initial="rest"
                    variants={hoverWrapper}
                    className="p-12 relative"
                >
                    <motion.div
                        variants={bgHoverEffects}
                        className="absolute w-64 h-64 rounded-2xl bg-green-200 rotate-6 transform z-10"
                    ></motion.div>
                    <motion.div
                        variants={hoverEffects}
                        className="w-64 h-64 rounded-lg bg-center bg-cover z-20 relative"
                        style={{
                            backgroundImage: `url(${user.data.image.full})`,
                        }}
                    ></motion.div>
                    <h3 className="py-4 font-gotham-medium text-xl text-dark-green">
                        {user.data.first_name} {user.data.last_name}
                    </h3>
                    <p>
                        <a className="underline text-bright-green" href="https://www.freecodecamp.org/news/what-is-lifting-state-up-in-react/">Lift user state up</a>
                    </p>
                </motion.div>
                <div className="flex-1">
                    <div className="py-4 px-8">
                        <div className="flex items-center justify-center border-b border-green-200">
                            <NavLink
                                activeClassName="font-gotham-bold border-b-4 text-green"
                                className="pb-2 px-4"
                                exact
                                to={`/users/${user.data.slug}`}
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
                        <Route
                            path={`/users/:slug/favorites`}
                            render={(props) => <Favorites {...props} user={user.data} recipes={user.recipes} />}
                        />
                        <Route path={`/users/:slug/comments`} component={Comments} />
                        <Route exact path={`/users/:slug`} component={About} />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="mt-24 mb-32 max-w-screen-lg mx-auto bg-white rounded-lg border border-black-200">
            <div className="mb-6">                
                {content}
            </div>
        </div>
    )
};


export default User;
