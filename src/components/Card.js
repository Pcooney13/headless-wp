import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ReactComponent as SVGStar } from "../assets/svgs/star-o.svg";
import { Html5Entities } from "html-entities";


function Card(props, activeUser) {
    const htmlEntities = new Html5Entities();
    const transition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] };
    let counter = 1;

    const textMotion = {
        rest: {
            opacity: 1,
        },
        hover: {
            scale: 1.1,
            boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        },
    };

    const edibleAnimation = {
        rest: {
            opacity: 1,
        },
        hover: {
            x: 4,            
        },
    };

    return window.location.pathname.substr(1) === "users" ? (
        <motion.div
            whileHover="hover"
            initial={{
                opacity: 0,
                y: 100,
            }}
            animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.2, ...transition },
            }}
            exit={{
                scaleY: 1.2,
                opacity: 0,
                transition: { duration: 3 },
            }}
            transition={{ delay: 0.2, ...transition }}
            key={props.displayItem.id}
            className={`${props.displayItem.first_name} ${props.displayItem.last_name} card max-w-lg mb-4 mx-auto flex items-center bg-white border-black-200 border p-4 rounded-lg`}
        >
            <Link to={`/users/${props.displayItem.slug}/`}>
                {console.log(props.displayItem)}
                <motion.img
                    variants={textMotion}
                    alt="team"
                    className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                    src={
                        props.displayItem.image.full
                            ? props.displayItem.image.full
                            : "https://via.placeholder.com/80x80"
                    }
                />
            </Link>
            <div className="flex-grow">
                <Link
                    to={`/users/${props.displayItem.slug}/`}
                    className="no-underline text-black"
                >
                    <h2 className="text-xl font-gotham-medium md:font-gotham-bold leading-tight tracking-tight">
                        {`${props.displayItem.first_name} ${props.displayItem.last_name}`}
                    </h2>
                </Link>
                <p className="text-black-500 text-sm">
                    {props.displayItem.roles}
                </p>
            </div>
        </motion.div>
    ) : (
        <motion.div
            whileHover="hover"
            initial={{
                opacity: 0,
                y: 100,
            }}
            animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.2, ...transition },
            }}
            exit={{
                scaleY: 1.2,
                opacity: 0,
                transition: { duration: 3 },
            }}
            transition={{ delay: 0.2, ...transition }}
            key={counter++}
            className={`${props.displayItem.slug} card overflow-hidden p-0 relative filter-card mb-4 flex bg-white border-black-200 border rounded-lg`}
        >
            <motion.div
                variants={edibleAnimation}
                className="absolute rounded-l-lg bottom-0 left-2 w-28 h-28 bg-center bg-cover mr-4"
                style={{
                    background:
                        props.displayItem.color &&
                        `linear-gradient( 
                            hsl(
                                ${props.displayItem.color.hsl[0]},
                                ${props.displayItem.color.hsl[1]}%,
                                ${props.displayItem.color.hsl[2] + 15}%
                            ),
                            hsl(
                                ${props.displayItem.color.hsl[0]}, 
                                ${props.displayItem.color.hsl[1]}%,
                                ${props.displayItem.color.hsl[2]}%
                            ),
                            hsl(${props.displayItem.color.hsl[0]}, 
                                ${props.displayItem.color.hsl[1]}%, 
                                ${props.displayItem.color.hsl[2] - 15}%
                            )
                                                )`,
                }}
            ></motion.div>

            <Link
                to={`/${props.currentCategory}/${props.displayItem.slug}/`}
                props={props.displayItem.id}
                className="w-28 z-10 h-28 rounded-l-lg bg-center bg-cover mr-4"
                style={{
                    backgroundImage:
                        props.displayItem.image &&
                        `url(${props.displayItem.image.thumb}`,
                }}
            ></Link>
            <div className="pl-2 flex-1 flex flex-col justify-center">
                {window.location.pathname.substr(1) === "recipes" && (
                    <button
                        onClick={() => this.clickedPost(props)}
                        className="text-black-200 hover:text-black-300 hover:fill-current"
                    >
                        <SVGStar className="h-12 mr-4 w-6 absolute hover:fill-current top-0 right-0" />
                    </button>
                )}
                <Link
                    className="no-underline text-black"
                    props={"car"}
                    to={`/${props.currentCategory}/${props.displayItem.slug}/`}
                >
                    <motion.h2
                        variants={edibleAnimation}
                        style={
                            props.displayItem.color && {
                                textDecorationColor:
                                    props.displayItem.color.hex,
                            }
                        }
                        className="underline text-xl font-gotham-medium md:font-gotham-bold leading-tight mb-px tracking-tight"
                    >
                        {props.displayItem.title}
                    </motion.h2>
                    <motion.p
                        class="text-black-500 text-sm"
                        variants={edibleAnimation}
                    >
                        {props.displayItem.categories &&
                            htmlEntities.decode(
                                props.displayItem.categories[0].name
                            )}
                        {props.displayItem.varieties &&
                            htmlEntities.decode(
                                props.displayItem.varieties[0].name
                            )}
                    </motion.p>
                </Link>
            </div>
        </motion.div>
    );
}

export default Card