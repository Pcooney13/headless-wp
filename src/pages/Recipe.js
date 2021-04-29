// Polish the transition from blurred image taking up screen to full size image
// Figure out the functionality for zomming from card specifically not just top left corner

//[LIKE] button that stores an array of usernames that likes the pic

// CREATE individual endpoints for recipes/ingredients
// REMOVE Class State and replace with how the others are

import React from "react";
import { Route, NavLink } from "react-router-dom";
import Archive from "./Archive";

const Varieties = ({ match }) => (
    <div className="max-w-screen-md mx-auto mt-6 p-4 bg-white rounded-lg border border-black-200 h-128">
        <p className="capitalize">{match.params.ingredient} Varieties</p>
    </div>
);
const Benefits = ({ match }) => (
    <div className="max-w-screen-md mx-auto mt-6 p-4 bg-white rounded-lg border border-black-200 h-128">
        <p>Benefits</p>
    </div>
);
const Nutrition = ({ match }) => (
    <div className="max-w-screen-md mx-auto mt-6 p-4 bg-white rounded-lg border border-black-200 h-128">
        <p>Nutrition</p>
    </div>
);
const LandingPage = ({ match, recipe }) => (
    <div className="max-w-screen-md mx-auto mt-6 p-4 bg-white rounded-lg border border-black-200 h-128">
        <p>Recipe</p>
        {console.log(recipe.items[0].ingredient.ingredient[0].post_title)}
        <ul class="list-disc pl-4">
            {recipe.items.map((item) => (
                <li>{item.ingredient.amount} {item.ingredient.measurement} {item.ingredient.ingredient[0].post_title}</li>
            ))}
        </ul>
    </div>
);
const SimilarRecipes = ({ match }) => (
    <div className="max-w-screen-md mx-auto mt-6 p-4 bg-white rounded-lg border border-black-200 h-128">
        <p>Similar Recipes</p>
    </div>
);

class Recipe extends Archive {
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
        console.log(this.props)
        // let recipeArray = [];
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
                value[1].forEach(
                    (post) =>
                    post.slug === this.props.match.params.recipe &&                        
                        this.setState(
                            {
                                active: post,
                            },
                            (error) => {
                                this.setState({
                                    isLoaded: true,
                                    error,
                                });
                            }
                        )
                );
                // value[1].forEach((recipe) =>
                //     recipe.items.forEach(
                //         (ingreds) =>
                //             console.log(this.state.active)
                //             this.state.active.slug ===
                //                 ingreds.ingredient.ingredient[0].post_name &&
                //             recipeArray.push(recipe)
                //     )
                // );
                // this.setState(
                //     {
                //         recipes: recipeArray,
                //     },
                //     (error) => {
                //         this.setState({
                //             isLoaded: true,
                //             error,
                //         });
                //     }
                // );
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
            // window.scrollTo(0, 0);

