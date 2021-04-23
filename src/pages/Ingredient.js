// Polish the transition from blurred image taking up screen to full size image
// Figure out the functionality for zomming from card specifically not just top left corner

// DRINK PICS
// https://www.drinkfiltered.com/drink/tea

//[LIKE] button that stores an array of usernames that likes the pic
import React from "react";
import { Route, NavLink } from "react-router-dom";
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

const Intro = ({ match }) => (
    <div className="max-w-screen-md mx-auto mt-6 p-4 bg-white rounded-lg border border-black-200 h-128">
        <p className="text-2xl font-gotham-bold mb-4">Lets Talk about some yummy fucking {match.params.ingredient}</p>
        Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh
        onion daikon amaranth tatsoi tomatillo melon azuki bean garlic. Gumbo
        beet greens corn soko endive gumbo gourd. Parsley shallot courgette
        tatsoi pea sprouts fava bean collard greens dandelion okra wakame
        tomato. Dandelion cucumber earthnut pea peanut soko zucchini. Turnip
        greens yarrow ricebean rutabaga endive cauliflower sea lettuce kohlrabi
        amaranth water spinach avocado daikon napa cabbage asparagus winter
        purslane kale. Celery potato scallion desert raisin horseradish spinach
        carrot soko. Lotus root water spinach fennel kombu maize bamboo shoot
        green bean swiss chard seakale pumpkin onion chickpea gram corn pea.
        Brussels sprout coriander water chestnut gourd swiss chard wakame
        kohlrabi beetroot carrot watercress. Corn amaranth salsify bunya nuts
        nori azuki bean chickweed potato bell pepper artichoke. Nori grape
        silver beet broccoli kombu beet greens fava bean potato quandong celery.
        Bunya nuts black-eyed pea prairie turnip leek lentil turnip greens
        parsnip. Sea lettuce lettuce water chestnut eggplant winter purslane
        fennel azuki bean earthnut pea sierra leone bologi leek soko chicory
        celtuce parsley jï¿½cama salsify. Celery quandong swiss chard chicory
        earthnut pea potato. Salsify taro catsear garlic gram celery bitterleaf
        wattle seed collard greens nori. Grape wattle seed kombu beetroot
        horseradish carrot squash brussels sprout chard.
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
            console.log(this.state);         

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
                                                    src={`https://www.themealdb.com/images/ingredients/${this.state.active.title}.png`}
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
                                        exact path={`/ingredients/:ingredient/`}
                                        component={Intro}
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