// // Pass posts as props
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// // import { Link } from "react-router-dom";
// // import { motion } from "framer-motion";
// // import { ReactComponent as SVGSearch } from "../svgs/search.svg";
// // import { ReactComponent as SVGColorSwatch } from "../svgs/color-swatch.svg";
// // import { ReactComponent as SVGFilter } from "../svgs/filters.svg";
// // import { ReactComponent as SVGSortAsc } from "../svgs/sort-asc.svg";
// // import { ReactComponent as SVGChevronDown } from "../svgs/chevron-down.svg";
// // import { ReactComponent as SVGSortDesc } from "../svgs/sort-desc.svg";

// class Sidebar2 extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             error: null,
//             isLoaded: false,
//             token: "wp-token",
//             count: 0,
//             active: null,
//             location: this.props.location,
//         };
//     }

//     // Toggle Dropdowns
//     toggleDropdown(e) {
//         const dropdown = e.target.parentElement.children[1];
//         const button = e.target.parentElement.children[0];
//         const rotateSVG = button.children[0];

//         if (dropdown.style.maxHeight) {
//             dropdown.style.maxHeight = null;
//             rotateSVG.classList.remove("-rotate-180");
//             button.classList.remove("font-gotham-medium");
//         } else {
//             dropdown.style.maxHeight = dropdown.scrollHeight + "px";
//             rotateSVG.classList.add("-rotate-180");
//             button.classList.add("font-gotham-medium");
//         }
//     }

//     // Get Categories
//     getCategories() {
//         // https://pat-cooney.com/wp-json/wp/v2/varieties
//         // https://pat-cooney.com/wp-json/wp/v2/categories
//     }

//     // Sort Cards Alphabetically
//     sortAlpha(posts, sortItems) {
//         const sorted = posts.sort(function (a, b) {
//             var textA
//             var textB
//             if (a.slug) {
//                 textA = a.slug.toUpperCase();
//                 textB = b.slug.toUpperCase();
//             } else {
//                 textA = a.last_name.toUpperCase();
//                 textB = b.last_name.toUpperCase();
//             }
//             return textA < textB ? -1 : textA > textB ? 1 : 0;
//         });
//         sortItems(sorted);
//     }

//     // SORT Cards by Color - Hue
//     sortColor(posts, sortItems) {
//         const sorted = posts.sort(function (a, b) {
//             var textA = a.color.hsl[0];
//             var textB = b.color.hsl[0];
//             // last 20 hue points in HSL are reddish so we move those to the top
//             if (textA > 340) { textA = textA - 360; }
//             if (textB > 340) { textB = textB - 360; }
//             // if hue is 0 add big number to push to end
//             if (textA === 0) { textA = textA + 400; }
//             if (textB === 0) { textB = textB + 400; }
//             return textA < textB ? -1 : textA > textB ? 1 : 0;
//         });
//         sortItems(sorted);
//     }

//     // Search User input against Params
//     findMatches(cards, wordToMatch) {
//         console.log(cards);
//         if (cards.length > 0) {
//             return cards.filter((card) => {
//                 const regex = new RegExp(wordToMatch, "gi");
//                 if (card.title && card.title.match(regex)) {
//                     return card.title.match(regex);
//                 } else if (card.last_name && card.last_name.match(regex)) {
//                     return card.last_name.match(regex);
//                 } else if (card.first_name && card.first_name.match(regex)) {
//                     return card.first_name.match(regex);
//                 } else if (card.roles && card.roles[0].match(regex)) {
//                     return card.roles[0].match(regex);
//                 } else {
//                     return "";
//                 }
//             });
//         }
//     }

