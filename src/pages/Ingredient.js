// Polish the transition from blurred image taking up screen to full size image
// Figure out the functionality for zomming from card specifically not just top left corner

// DRINK PICS
// https://www.drinkfiltered.com/drink/tea

//[LIKE] button that stores an array of usernames that likes the pic
import React from "react";
import { Route, NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import Archive from "./Archive";
import Nutrition from "./Nutrition";
import IngredientRecipes from "./IngredientRecipes";

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

const Intro = ({ match, ingredient, accentColor }) => (
    <div className="max-w-screen-md mx-auto mt-6 p-10 bg-white rounded-lg border border-black-200 p-10 text-gray-800 relative md:text-left">
        <div className="md:flex items-center -mx-10 -ml-12">
            <div className="w-full md:w-1/2 pl-8 pr-4 md:mb-0">
                <div className="relative">
                    <img
                        src={
                            ingredient.image.png
                                ? ingredient.image.png
                                : "https://pat-cooney.com/app/themes/juicy/assets/images/lime.png"
                        }
                        className="w-full relative z-10"
                        alt=""
                    />
                    <div
                        className="product border-4 absolute z-0"
                        style={{ borderColor: accentColor }}
                    ></div>
                </div>
            </div>
            <div className="w-full md:w-1/2 pr-8 pl-4">
                <div className="mb-10">
                    <h1 className="font-bold uppercase text-3xl mb-5">
                        {ingredient.title}
                    </h1>
                    <p className="text-sm">
                        Lets talk about these yummy fucking {ingredient.title}
                        elit. Eos, voluptatum dolorum! Laborum blanditiis
                        consequatur, voluptates, sint enim fugiat saepe, dolor
                        fugit, magnam explicabo eaque quas id quo porro
                        doloruuum facilis...                        
                        <button
                            href="/"
                            className="opacity-75 hover:opacity-100 inline-block text-xs leading-none border-b border-gray-900"
                            style={{
                                borderColor: accentColor,
                                color: accentColor,
                            }}
                        >
                            <p>MORE</p>
                            <i className="mdi mdi-arrow-right"></i>
                        </button>
                    </p>
                </div>
            </div>
        </div>
    </div>
);

class Ingredient extends Archive {
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
        let recipeArray = []
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
                value[0].forEach(
                    (post) =>
                        post.slug === this.props.match.params.ingredient &&
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
                value[1].forEach((recipe) =>
                recipe.items &&
                    recipe.items.forEach(
                        (ingreds) =>
                            this.state.active.slug ===
                                ingreds.ingredient.ingredient[0].post_name &&
                           recipeArray.push(recipe) 
                    )
                );  
                this.setState(
                    {
                        recipes: recipeArray,
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error,
                        });
                    }
                )      
            });
    }

    render() {
        const { error, isLoaded } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return (
                <div className="App max-w-screen-lg">
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
            console.log(this.state);      
            
            let accentColor = ''
                this.state.active.color.hsl[0] !== "0" &&
                this.state.active.color.hex !== "#f7fbfc"
                    ? (accentColor = this.state.active.color.hex)
                    : (accentColor = "#126b4c");

            return (
                <div className="App max-w-screen-lg">
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
                                            <Link
                                                to={`/ingredients/${this.props.match.params.ingredient}`}
                                            >
                                                <div className="flex items-center justify-center">
                                                    <h1
                                                        style={{
                                                            textDecorationColor: this
                                                                .state.active
                                                                .color.hex,
                                                        }}
                                                        className="mr-2 font-gotham-black text-4xl leading-none underline"
                                                    >
                                                        {
                                                            this.state.active
                                                                .title
                                                        }
                                                    </h1>
                                                    <img
                                                        alt={`${this.state.active.title}`}
                                                        className="w-16 h-16"
                                                        src={`https://www.themealdb.com/images/ingredients/${this.state.active.title}.png`}
                                                    />
                                                </div>
                                            </Link>
                                            <p className="mt-8 flex justify-center">
                                                <NavLink
                                                    style={{
                                                        textDecorationColor: this
                                                            .state.active.color
                                                            .hex,
                                                    }}
                                                    activeClassName="font-gotham-bold underline"
                                                    className="mx-6"
                                                    to={`/ingredients/${this.state.active.slug}/varieties`}
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
                                                    to={`/ingredients/${this.state.active.slug}/recipes`}
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
                                                    to={`/ingredients/${this.state.active.slug}/benefits`}
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
                                                    to={`/ingredients/${this.state.active.slug}/nutrition`}
                                                >
                                                    Nutrition Info
                                                </NavLink>
                                            </p>
                                        </div>
                                    </div>
                                    <Route
                                        exact
                                        path={`/ingredients/:ingredient/`}
                                        render={(props) => (
                                            <Intro
                                                {...props}
                                                ingredient={this.state.active}
                                                accentColor={accentColor}
                                            />
                                        )}
                                    />
                                    <Route
                                        path={`/ingredients/:ingredient/varieties`}
                                        component={Varieties}
                                    />
                                    <Route
                                        path={`/ingredients/:ingredient/recipes`}
                                        // component={IngredientRecipes}
                                        render={(props) => (
                                            <IngredientRecipes
                                                {...props}
                                                ingredient={this.state.active}
                                                recipes={this.state.recipes}
                                            />
                                        )}
                                    />
                                    <Route
                                        path={`/ingredients/:ingredient/benefits`}
                                        component={Benefits}
                                    />
                                    <Route
                                        path={`/ingredients/:ingredient/nutrition`}
                                        // component={NutritionInfo}
                                        render={(props) => (
                                            <Nutrition
                                                {...props}
                                                ingredient={this.state.active}
                                                recipes={this.state.recipes}
                                            />
                                        )}
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

export default Ingredient;