            return (
                <div className="App">
                    <h2 className="capitalize text-2xl mb-8 font-gotham-bold">
                        {this.props.match.params.ingredient}
                    </h2>
                    <div className="flex flex-col md:flex-row justify-center max-w-screen-lg m-auto mb-12">
                        <main className="mt-0 md:mt-4 flex-1 width-full max-w-screen-lg font-gotham">
                            {this.state.active === null ? (
                                <p>No matches</p>
                            ) : (
                                <div>
                                    <div className="relative">
                                        <div
                                            className="h-88 -mb-4"
                                            style={{
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                                backgroundImage: `linear-gradient( 180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,.8) 100%), url('${this.state.active.image.full}')`,
                                            }}
                                        ></div>
                                        <div
                                            className="h-6 transform translate-y-1/2"
                                            style={{
                                                background: `linear-gradient( 
                                                90deg,
                                                    hsl(${
                                                        this.state.active.color
                                                            .hsl[0]
                                                    }, ${
                                                    this.state.active.color
                                                        .hsl[1]
                                                }%, ${
                                                    this.state.active.color
                                                        .hsl[2] + 20
                                                }%), 
                                                    hsl(${
                                                        this.state.active.color
                                                            .hsl[0]
                                                    }, ${
                                                    this.state.active.color
                                                        .hsl[1]
                                                }%, ${
                                                    this.state.active.color
                                                        .hsl[2]
                                                }%),
                                                    hsl(${
                                                        this.state.active.color
                                                            .hsl[0]
                                                    }, ${
                                                    this.state.active.color
                                                        .hsl[1]
                                                }%, ${
                                                    this.state.active.color
                                                        .hsl[2] - 20
                                                }%)
                                                )`,
                                            }}
                                        ></div>
                                        <div className="bg-white h-48 p-4 md:-mb-24 rounded-md shadow-lg max-w-screen-md mx-4 md:m-auto transform -translate-y-1/2">
                                            <div className="flex items-center justify-center">
                                                <h1
                                                    style={{
                                                        textDecorationColor: this
                                                            .state.active.color
                                                            .hex,
                                                    }}
                                                    className="mr-2 font-gotham-black text-4xl leading-none underline"
                                                >
                                                    {this.state.active.title}
                                                </h1>
                                                <img
                                                    alt={`${this.state.active.title}`}
                                                    className="w-16 h-16"
                                                    src={`https://via.placeholder.com/64x64/${this.state.active.color.hex.substring(
                                                        1
                                                    )}/000000?text=smoothie`}
                                                />
                                            </div>
                                            <p className="mt-8 flex justify-center">
                                                <NavLink
                                                    style={{
                                                        textDecorationColor: this
                                                            .state.active.color
                                                            .hex,
                                                    }}
                                                    activeClassName="font-gotham-bold underline"
                                                    className="mx-6"
                                                    to={`/recipes/${this.state.active.slug}/varieties`}
                                                >
                                                    Varieties
                                                </NavLink>
                                                <NavLink
                                                    style={{
                                                        textDecorationColor: this
                                                            .state.active.color
                                                            .hex,
                                                    }}
                                                    activeClassName="font-gotham-bold underline"
                                                    className="mx-6"
                                                    to={`/recipes/${this.state.active.slug}/similar`}
                                                >
                                                    Recipes
                                                </NavLink>
                                                <NavLink
                                                    style={{
                                                        textDecorationColor: this
                                                            .state.active.color
                                                            .hex,
                                                    }}
                                                    activeClassName="font-gotham-bold underline"
                                                    className="mx-6"
                                                    to={`/recipes/${this.state.active.slug}/benefits`}
                                                >
                                                    Benefits
                                                </NavLink>
                                                <NavLink
                                                    style={{
                                                        textDecorationColor: this
                                                            .state.active.color
                                                            .hex,
                                                    }}
                                                    activeClassName="font-gotham-bold underline"
                                                    className="mx-6"
                                                    to={`/recipes/${this.state.active.slug}/nutrition`}
                                                >
                                                    Nutrition Info
                                                </NavLink>
                                            </p>
                                        </div>
                                    </div>
                                    <Route
                                        path={`/recipes/:recipe/`}
                                        render={(props) => (
                                            <LandingPage
                                            {...props}
                                            type={"recipes"}
                                                recipe={this.state.active}                                                
                                            />
                                        )}
                                    />
                                    <Route
                                        path={`/recipes/:recipe/varieties`}
                                        component={Varieties}
                                    />
                                    <Route
                                        path={`/recipes/:recipe/similar`}
                                        component={SimilarRecipes}
                                    />
                                    <Route
                                        path={`/recipes/:recipe/benefits`}
                                        component={Benefits}
                                    />
                                    <Route
                                        path={`/recipes/:recipe/nutrition`}
                                        component={Nutrition}
                                    />
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            );
        }
    }
}

export default Recipe;
