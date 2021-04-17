import React from "react";
import {Link} from "react-router-dom";


class IngredientRecipes extends React.Component {
    render() {
        let counter = 1
        return (
            <div className="max-w-screen-md mx-auto mt-6">
                {this.props.recipes &&this.props.recipes.map((props) => (
                        <div
                            key={counter++}
                            className={`${props.slug} card p-0 relative filter-card flex bg-white shadow-md mb-4`}
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
                                    props={"car"}
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
        );
    }
}
export default IngredientRecipes;