import React from "react";
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { ReactComponent as SVGBlob } from './components/svgs/blob.svg';

// Starting point of our app
function Home() {
    return (
        <Router>
            <Route
                render={() => {
                    return (
                    
                        <div className="mt-24 mb-32 max-w-screen-lg mx-auto bg-white rounded-lg border border-black-200">
                            <div className="mx-6 flex max-w-screen-lg lg:m-auto relative overflow-hidden">
                                <SVGBlob className="absolute w-88 h-88 fill-current text-green left-0 bottom-0 left-0"/>
                                <img className="pl-16 mt-8 relative" src={require('./dude.png')} alt={'dude'}/>
                                <p className="slide-in-left ease-out transition-all duration-300 pt-52 pl-8 font-gotham-bold text-gray-400 text-4xl">Aw <span className="text-green">snap</span> some text</p>
                            </div>
                        </div>
                    
                    );
                }}
            />
        </Router>
    );
}

export default Home;