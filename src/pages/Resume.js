//add onclick handler for categories
//click checks what category was clicked and runs through all posts for a match

//another handler for when image is clicekd changing it out from medium to large and zoom effect to look like a screen change

// Polish the transition from blurred image taking up screen to full size image
// Figure out the functionality for zomming from gallery card specifically not just top left corner

import React from 'react';
import { ReactComponent as SVGExternalLink } from '../assets/svgs/external-link.svg'

class Resume extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
        };
    }

    render() {
        
        window.scrollTo(0, 0);
        const { error, isLoaded } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return (
                <div className="mx-auto max-w-screen-lg">
                    <h3 class="text-2xl font-gotham-medium capitalize my-4">Resume</h3>
                    <div className="page mx-auto max-w-screen-lg md:h-letter p-6 xsm:p-8 sm:p-9 md:p-16 bg-white mb-8">
                        <header className="flex items-center mb-9">
                            <h1 className="text-2xl font-semibold text-gray-700">Pat Cooney</h1>
                        </header>

                        <div className="flex">
                            <div className="mr-4 flex-1">
                                <section>
                                    <div className="col-break-avoid w-full">
                                        <h2 className="mb-4 tracking-widest">ABOUT ME</h2>
                                        <article className="mb-4">
                                            <header>
                                                <h3 className="text-lg font-gotham-medium leading-tight">Developer</h3>
                                                <p className="text-black-500">Since 2015</p>
                                            </header>
                                            <p className="mt-1.5 text-m text-gray-700 leading-normal">
                                                Started playing with JavaScript and CSS since se­nior year of high
                                                school. Now, I’m using utility-first CSS. As for Ja­va­­Script, I'm
                                                practicing functional programming goodness.
                                            </p>
                                        </article>
                                        <article className="mb-4 col-break-avoid">
                                            <header>
                                                <h3 className="text-lg text-gray-700 font-semibold leading-heading">
                                                    Designer
                                                </h3>
                                                <p className="text-black-500">Since 2008</p>
                                            </header>
                                            <p className="mt-1.5 text-m text-gray-700 leading-normal">
                                                Started when the Theme Customizer was the future. Now, ready to dig into
                                                the Gutenberg editor. Also, I’m ex­ci­ted ab­out the possibilities of
                                                Gatsby and WP inter­ope­rability.
                                            </p>
                                        </article>
                                    </div>
                                </section>

                                <section className="mt-7">
                                    <div className="col-break-avoid">
                                        <h2 className="mb-4 tracking-widest">EXPERIENCE</h2>

                                        <article className="mb-4 col-break-avoid">
                                            <header>
                                                <h3 className="text-lg text-gray-700 font-semibold leading-heading">
                                                    LaunchPad Media
                                                </h3>
                                                <p className="text-black-500">
                                                    February 2015 – Present | Front-End Developer
                                                </p>
                                            </header>
                                            <p className="mb-2 mt-1.5 text-m text-gray-700 leading-normal">
                                                Strip steak tail capicola alcatra ground round tenderloin ar. Venison
                                                tri-tip porchetta, brisket tenderloin pig beef ribies. Bacon ham
                                                shankle, landjaeg pastrami beef ribs pork chop. Strip steak tail
                                            </p>
                                            <p>
                                                capicola alcatra ground round tenderloin ar. Venison tri-tip porchetta,
                                                brisket tenderloin pig beef ribies. Bacon ham shankle, landjaeg pastrami
                                                beef ribs pork chop.
                                            </p>
                                        </article>
                                    </div>

                                    <article className="mb-4 col-break-avoid">
                                        <header>
                                            <h3 className="text-lg text-gray-700 font-semibold leading-heading">
                                                Whole Foods Market
                                            </h3>
                                            <p className="text-m text-black-500 leading-normal">
                                                Mar 2013 – Jan 2015 | Store Graphic Designer
                                            </p>
                                        </header>
                                        <p className="mt-1.5 flex items-start justify-start text-m text-gray-700 leading-normal">
                                            Wrote doner pork chop t-bone ham meatloaf ve­ni­sons. Ribeye turducken
                                            pancetta sausage. Biltong atl. Yamoi.
                                        </p>
                                    </article>
                                </section>

                                <section className="mt-7">
                                    <div className="col-break-avoid">
                                        <h2 className="mb-4 tracking-widest">EDUCATION</h2>

                                        <article className="mb-4 col-break-avoid">
                                            <header>
                                                <h3 className="text-lg text-gray-700 font-semibold leading-heading">
                                                    University of Massachusetts Dartmouth
                                                </h3>
                                                <p className="text-black-500">
                                                    2008 – 2012 | Bachelor's Degree in Fine Arts
                                                </p>
                                            </header>
                                        </article>
                                    </div>

                                    <article className="mb-4 col-break-avoid">
                                        <header>
                                            <h3 className="text-lg text-gray-700 font-semibold leading-heading">
                                                Minuteman Vocational High School
                                            </h3>
                                            <p className="text-black-500">
                                                2004 – 2008 | Certificate in Graphic Design
                                            </p>
                                        </header>
                                    </article>
                                </section>
                            </div>
                            {/* BREAK HERE */}
                            <div className="ml-4 flex-1">
                                <section>
                                    <div className="col-break-avoid">
                                        <h2 className="mb-4 tracking-widest">PROJECTS</h2>

                                        <article className="mb-4 col-break-avoid">
                                            <header>
                                                <h3 className="text-lg text-gray-700 font-semibold leading-heading">
                                                    <a
                                                        href="https://www.compassioninactionconference.org/schedule"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="group"
                                                    >
                                                        <span>Conference Schedule</span>
                                                    </a>
                                                </h3>
                                                <p className="text-black-500">2019 | JavaScript, Wordpress, PHP, CSS</p>
                                            </header>
                                            <p className="mt-1.5 text-m text-gray-700 leading-normal">
                                                Filet mignon burgdoggen tri-tip swine pork belly ham hock flank pork.
                                                Ribeye turducken pancetta sausage. Biltong atl. Bacon ham shankle,
                                                landjaeg pastrami beef ribs pork chop.
                                            </p>
                                        </article>
                                    </div>

                                    <article className="mb-4 col-break-avoid">
                                        <header>
                                            <h3 className="text-lg text-gray-700 font-semibold leading-heading">
                                                <a
                                                    href="https://projectteachny.org/mmh/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group"
                                                >
                                                    <span>Maternal Mental Health Consulations</span>
                                                </a>
                                            </h3>
                                            <p className="text-black-500">2019 | JavaScript, Wordpress, PHP, CSS</p>
                                        </header>
                                        <p className="mt-1.5 text-m text-gray-700 leading-normal">
                                            Strip steak tail capicola alcatra ground round tenderloin ar. Venison
                                            tri-tip porchetta, brisket tenderloin pig beef ribies. Bacon ham shankle,
                                            landjaeg pastrami beef ribs pork chop. pig beef ribies. Bacon ham shankle,
                                            landjaeg pastrami beef ribs pork chop.
                                        </p>
                                    </article>

                                    <article className="mb-4 col-break-avoid">
                                        <header>
                                            <a className="items-center flex" href="SVGExternalLink">
                                                <h3 className="text-lg text-gray-700 font-semibold leading-heading">
                                                    Project TEACH
                                                </h3>
                                                <SVGExternalLink />
                                            </a>
                                            <p className="text-black-500">2017 | Wordpress, PHP, CSS, JavaScript</p>
                                        </header>
                                        <p className="mt-1.5 text-m text-gray-700 leading-normal mb-2">
                                            Strip steak tail capicola alcatra ground round tenderloin ar. Venison
                                            tri-tip porchetta, brisket tenderloin pig beef ribies. oin ar. Venison
                                            tri-tip porchetta, brisket tenderloin pig beef ribies.
                                        </p>
                                        <p>
                                            pig beef ribies. Bacon ham shankle, landjaeg pastrami beef ribs pork chop.
                                        </p>
                                    </article>
                                </section>

                                <section className="mt-7">
                                    <div className="col-break-avoid">
                                        <h2 className="mb-4 tracking-widest">SKILLS</h2>

                                        <article className="mb-4 col-break-avoid">
                                            <header>
                                                <h3 className="text-lg text-gray-700 font-semibold leading-heading">
                                                    JavaScript
                                                </h3>
                                                <p className="text-black-500">Middle Level</p>
                                            </header>
                                            <p className="mt-1.5 text-m text-gray-700 leading-normal">
                                                Good parts: pure function, higher-order functions, factory functions,
                                                composition. Bad parts: inheritance, this, new.
                                            </p>
                                            {/* <ul className="mt-1.5 mb-6 flex flex-wrap text-m leading-normal">
                                                <li className="px-3 mr-1.5 mt-1.5 text-base text-gray-700 leading-relaxed print:bg-white print:border-inset bg-gray-150">
                                                    ES6
                                                </li>
                                                <li className="px-3 mr-1.5 mt-1.5 text-base text-gray-700 leading-relaxed print:bg-white print:border-inset bg-gray-150">
                                                    React
                                                </li>
                                                <li className="px-3 mr-1.5 mt-1.5 text-base text-gray-700 leading-relaxed print:bg-white print:border-inset bg-gray-150">
                                                    Functional Programming
                                                </li>
                                                <li className="px-3 mr-1.5 mt-1.5 text-base text-gray-700 leading-relaxed print:bg-white print:border-inset bg-gray-150">
                                                    Node
                                                </li>
                                            </ul> */}
                                        </article>
                                    </div>

                                    {/* <article className="mb-4 col-break-avoid">
                                        <header>
                                            <h3 className="text-lg text-gray-700 font-semibold leading-heading">
                                                Other
                                            </h3>
                                        </header>
                                        <ul className="py-1.5 leading-normal flex flex-wrap">
                                            <li className="px-3 mr-1.5 mt-1.5 text-base text-gray-700 leading-relaxed print:bg-white print:border-inset bg-gray-150">
                                                CSS
                                            </li>
                                            <li className="px-3 mr-1.5 mt-1.5 text-base text-gray-700 leading-relaxed print:bg-white print:border-inset bg-gray-150">
                                                PHP
                                            </li>
                                            <li className="px-3 mr-1.5 mt-1.5 text-base text-gray-700 leading-relaxed print:bg-white print:border-inset bg-gray-150">
                                                Git
                                            </li>
                                            <li className="px-3 mr-1.5 mt-1.5 text-base text-gray-700 leading-relaxed print:bg-white print:border-inset bg-gray-150">
                                                WordPress
                                            </li>
                                            <li className="px-3 mr-1.5 mt-1.5 text-base text-gray-700 leading-relaxed print:bg-white print:border-inset bg-gray-150">
                                                Linux Server
                                            </li>
                                            <li className="px-3 mr-1.5 mt-1.5 text-base text-gray-700 leading-relaxed print:bg-white print:border-inset bg-gray-150">
                                                UI Design
                                            </li>
                                            <li className="px-3 mr-1.5 mt-1.5 text-base text-gray-700 leading-relaxed print:bg-white print:border-inset bg-gray-150">
                                                Photoshop
                                            </li>
                                            <li className="px-3 mr-1.5 mt-1.5 text-base text-gray-700 leading-relaxed print:bg-white print:border-inset bg-gray-150">
                                                Illustrator
                                            </li>
                                            <li className="px-3 mr-1.5 mt-1.5 text-base text-gray-700 leading-relaxed print:bg-white print:border-inset bg-gray-150">
                                                Figma
                                            </li>
                                        </ul>
                                    </article> */}
                                </section>

                                <section className="mt-7">
                                    <div className="col-break-avoid">
                                        <h2 className="mb-4 tracking-widest">CONTACT</h2>

                                        <article className="mb-4 col-break-avoid">
                                            <ul>
                                                <li className="mt-1.5 flex items-start justify-start text-m text-gray-700 leading-normal">
                                                    <span className="icon-parent flex items-center justify-center flex-shrink-0">
                                                        <svg
                                                            className="w-4.5 h-4.5"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            width="24"
                                                            height="24"
                                                        >
                                                            <path
                                                                className="text-gray-600 print:text-gray-900 fill-current"
                                                                d="M19.48 13.03A4 4 0 0 1 16 19h-4a4 4 0 1 1 0-8h1a1 1 0 0 0 0-2h-1a6 6 0 1 0 0 12h4a6 6 0 0 0 5.21-8.98L21.2 12a1 1 0 1 0-1.72 1.03zM4.52 10.97A4 4 0 0 1 8 5h4a4 4 0 1 1 0 8h-1a1 1 0 0 0 0 2h1a6 6 0 1 0 0-12H8a6 6 0 0 0-5.21 8.98l.01.02a1 1 0 1 0 1.72-1.03z"
                                                            ></path>
                                                        </svg>
                                                    </span>
                                                    <span className="ml-1.5">pat-cooney.com</span>
                                                </li>
                                                <li className="mt-1.5 flex items-start justify-start text-m text-gray-700 leading-normal">
                                                    <span className="icon-parent flex items-center justify-center flex-shrink-0">
                                                        <svg
                                                            className="w-4.5 h-4.5"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            width="24"
                                                            height="24"
                                                        >
                                                            <path
                                                                className="text-gray-600 print:text-gray-900 fill-current"
                                                                d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                                                            ></path>
                                                        </svg>
                                                    </span>
                                                    <span className="ml-1.5">Woburn, Massachusetts</span>
                                                </li>
                                                <li className="mt-1.5 flex items-start justify-start text-m text-gray-700 leading-normal">
                                                    <span className="icon-parent flex items-center justify-center flex-shrink-0">
                                                        <svg
                                                            className="w-4.5 h-4.5"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            width="24"
                                                            height="24"
                                                        >
                                                            <path
                                                                className="text-gray-600 print:text-gray-900 fill-current"
                                                                d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2zm16 3.38V6H4v1.38l8 4 8-4zm0 2.24l-7.55 3.77a1 1 0 0 1-.9 0L4 9.62V18h16V9.62z"
                                                            ></path>
                                                        </svg>
                                                    </span>
                                                    <span className="ml-1.5">pat.cooney13@gmail.com</span>
                                                </li>
                                                <li className="mt-1.5 flex items-start justify-start text-m text-gray-700 leading-normal">
                                                    <span className="icon-parent flex items-center justify-center flex-shrink-0">
                                                        <svg
                                                            className="w-4.5 h-4.5"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            width="24"
                                                            height="24"
                                                        >
                                                            <path
                                                                className="text-gray-600 print:text-gray-900 fill-current"
                                                                d="M13.04 14.69l1.07-2.14a1 1 0 0 1 1.2-.5l6 2A1 1 0 0 1 22 15v5a2 2 0 0 1-2 2h-2A16 16 0 0 1 2 6V4c0-1.1.9-2 2-2h5a1 1 0 0 1 .95.68l2 6a1 1 0 0 1-.5 1.21L9.3 10.96a10.05 10.05 0 0 0 3.73 3.73zM8.28 4H4v2a14 14 0 0 0 14 14h2v-4.58l-4.5-1.5-1.12 2.26a1 1 0 0 1-1.3.46 12.04 12.04 0 0 1-6.02-6.01 1 1 0 0 1 .46-1.3l2.26-1.14L8.28 4z"
                                                            ></path>
                                                        </svg>
                                                    </span>
                                                    <span className="ml-1.5">617-642-4712</span>
                                                </li>
                                            </ul>
                                        </article>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                    <a href="https://universal-resume.netlify.app">src</a>
                </div>
            )
        } else {
            return (
                <div className="App">
                    <h1>Resume</h1>
                        <p>no content</p>
                </div>
            );
        }
    }
}

export default Resume;
