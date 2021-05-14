import React, { useState, useEffect } from "react";
import axios from "axios";
import { Html5Entities } from "html-entities";

import { ReactComponent as SVGSortAsc } from "../../assets/svgs/sort-asc.svg";
import { ReactComponent as SVGSearch } from "../../assets/svgs/search.svg";
import { ReactComponent as SVGColorSwatch } from "../../assets/svgs/color-swatch.svg";
import { ReactComponent as SVGFilter } from "../../assets/svgs/filters.svg";
import { ReactComponent as SVGChevronDown } from "../../assets/svgs/chevron-down.svg";

const List = (props) => {
    const htmlEntities = new Html5Entities();
    let url
    props.type === 'ingredients' ?
        url = `https://pat-cooney.com/wp-json/wp/v2/categories?per_page=10`
        :
        url = `https://pat-cooney.com/wp-json/wp/v2/varieties?per_page=10`
    const [products, setProducts] = useState({
        loading: false,
        data: null,
        search: null,
        error: false,
    });
    props.type !==  'users' 
    ?
        useEffect(() => {
            setProducts({
                loading: true,
                data: null,
                search: null,
                error: false,
            });
            axios
                .get(url)
                .then((response) => {
                    setProducts({
                        loading: false,
                        data: response.data,
                        search: null,
                        error: false,
                    });
                })
                .catch(() => {
                    setProducts({
                        loading: false,
                        data: null,
                        search: null,
                        error: true,
                    });
                });
        }, [url])
    :
        useEffect(() => {
            setProducts({
                loading: true,
                data: null,
                search: null,
                error: false,
            });
            axios
                .get(url)
                .then(() => {
                    setProducts({
                        loading: false,
                        data: [
                            { name: "Administrator" },
                            { name: "Editor" },
                            { name: "Author" },
                            { name: "Contributor" },
                            { name: "Subscriber" },
                        ],
                        search: null,
                        error: false,
                    });
                })
                .catch(() => {
                    setProducts({
                        loading: false,
                        data: null,
                        search: null,
                        error: true,
                    });
                });
        }, [url]);

    let content = null;

    if (products.error) {
        content = <p>There was an error, please try again.</p>;
    }
    if (products.loading) {
        content = <p className="text-black-300">Loading ...</p>;
    }
    if (products.data) {
        const searchBar = document.querySelector("input[name=search]");

        document.addEventListener("keyup", function (event) {
            if (event.key === "/") {
                searchBar.focus();
                console.log("clicked /");
            }
        });

            content = (
                <ul>
                    {products.data.map((product) => (
                        <li
                            key={`key-${product.name}`}
                            className="border-b border-black-100 text-sm pl-4"
                        >
                            <button className="p-4 w-full flex text-black-700 font-gotham hover:font-gotham-medium">
                                - {htmlEntities.decode(product.name)}
                            </button>
                        </li>
                    ))}
                </ul>
            );
    }

    const rainbow = [
        "#BE185D",
        "#f6a51e",
        "#9ACD32",
        "#10B981",
        "#5A4FCF",
        "#9535B5",
        "#ffffff",
        "custom",
    ];
    // Toggle Dropdowns
    const toggleDropdown = (e) => {
        const dropdown = e.target.parentElement.children[1];
        const button = e.target.parentElement.children[0];
        const rotateSVG = button.children[0];

        if (dropdown.style.maxHeight) {
            dropdown.style.maxHeight = null;
            rotateSVG.classList.remove("-rotate-180");
            button.classList.remove("font-gotham-medium");
        } else {
            dropdown.style.maxHeight = dropdown.scrollHeight + "px";
            rotateSVG.classList.add("-rotate-180");
            button.classList.add("font-gotham-medium");
        }
    };

    // Sort Cards Alphabetically
    const sortAlpha = (posts, sortItems) => {
        const check = document.querySelector("#alpha-direction");
        const sorted = posts.sort(function (a, b) {
            var textA;
            var textB;
            if (a.slug) {
                textA = a.slug.toUpperCase();
                textB = b.slug.toUpperCase();
            } else {
                textA = a.last_name.toUpperCase();
                textB = b.last_name.toUpperCase();
            }
            if (check.checked) {
                return textA > textB ? -1 : textA < textB ? 1 : 0;
            } else {
                return textA < textB ? -1 : textA > textB ? 1 : 0;
            }
        });
        check.checked = !check.checked
        sortItems(sorted);
    };

    // SORT Cards by Color - Hue
    const sortColor = (posts, sortItems) => {
        const check = document.querySelector("#color-direction");
        const sorted = posts.sort(function (a, b) {
            var textA = a.color.hsl[0];
            var textB = b.color.hsl[0];
            // last 20 hue points in HSL are reddish so we move those to the top
            if ( textA > 335 ) {
                textA = textA - 360;
            }
            if ( textB > 335 ) {
                textB = textB - 360;
            }
            // if hue is 0 add big number to push to end
            if (textA === 0) {
                textA = textA + 400;
            }
            if (textB === 0) {
                textB = textB + 400;
            }
            if (check.checked) {
                return textA > textB ? -1 : textA < textB ? 1 : 0;
            } else {
                return textA < textB ? -1 : textA > textB ? 1 : 0;
            }
        });
        check.checked = !check.checked;
        sortItems(sorted);
    };

    // Search User input against Params
    const findMatches = (cards, wordToMatch) => {
        console.log(cards);
        if (cards.length > 0) {
            return cards.filter((card) => {
                const regex = new RegExp(wordToMatch, "gi");
                if (card.title && card.title.match(regex)) {
                    return card.title.match(regex);
                } else if (card.last_name && card.last_name.match(regex)) {
                    return card.last_name.match(regex);
                } else if (card.first_name && card.first_name.match(regex)) {
                    return card.first_name.match(regex);
                } else if (card.roles && card.roles[0].match(regex)) {
                    return card.roles[0].match(regex);
                } else {
                    return "";
                }
            });
        }
    };

    // SEARCH - display only those that match
    const displayMatches = (value, e) => {
        const searchMatch = findMatches(value, e.target.value);
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
                    if (
                        cards[k].classList.contains(searchMatch[i].slug) ||
                        cards[k].classList.contains(
                            searchMatch[i].first_name
                        ) ||
                        cards[k].classList.contains(searchMatch[i].last_name)
                    ) {
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
    };

    return (
        <aside className="pl-4 mb-4 flex-1 ml-4 max-w-screen-xs">
            <div
                id="sidebar"
                className="sticky top-6 transition-all duration-300"
            >
                {/* Search */}
                <form className="h-16 search mb-6 w-full flex flex-col">
                    <SVGSearch className="h-16 ml-4 w-6 absolute" />
                    <input
                        className="text-base pr-4 pl-12 h-full border-2 border-green-200 rounded-lg focus:border-0 focus:ring-2 focus:ring-bright-green"
                        // value={this.state.value}
                        autoComplete="off"
                        onChange={(e) => displayMatches(props.products, e)}
                        type="text"
                        placeholder="Press / to Search..."
                        onFocus={(e) => {
                            e.target.placeholder = "";
                            e.target.parentElement.classList.add(
                                "text-bright-green"
                            );
                        }}
                        onBlur={(e) => {
                            e.target.parentElement.classList.remove(
                                "text-bright-green"
                            );
                            e.target.placeholder = "Press / to Search...";
                        }}
                        name="search"
                    />
                    <input
                        style={{ position: "absolute", left: "-9999px" }}
                        type="submit"
                    />
                </form>
                {/* Sort */}
                <div className="mb-6">
                    <div className="p-4 font-gotham-medium flex items-center bg-green-200 text-dark-green">
                        <h3 className="capitalize">Sort {props.type}</h3>
                        <SVGSortAsc className="h-6 w-6 ml-auto" />
                    </div>
                    <ul className="bg-white border-black-200 border-l border-r rounded-b-lg border-b">
                        <li className="border-b border-black-100">
                            <button
                                tabIndex="0"
                                className="p-4 w-full flex text-black-700 font-gotham hover:font-gotham-medium"
                                onClick={() => {
                                    sortAlpha(
                                        props.products,
                                        props.sortItems,
                                        true
                                    );
                                }}
                            >
                                Sort Alphabetically
                            </button>
                            <input
                                className="hidden"
                                id="alpha-direction"
                                type="checkbox"
                            />
                        </li>
                        {props.type !== "users" && (
                            <li>
                                <button
                                    className="p-4 w-full flex text-black-700 font-gotham hover:font-gotham-medium"
                                    onClick={() => {
                                        sortColor(
                                            props.products,
                                            props.sortItems
                                        );
                                    }}
                                >
                                    Sort By Color
                                </button>
                                <input
                                    className="hidden"
                                    id="color-direction"
                                    type="checkbox"
                                />
                            </li>
                        )}
                    </ul>
                </div>
                {/* Filters */}
                <div className="mb-6">
                    <div className="p-4 font-gotham-medium flex items-center bg-green-200 text-dark-green">
                        <h3>Filters</h3>
                        <SVGFilter className="h-6 w-6 ml-auto" />
                    </div>
                    <div
                        className={`dropdown bg-white border-black-200 border-l border-r border-b 
                        ${props.type !== "users" ? "border-black-100" : "rounded-b-lg"}`}
                    >
                        <button
                            onClick={(e) => toggleDropdown(e)}
                            className="p-4 w-full flex text-black-700 font-gotham hover:font-gotham-medium flex"
                            id="filter-click"
                        >
                            By Category
                            <SVGChevronDown
                                id="filter-svg"
                                className="pointer-events-none transition-all duration-300 transform h-6 w-6 text-black-500 ml-auto"
                            />
                        </button>
                        <div
                            id="filter-drawer"
                            className="filter-drawer max-h-0 overflow-hidden"
                        >
                            {content}
                        </div>
                    </div>
                    {props.type !== "users" && (
                        <div className="dropdown bg-white border-black-200 border-l border-r rounded-b-lg border-b">
                            <button
                                onClick={(e) => toggleDropdown(e)}
                                className="p-4 w-full flex text-black-700 font-gotham hover:font-gotham-medium flex"
                                id="filter-click"
                            >
                                By Color
                                <SVGChevronDown
                                    id="filter-svg"
                                    className="pointer-events-none transition-all duration-300 transform h-6 w-6 text-black-500 ml-auto"
                                />
                            </button>
                            <div
                                id="filter-drawer"
                                className="filter-drawer max-h-0 overflow-hidden"
                            >
                                <ul className="flex flex-wrap justify-between p-4">
                                    {rainbow.map((color, key) =>
                                        color === "custom" ? (
                                            <li className="w-1/4 text-center">
                                                <ColorPicker />
                                            </li>
                                        ) : (
                                            <li
                                                className={`w-1/4 text-center ${
                                                    key < 4 && "mb-4"
                                                }`}
                                            >
                                                <button
                                                    style={{
                                                        background: color,
                                                    }}
                                                    className="h-8 w-8 rounded-full shadow-sm border-4 border-black-200"
                                                ></button>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
};

const ColorPicker = () => {
    const [color, setColor] = useState(null);

    // console.log("colorPicker", color);

    return (
        <button className="h-8 w-8 relative overflow-hidden">
            <SVGColorSwatch
                style={{ color: color }}
                className="h-8 w-8 text-black-300"
            />
            <input
                value={color ? color : undefined}
                type="color"
                className="h-8 w-8 absolute top-0 left-0 opacity-0"
                name="colorPicker"
                onChange={(e) => setColor(e.target.value)}
            />
        </button>
    );
};

export default List;