//     // SEARCH - display only those that match
//     displayMatches(value, e) {
//         const searchMatch = this.findMatches(value, e.target.value);
//         let cards = document.querySelectorAll(".card");
//         let searchPosts = [];
//         //First remove No Match if it is already on screen
//         if (document.querySelector(".no-match"))
//             document.querySelector(".no-match").remove();
//         //Brings all cards back if user inputs text then deletes
//         if (!e.target.value) {
//             for (var n = 0; n < cards.length; n++) {
//                 cards[n].classList.remove("hide");
//             }
//         }
//         //Display cards whose title matches the search input text
//         else if (searchMatch && searchMatch.length >= 1 && e.target.value) {
//             for (var i = 0; i < searchMatch.length; i++) {
//                 for (var k = 0; k < cards.length; k++) {
//                     cards[k].classList.add("hide");
//                     if (
//                         cards[k].classList.contains(searchMatch[i].slug) ||
//                         cards[k].classList.contains(
//                             searchMatch[i].first_name
//                         ) ||
//                         cards[k].classList.contains(searchMatch[i].last_name)
//                     ) {
//                         searchPosts.push(cards[k]);
//                         cards[k].classList.remove("hide");
//                     } else {
//                         cards[k].classList.add("hide");
//                     }
//                 }
//             }
//             for (var m = 0; m < searchPosts.length; m++) {
//                 searchPosts[m].classList.remove("hide");
//             }
//             //Display no matches text
//         } else {
//             searchPosts = null;
//             for (var a = 0; a < cards.length; a++) {
//                 cards[a].classList.add("hide");
//             }
//             //need to fix this up a wee bit
//             var para = document.createElement("p");
//             para.classList.add("no-match");
//             var node = document.createTextNode("No Matches Found");
//             para.appendChild(node);
//             document.querySelector("main").appendChild(para);
//         }
//     }

//     render() {

//         const rainbow = [
//             "#BE185D",
//             "#f6a51e",
//             "#9ACD32",
//             "#10B981",
//             "#5A4FCF",
//             "#9535B5",
//             "#ffffff",
//             "custom",
//         ];

//         return (
//             <aside className="pl-4 flex-1 ml-4 max-w-screen-xs">
//                 <form className="h-16 search mb-6 w-full flex flex-col">
//                     <SVGSearch className="h-16 ml-4 w-6 absolute" />
//                     <input
//                         className="text-base pr-4 pl-12 h-full border-2 border-green-200 rounded-lg focus:border-0 focus:ring-2 focus:ring-bright-green"
//                         value={this.state.value}
//                         autoComplete="off"
//                         onChange={(e) =>
//                             this.displayMatches(this.props.products, e)
//                         }
//                         type="text"
//                         placeholder="Press / to Search..."
//                         onFocus={(e) => {
//                             e.target.placeholder = "";
//                             e.target.parentElement.classList.add(
//                                 "text-bright-green"
//                             );
//                         }}
//                         onBlur={(e) => {
//                             e.target.parentElement.classList.remove(
//                                 "text-bright-green"
//                             );
//                             e.target.placeholder = "Press / to Search...";
//                         }}
//                         name="search"
//                     />
//                     <input
//                         style={{ position: "absolute", left: "-9999px" }}
//                         type="submit"
//                     />
//                 </form>

//                 <div className="mb-6">
//                     <div className="p-4 font-gotham-medium flex items-center bg-green-200 text-dark-green">
//                         <h3 className="capitalize">Sort {this.props.type}</h3>
//                         <SVGSortAsc className="h-6 w-6 ml-auto" />
//                     </div>
//                     <ul className="bg-white border-black-200 border-l border-r rounded-b-lg border-b">
//                         <li className="border-b border-black-100">
//                             <button
//                                 tabIndex="0"
//                                 className="p-4 w-full flex text-black-700 font-gotham hover:font-gotham-medium"
//                                 onClick={() => {
//                                     this.sortAlpha(
//                                         this.props.products,
//                                         this.props.sortItems
//                                     );
//                                 }}
//                             >
//                                 Sort Alphabetically
//                             </button>
//                         </li>
//                         {this.props.type !== "users" && (
//                             <li>
//                                 <button
//                                     className="p-4 w-full flex text-black-700 font-gotham hover:font-gotham-medium"
//                                     onClick={() => {
//                                         this.sortColor(
//                                             this.props.products,
//                                             this.props.sortItems
//                                         );
//                                     }}
//                                 >
//                                     Sort By Color
//                                 </button>
//                             </li>
//                         )}
//                     </ul>
//                 </div>

