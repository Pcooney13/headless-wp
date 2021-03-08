import React from "react";
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { ReactComponent as SVGBlob } from './components/svgs/blob.svg';

// Starting point of our app
function App() {
    return (
        <Router>
            <Route
                render={({ location }) => {
                    return (
                    
                        <div className="mb-24 max-w-screen-lg mx-auto mt-6 bg-white pt-16 rounded-lg border border-black-200">
                            {console.log('local')}
                            {console.log(location)}
                            <div className="mx-6 flex max-w-screen-lg lg:m-auto relative">
                                <SVGBlob className="absolute w-72 h-72 fill-current text-green pl-4 left-0 top-0 left-0"/>
                                <img className="pl-12 relative" src={require('./dude.png')} alt={'dude'}/>
                                <p className="slide-in-left ease-out transition-all duration-300 pt-36 pl-8 font-gotham-bold text-gray-400 text-4xl">Aw snap some text</p>
                            </div>
                        </div>
                    
                    );
                }}
            />
        </Router>
    );
}

export default App;