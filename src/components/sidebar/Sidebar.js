// Pass posts as props

import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as SVGSearch } from '../svgs/search.svg';
import { ReactComponent as SVGFilter } from '../svgs/filters.svg';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            token: "wp-token",
            count: 0,
            active: null,
            location: this.props.location,
        };
    }

    // SORT Drawer accordion
    filterDrawer() {
        const drawer = document.getElementById("filter-drawer");
        const filterSVG = document.getElementById("filter-svg").children[0];
        if (drawer.style.maxHeight) {
            drawer.style.maxHeight = null;
            filterSVG.setAttribute("fill", "#484848");
        } else {
            drawer.style.maxHeight = drawer.scrollHeight + "px";
            filterSVG.setAttribute("fill", "#4b957b");
        }
    }

    render() {
        const { posts } = this.props;

        return (
            <aside className="pl-4 flex-1 ml-4 max-w-screen-xs">
                <form className="shadow-md h-16 search mb-6 w-full">
                    <SVGSearch className="h-16 ml-4 w-6 absolute" />
                    <input
                        className="text-base pr-4 pl-12 h-full search__input focus:ring-2 focus:ring-green-200"
                        value={this.state.value}
                        autoComplete="off"
                        onChange={(e) =>
                            this.props.displayMatches(this.props.posts, e)
                        }
                        type="text"
                        placeholder="Search..."
                        name="search"
                    />
                    <input
                        style={{ position: "absolute", left: "-9999px" }}
                        type="submit"
                    />
                    <div
                        className="search__results"
                        style={{ display: "none" }}
                    >
                        <ul className="suggestions">
                            <li>Filter by Name</li>
                            <li>and by Number</li>
                        </ul>
                    </div>
                </form>
                <div className="mb-6 shadow-md filter-bars">
                    <div className="p-4 flex bg-white h-16">
                        <p
                            className="text-sm mt-px"
                            style={{ marginLeft: "5px" }}
                        >
                            Filters
                        </p>
                        <button
                            className="ml-auto"
                            id="filter-click"
                            onClick={() => this.filterDrawer()}
                        >
                            <SVGFilter id="filter-svg" className="h-6 w-6" />
                        </button>
                    </div>
                    <div
                        id="filter-drawer"
                        className="filter-drawer max-h-0 overflow-hidden"
                    >
                        <ul>
                            <li className="mx-4 py-4 border-b border-black-100">
                                <button
                                    className="flex text-black-700 font-gotham-medium"
                                    onClick={() => {
                                        this.props.sortAlpha(posts);
                                    }}
                                >
                                    Sort Alphabetically
                                </button>
                            </li>
                            <li className="mx-4 py-4 border-b border-black-100">
                                <button
                                    className="flex text-black-700 font-gotham-medium"
                                    onClick={() => {
                                        this.props.sortNewest(posts);
                                    }}
                                >
                                    Sort By Date
                                </button>
                            </li>
                            <li className="mx-4 py-4 border-b border-black-100">
                                <button
                                    className="flex text-black-700 font-gotham-medium"
                                    onClick={() => {
                                        this.props.sortColor(posts);
                                    }}
                                >
                                    Sort By Color
                                </button>
                            </li>
                            {this.props.location.pathname.substring(1) ===
                                "ingredients" && (
                                <li className="mx-4 py-4 border-b border-black-100">
                                    <button
                                        className="flex text-black-700 font-gotham-medium"
                                        onClick={() => {
                                            this.props.sortNumber(
                                                posts,
                                                "calories"
                                            );
                                        }}
                                    >
                                        Sort By Calories
                                    </button>
                                </li>
                            )}
                            {this.props.location.pathname.substring(1) ===
                                "ingredients" && (
                                <li className="mx-4 py-4 border-b border-black-100">
                                    <button
                                        className="flex text-black-700 font-gotham-medium"
                                        onClick={() => {
                                            this.props.sortNumber(
                                                posts,
                                                "water_content"
                                            );
                                        }}
                                    >
                                        Sort By Water Content
                                    </button>
                                </li>
                            )}
                            {this.props.location.pathname.substring(1) ===
                                "ingredients" && (
                                <li className="mx-4 py-4 border-b border-black-100">
                                    <button
                                        className="flex text-black-700 font-gotham-medium"
                                        onClick={() => {
                                            this.props.sortNumber(
                                                posts,
                                                "protein"
                                            );
                                        }}
                                    >
                                        Sort By Protein
                                    </button>
                                </li>
                            )}
                            {this.props.location.pathname.substring(1) ===
                                "ingredients" && (
                                <li className="mx-4 py-4 border-b border-black-100">
                                    <button
                                        className="flex text-black-700 font-gotham-medium"
                                        onClick={() => {
                                            this.props.sortNumber(
                                                posts,
                                                "carbs"
                                            );
                                        }}
                                    >
                                        Sort By Carbs
                                    </button>
                                </li>
                            )}
                            {this.props.location.pathname.substring(1) ===
                                "ingredients" && (
                                <li className="mx-4 py-4 border-b border-black-100">
                                    <button
                                        className="flex text-black-700 font-gotham-medium"
                                        onClick={() => {
                                            this.props.sortNumber(
                                                posts,
                                                "sugar"
                                            );
                                        }}
                                    >
                                        Sort By Sugar
                                    </button>
                                </li>
                            )}
                            {this.props.location.pathname.substring(1) ===
                                "ingredients" && (
                                <li className="mx-4 py-4 border-b border-black-100">
                                    <button
                                        className="flex text-black-700 font-gotham-medium"
                                        onClick={() => {
                                            this.props.sortNumber(
                                                posts,
                                                "fiber"
                                            );
                                        }}
                                    >
                                        Sort By Fiber
                                    </button>
                                </li>
                            )}
                            {this.props.location.pathname.substring(1) ===
                                "ingredients" && (
                                <li className="mx-4 py-4 border-b border-black-100">
                                    <button
                                        className="flex text-black-700 font-gotham-medium"
                                        onClick={() => {
                                            this.props.sortNumber(posts, "fat");
                                        }}
                                    >
                                        Sort By Fat
                                    </button>
                                </li>
                            )}
                            {/* <li className="mx-4 py-4 border-b border-black-100">
                                <button
                                    className="flex text-black-700 font-gotham-medium"
                                    onClick={() => {
                                        this.viewCompact();
                                    }}
                                >
                                    View Compact
                                </button>
                            </li> */}
                        </ul>
                    </div>
                </div>
                <section className="bg-white shadow-md">
                    <h3 className="sidebar__header p-4 font-gotham-medium bg-green-200 text-dark-green">
                        Ingredient Type
                    </h3>
                    <ul>
                        <li className="mx-4 py-4 border-b border-black-100">
                            <a
                                className="flex text-black-700 transition-all duration-300 hover:text-"
                                href="https://pat-cooney.com/category/fruits/"
                            >
                                <p className="font-gotham-medium">Fruits</p>
                            </a>
                        </li>
                        <li className="mx-4 py-4 border-b border-black-100">
                            <a
                                className="flex text-black-700 transition-all duration-300 hover:text-"
                                href="https://pat-cooney.com/category/herbs/"
                            >
                                <p className="font-gotham-medium">Herbs</p>
                            </a>
                        </li>
                        <li className="mx-4 py-4 border-b border-black-100">
                            <a
                                className="flex text-black-700 transition-all duration-300 hover:text-"
                                href="https://pat-cooney.com/category/vegetables/"
                            >
                                <p className="font-gotham-medium">Vegetables</p>
                            </a>
                        </li>
                        {this.props.location.pathname.substring(1) ===
                        "recipes" ? (
                            <li className="mx-4 py-4 border-b border-black-100">
                                <Link
                                    className="flex text-black-700 transition-all duration-300 hover:text-"
                                    to="/ingredients"
                                >
                                    <p className="font-gotham-medium">
                                        Ingredients
                                    </p>
                                </Link>
                            </li>
                        ) : (
                            <li className="mx-4 py-4 border-b border-black-100">
                                <Link
                                    className="flex text-black-700 transition-all duration-300 hover:text-"
                                    to="/recipes"
                                >
                                    <p className="font-gotham-medium">
                                        Recipes
                                    </p>
                                </Link>
                            </li>
                        )}
                    </ul>
                </section>
            </aside>
        );
    }
}

export default Sidebar;