//                 <div className="mb-6">
//                     <div className="p-4 font-gotham-medium flex items-center bg-green-200 text-dark-green">
//                         <h3>Filters</h3>
//                         <SVGFilter className="h-6 w-6 ml-auto" />
//                     </div>
//                     <div className="dropdown">
//                         <button
//                             onClick={(e) => this.toggleDropdown(e)}
//                             class="p-4 w-full bg-white flex text-black-700 font-gotham hover:font-gotham-medium flex"
//                             id="filter-click"
//                         >
//                             By Category
//                             <SVGChevronDown
//                                 id="filter-svg"
//                                 className="pointer-events-none transition-all duration-300 transform h-6 w-6 text-black-500 ml-auto"
//                             />
//                         </button>
//                         <div
//                             id="filter-drawer"
//                             className="filter-drawer max-h-0 overflow-hidden"
//                         >
//                             <ul>
//                                 <li className="border-b border-black-100 text-sm pl-4">
//                                     <button className="p-4 w-full flex text-black-700 font-gotham hover:font-gotham-medium">
//                                         - Fruits
//                                     </button>
//                                 </li>
//                                 <li className="border-b border-black-100 text-sm pl-4">
//                                     <button className="p-4 w-full flex text-black-700 font-gotham hover:font-gotham-medium">
//                                         - Vegetables
//                                     </button>
//                                 </li>
//                                 <li className="border-b border-black-100 text-sm pl-4">
//                                     <button className="p-4 w-full flex text-black-700 font-gotham hover:font-gotham-medium">
//                                         - Herbs
//                                     </button>
//                                 </li>
//                                 <li className="border-b border-black-100 text-sm pl-4">
//                                     <button className="p-4 w-full flex text-black-700 font-gotham hover:font-gotham-medium">
//                                         - Seeds & Grains
//                                     </button>
//                                 </li>
//                                 <li className="border-b border-black-100 text-sm pl-4">
//                                     <button className="p-4 w-full flex text-black-700 font-gotham hover:font-gotham-medium">
//                                         - Liquids
//                                     </button>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                     {this.props.type !== "users" && (
//                         <div className="dropdown">
//                             <button
//                                 onClick={(e) => this.toggleDropdown(e)}
//                                 class="p-4 w-full bg-white flex text-black-700 font-gotham hover:font-gotham-medium flex"
//                                 id="filter-click"
//                             >
//                                 By Color
//                                 <SVGChevronDown
//                                     id="filter-svg"
//                                     className="pointer-events-none transition-all duration-300 transform h-6 w-6 text-black-500 ml-auto"
//                                 />
//                             </button>
//                             <div
//                                 id="filter-drawer"
//                                 className="filter-drawer max-h-0 overflow-hidden"
//                             >
//                                 <ul className="flex flex-wrap justify-between bg-white p-4">
//                                     {rainbow.map((color, key) =>
//                                         color === "custom" ? (
//                                             <li className="w-1/4 text-center">
//                                                 <ColorPicker />
//                                             </li>
//                                         ) : (
//                                             <li
//                                                 className={`w-1/4 text-center ${
//                                                     key < 4 && "mb-4"
//                                                 }`}
//                                             >
//                                                 <button
//                                                     style={{
//                                                         background: color,
//                                                     }}
//                                                     className="h-8 w-8 rounded-full shadow-sm border-4 border-black-200"
//                                                 ></button>
//                                             </li>
//                                         )
//                                     )}
//                                 </ul>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </aside>
//         );
//     }
// }

// const ColorPicker = () => {
//     const [color, setColor] = useState(null);

//     console.log("colorPicker", color);

//     return (
//         <button className="h-8 w-8 relative overflow-hidden">
//             <SVGColorSwatch style={{ color: color }} className="h-8 w-8 text-black-300" />
//             <input
//                 value={color}
//                 type="color"
//                 className="h-8 w-8 absolute top-0 left-0 opacity-0"
//                 name="colorPicker"
//                 onChange={(e) => setColor(e.target.value)}
//             />
//         </button>
//     );
// };

// export default Sidebar2;
