import React from "react";
import { ReactComponent as SVGBlob } from "../assets/svgs/blob.svg";
import { motion } from "framer-motion";

const transition = {duration:.6, ease: [0.43, 0.13, 0.23, 0.96]}

// Starting point of our app
function Home() {
    return (
        <div>
            <div className="mt-24 mb-32 max-w-screen-lg mx-auto bg-white rounded-lg border border-black-200">
                <div className="mx-6 flex max-w-screen-lg lg:m-auto relative overflow-hidden">
                    <SVGBlob className="absolute w-88 h-88 fill-current text-green left-0 bottom-0 left-0" />
                    <img className="pl-16 mt-8 relative" src={require('../assets/images/dude.png')} alt={'dude'} />
                    <motion.p
                        initial={{ x: 160, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={transition}
                        exit={{ x: 0 }}
                        className="ease-out transition-all duration-300 pt-52 pl-8 font-gotham-bold text-gray-400 text-4xl"
                    >
                        Aw <span className="text-bright-green">snap</span> some text
                    </motion.p>
                </div>
            </div>
            <div className="mx-auto max-w-screen-sm mb-32">
                <a
                    className="text-green hover:text-black p-2 w-full block text-center"
                    href="https://dpi.wi.gov/sites/default/files/imce/school-nutrition/pdf/vegetable-subgroups.pdf"
                >
                    Veggie Info
                </a>
                <a
                    className="text-green hover:text-black p-2 w-full block text-center"
                    href="http://facsfinalproject.weebly.com/6-categories-of-fruits.html"
                >
                    Fruit Info
                </a>
                <a
                    className="text-green hover:text-black p-2 w-full block text-center"
                    href="http://facsfinalproject.weebly.com/6-categories-of-fruits.html"
                >
                    Scientific Names
                </a>
                <a
                    className="text-green hover:text-black p-2 w-full block text-center"
                    href="https://color-hex.org/color/126b4c"
                >
                    Harmonious Greens
                </a>
            </div>
            {/* <!-- Product Item --> */}
            <div className="w-full max-w-screen-lg rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
                <div className="md:flex items-center -mx-10">
                    <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                        <div className="relative">
                            <img
                                src="https://pat-cooney.com/app/themes/juicy/assets/images/product-img.png"
                                className="w-full relative z-10"
                                alt=""
                            />
                            <div className="inset-8 border-4 border-blue absolute z-0"></div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-10">
                        <div className="mb-10">
                            <h1 className="font-bold uppercase text-2xl mb-5">
                                Mens's Ragged <br />
                                Waterproof Jacket
                            </h1>
                            <p className="text-sm">
                                Lorem ipsum dolor sit, amet consectetur adipisicing, elit. Eos, voluptatum dolorum!
                                Laborum blanditiis consequatur, voluptates, sint enim fugiat saepe, dolor fugit, magnam
                                explicabo eaque quas id quo porro dolorum facilis...{' '}
                                <a
                                    href="/"
                                    className="opacity-50 text-gray-900 hover:opacity-100 inline-block text-xs leading-none border-b border-gray-900"
                                >
                                    MORE <i className="mdi mdi-arrow-right"></i>
                                </a>
                            </p>
                        </div>
                        <div>
                            <div className="inline-block align-bottom mr-5">
                                <span className="text-2xl leading-none align-baseline">$</span>
                                <span className="font-bold text-5xl leading-none align-baseline">59</span>
                                <span className="text-2xl leading-none align-baseline">.99</span>
                            </div>
                            <div className="inline-block align-bottom">
                                <button className="bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold">
                                    <i className="mdi mdi-cart -ml-2 mr-2"></i> BUY NOW
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
