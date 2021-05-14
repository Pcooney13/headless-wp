import React from "react";
import {Link} from "react-router-dom";


class IngredientRecipes extends React.Component {
    render() {
        let counter = 1
        return (
            <div className="flex max-w-screen-md mx-auto">
                <div className="mt-6 mr-6">
                    {this.props.recipes &&
                        this.props.recipes.map((props) => (
                            <div
                                key={counter++}
                                className={`${props.slug} card max-w-lg p-0 relative filter-card flex bg-white shadow-md mb-4`}
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
                                            }%, ${props.color.hsl[2] + 20}%), 
                                                        hsl(${
                                                            props.color.hsl[0]
                                                        }, ${
                                                props.color.hsl[1]
                                            }%, ${props.color.hsl[2]}%),
                                                        hsl(${
                                                            props.color.hsl[0]
                                                        }, ${
                                                props.color.hsl[1]
                                            }%, ${props.color.hsl[2] - 20}%)
                                                    )`,
                                    }}
                                ></div>

                                <Link
                                    to={`/recipes/${props.slug}/`}
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
                                        props={'car'}
                                        to={`/recipes/${props.slug}/`}
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
                                </div>
                            </div>
                        ))}
                </div>
                <div
                    style={{
                        borderColor: this.props.ingredient.color.hex,
                        background: `rgba(
                            ${this.props.ingredient.color.rgb[0]}, 
                            ${this.props.ingredient.color.rgb[1]}, 
                            ${this.props.ingredient.color.rgb[2]},
                            0.25
                        )`,
                    }}
                    className="mt-6 ml-auto flex-1 border-2 rounded-md p-4"
                >
                    <h3 className="font-gotham-bold text-xl" style={{ color: this.props.ingredient.color.hex }}>
                        SIDEBAR
                    </h3>
                </div>
            </div>
        )
        
    }
}
export default IngredientRecipes;