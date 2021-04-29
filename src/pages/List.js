import React, { useState, useEffect } from 'react'
import Sidebar3 from "../components/sidebar/Sidebar3";
import axios from 'axios'

import Card from "../components/Card";


const List = (props) => {
    let currentPage = props.location.pathname.substr(1);
    const url = `https://pat-cooney.com/wp-json/v1/${props.location.pathname.substr(1)}?per_page=10`;
    const [products, setProducts] = useState({
        loading: false,
        data: null,
        active:null,
        error:false,
    })

    useEffect(() => {
        setProducts({
            loading:true,
            data:null,
            active:null,
            error:false,
        })
        axios.get(url)
            .then((response) => {
                setProducts({
                    loading: false,
                    data: response.data,
                    active:null,
                    error: false,
                })  
            })
            .catch(() => {
                setProducts({
                    loading: false,
                    data: null,
                    active:null,
                    error: true,
                })
            })
    }, [url])
    
    function activeUser(post_id) {
        console.log(post_id)
    }

    function sortItems(sortedCards) {
        setProducts({
            loading: false,
            data: sortedCards,
            active: null,
            error: false,
        });
    }

    let content = null

    if (products.error) {
        content = <p>There was an error, please try again.</p>;
    }
    if (products.loading) {
        content = <p className="text-black-300">Loading ...</p>;
    }
    if (products.active) {
        content = <Card displayItem={products.active} />;
    } else if (products.data) {
        const searchBar = document.querySelector("input[name=search]");

        document.addEventListener("keyup", function (event) {
            if (event.key === "/") {
                searchBar.focus();
                console.log("clicked /")
            }
        });
        content = products.data.map((product, key) => (
            <Card
                {...props}
                key={key}
                number={key+1}
                total={products.data.length}
                displayItem={product}
                currentCategory={props.type}
                activeUser={activeUser}
            />
        ));
    }

    return (
        <div className="App max-w-screen-lg p-0 m-auto">
            <h3 className="text-2xl font-gotham-medium capitalize my-4">
                {currentPage}
            </h3>
            <div className="flex flex-col md:flex-row justify-center max-w-screen-md m-auto mb-12">
                <main className="mt-0 flex-1 width-full max-w-screen-md font-gotham">
                    {content}
                </main>
                <Sidebar3
                    {...props}
                    products={products.data}
                    sortItems={sortItems}
                />
            </div>
        </div>
    );
}

export default List