//add onclick handler for categories
//click checks what category was clicked and runs through all posts for a match

//another handler for when image is clicekd changing it out from medium to large and zoom effect to look like a screen change

// Polish the transition from blurred image taking up screen to full size image
// Figure out the functionality for zomming from gallery card specifically not just top left corner

import React from 'react';

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
                <div className="App">
                    <h1>Resume</h1>
                    <div class="page mx-auto max-w-letter md:h-letter p-6 xsm:p-8 sm:p-9 md:p-16 bg-white">
                        <header class="flex items-center mb-9">
                            <div class="mr-5 text-base text-white bg-gray-700 font-medium print:bg-black px-3 py-2 leading-tight">
                                <div class="initials">P</div>
                                <div class="initials">C</div>
                                <div class="initials">D</div>
                            </div>
                            <h1 class="text-2xl font-semibold text-gray-700">
                                Pat Cooney
                            </h1>
                        </header>

                        <div class="md:col-2 print:col-2 col-gap-md md:h-letter-col print:h-letter-col col-fill">
                            <section>
                                <div class="col-break-avoid">
                                    <h2 class="mb-4 text-2sm text-gray-500 font-bold print:font-normal tracking-widest">
                                        ABOUT ME
                                    </h2>
                                    <article class="mb-4 col-break-avoid">
                                        <header>
                                            <h3 class="text-lg text-gray-700 font-semibold leading-heading">
                                                Developer
                                            </h3>
                                            <p class="text-m text-gray-600 leading-normal">
                                                Since 2015
                                            </p>
                                        </header>
                                        <p class="mt-1.5 text-m text-gray-700 leading-normal">
                                            Started playing with JavaScript and
                                            CSS since se­nior year of high
                                            school. Now, I’m using utility-first
                                            CSS. As for Ja­va­­Script, I'm
                                            practicing functional programming
                                            goodness.
                                        </p>
                                    </article>
                                </div>
                                <article class="mb-4 col-break-avoid">
                                    <header>
                                        <h3 class="text-lg text-gray-700 font-semibold leading-heading">
                                            Designer
                                        </h3>
                                        <p class="text-m text-gray-600 leading-normal">
                                            Since 2008
                                        </p>
                                    </header>
                                    <p class="mt-1.5 text-m text-gray-700 leading-normal">
                                        Started when the Theme Customizer was
                                        the future. Now, ready to dig into the
                                        Gutenberg editor. Also, I’m ex­ci­ted
                                        ab­out the possibilities of Gatsby and
                                        WP inter­ope­rability.
                                    </p>
                                </article>
                            </section>

                            <section class="mt-7">
                                <div class="col-break-avoid">
                                    <h2 class="mb-4 text-2sm text-gray-500 font-bold print:font-normal tracking-widest">
                                        EXPERIENCE
                                    </h2>

                                    <article class="mb-4 col-break-avoid">
                                        <header>
                                            <h3 class="text-lg text-gray-700 font-semibold leading-heading">
                                                LaunchPad Media
                                            </h3>
                                            <p class="text-m text-gray-600 leading-normal">
                                                February 2015 – Present |
                                                Front-End Developer
                                            </p>
                                        </header>
                                        <p class="mt-1.5 text-m text-gray-700 leading-normal">
                                            <b class="font-normal print:font-medium text-gray-600 print:text-black">
                                                (1)
                                            </b>{' '}
                                            Built doner pork chop;{' '}
                                            <b class="font-normal print:font-medium text-gray-600 print:text-black">
                                                (2)
                                            </b>{' '}
                                            Served salmon, cream soft cheese,
                                            and brisket;{' '}
                                            <b class="font-normal print:font-medium text-gray-600 print:text-black">
                                                (3)
                                            </b>{' '}
                                            Acted doner pork chop;{' '}
                                            <b class="font-normal print:font-medium text-gray-600 print:text-black">
                                                (4)
                                            </b>{' '}
                                            Filled burgdoggen frankfurter strip
                                            steak.
                                        </p>
                                    </article>
                                </div>

                                <article class="mb-4 col-break-avoid">
                                    <header>
                                        <h3 class="text-lg text-gray-700 font-semibold leading-heading">
                                            Whole Foods Market
                                        </h3>
                                        <p class="text-m text-gray-600 leading-normal">
                                            Mar 2013 – Jan 2015 | Store Graphic
                                            Designer
                                        </p>
                                    </header>
                                    <p class="mt-1.5 flex items-start justify-start text-m text-gray-700 leading-normal">
                                        <span class="icon-parent flex items-center justify-center flex-shrink-0">
                                            <svg
                                                class="w-4.5 h-4.5 print:pb-0.5"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24">
                                                <path
                                                    class="text-gray-600 print:text-gray-900 fill-current"
                                                    d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z"></path>
                                            </svg>
                                        </span>
                                        <span class="ml-1.5">
                                            Wrote doner pork chop t-bone ham
                                            meatloaf ve­ni­sons. Ribeye
                                            turducken pancetta sausage. Biltong
                                            atl. Yamoi.
                                        </span>
                                    </p>
                                    <p class="mt-1.5 flex items-start justify-start text-m text-gray-700 leading-normal">
                                        <span class="icon-parent flex items-center justify-center flex-shrink-0">
                                            <svg
                                                class="w-4.5 h-4.5 print:pb-0.5"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24">
                                                <path
                                                    class="text-gray-600 print:text-gray-900 fill-current"
                                                    d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z"></path>
                                            </svg>
                                        </span>
                                        <span class="ml-1.5">
                                            Tested beef rump beef ribs, shankle
                                            corned beef neck. Ribeye turducken
                                            pancetta sausage. Biltong atl.
                                            Yamoi.
                                        </span>
                                    </p>
                                </article>
                            </section>

                            <section class="mt-7">
                                <div class="col-break-avoid">
                                    <h2 class="mb-4 text-2sm text-gray-500 font-bold print:font-normal tracking-widest">
                                        EDUCATION
                                    </h2>

                                    <article class="mb-4 col-break-avoid">
                                        <header>
                                            <h3 class="text-lg text-gray-700 font-semibold leading-heading">
                                                University of Massachusetts Dartmouth
                                            </h3>
                                            <p class="text-m text-gray-600 leading-normal">
                                                2008 – 2012 | Bachelor's Degree in Fine Arts
                                            </p>
                                        </header>
                                    </article>
                                </div>

                                <article class="mb-4 col-break-avoid">
                                    <header>
                                        <h3 class="text-lg text-gray-700 font-semibold leading-heading">
                                            Minuteman Vocational High School
                                        </h3>
                                        <p class="text-m text-gray-600 leading-normal">
                                            2004 – 2008 | Certificate in Graphic Design
                                        </p>
                                    </header>
                                </article>
                            </section>

                            <section class="mt-7">
                                <div class="col-break-avoid">
                                    <h2 class="mb-4 text-2sm text-gray-500 font-bold print:font-normal tracking-widest">
                                        PROJECTS
                                    </h2>

                                    <article class="mb-4 col-break-avoid">
                                        <header>
                                            <h3 class="text-lg text-gray-700 font-semibold leading-heading">
                                                <a
                                                    href="https://www.compassioninactionconference.org/schedule"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    class="group">
                                                    <span>
                                                        Conference Schedule
                                                    </span>
                                                    <span class="icon-parent -ml-0.5 inline-flex items-center">
                                                        <svg
                                                            class="pb-0.7 w-5 text-gray-600 group-hover:text-gray-800 transition-color-1 print:hidden "
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            width="24"
                                                            height="24">
                                                            <path
                                                                class="fill-current"
                                                                d="M19 6.41L8.7 16.71a1 1 0 1 1-1.4-1.42L17.58 5H14a1 1 0 0 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V6.41zM17 14a1 1 0 0 1 2 0v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2h5a1 1 0 0 1 0 2H5v12h12v-5z"></path>
                                                        </svg>
                                                    </span>
                                                </a>
                                            </h3>
                                            <p class="text-m text-gray-600 leading-normal">
                                                2019 | JavaScript, Wordpress,
                                                PHP, CSS
                                            </p>
                                        </header>
                                        <p class="mt-1.5 text-m text-gray-700 leading-normal">
                                            Filet mignon burgdoggen tri-tip
                                            swine pork belly ham hock flank
                                            pork. Ribeye turducken pancetta
                                            sausage. Biltong atl. Bacon ham
                                            shankle, landjaeg pastrami beef ribs
                                            pork chop.
                                        </p>
                                    </article>
                                </div>

                                <article class="mb-4 col-break-avoid">
                                    <header>
                                        <h3 class="text-lg text-gray-700 font-semibold leading-heading">
                                            <a
                                                href="https://projectteachny.org/mmh/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                class="group">
                                                <span>
                                                    Maternal Mental Health
                                                    Consulations
                                                </span>
                                                <span class="icon-parent -ml-0.5 inline-flex items-center">
                                                    <svg
                                                        class="pb-0.7 w-5 text-gray-600 group-hover:text-gray-800 transition-color-1 print:hidden "
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        width="24"
                                                        height="24">
                                                        <path
                                                            class="fill-current"
                                                            d="M19 6.41L8.7 16.71a1 1 0 1 1-1.4-1.42L17.58 5H14a1 1 0 0 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V6.41zM17 14a1 1 0 0 1 2 0v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2h5a1 1 0 0 1 0 2H5v12h12v-5z"></path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </h3>
                                        <p class="text-m text-gray-600 leading-normal">
                                            2019 | JavaScript, Wordpress, PHP,
                                            CSS
                                        </p>
                                    </header>
                                    <p class="mt-1.5 text-m text-gray-700 leading-normal">
                                        Strip steak tail capicola alcatra ground
                                        round tenderloin ar. Venison tri-tip
                                        porchetta, brisket tenderloin pig beef
                                        ribies. Bacon ham shankle, landjaeg
                                        pastrami beef ribs pork chop.
                                    </p>
                                </article>

                                <article class="mb-4 col-break-avoid">
                                    <header>
                                        <h3 class="text-lg text-gray-700 font-semibold leading-heading">
                                            Fantastic Project
                                        </h3>
                                        <p class="text-m text-gray-600 leading-normal">
                                            2012 | JavaScript
                                        </p>
                                    </header>
                                    <p class="mt-1.5 text-m text-gray-700 leading-normal">
                                        Strip steak tail capicola alcatra ground
                                        round tenderloin ar. Venison tri-tip
                                        porchetta, brisket tenderloin pig beef
                                        ribies.
                                    </p>
                                </article>
                            </section>

                            <section class="mt-7">
                                <div class="col-break-avoid">
                                    <h2 class="mb-4 text-2sm text-gray-500 font-bold print:font-normal tracking-widest">
                                        SKILLS
                                    </h2>

                                    <article class="mb-4 col-break-avoid">
                                        <header>
                                            <h3 class="text-lg text-gray-700 font-semibold leading-heading">
                                                JavaScript
                                            </h3>
                                            <p class="text-m text-gray-600 leading-normal">
                                                Middle Level
                                            </p>
                                        </header>
                                        <p class="mt-1.5 text-m text-gray-700 leading-normal">
                                            Good parts: pure function,
                                            higher-order functions, factory
                                            functions, composition. Bad parts:
                                            inheritance, this, new.
                                        </p>
                                        <ul class="mt-1.5 mb-6 flex flex-wrap text-m leading-normal">
                                            <li class="px-3 mr-1.5 mt-1.5 text-base text-gray-700 leading-relaxed print:bg-white print:border-inset bg-gray-150">
                                                ES6
                                            </li>
                                            <li class="px-3 mr-1.5 mt-1.5 text-base text-gray-700 leading-relaxed print:bg-white print:border-inset bg-gray-150">
                                                React
                                            </li>
                                            <li class="px-3 mr-1.5 mt-1.5 text-base text-gray-700 leading-relaxed print:bg-white print:border-inset bg-gray-150">
                                                Functional Programming
                                            </li>
                                            <li class="px-3 mr-1.5 mt-1.5 text-base text-gray-700 leading-relaxed print:bg-white print:border-inset bg-gray-150">
                                                Node
                                            </li>
                                        </ul>
                                    </article>
                                </div>

                                <article class="mb-4 col-break-avoid">
                                    <header>
                                        <h3 class="text-lg text-gray-700 font-semibold leading-heading">
                                            Other
                                        </h3>
                                    </header>
                                    <ul class="py-1.5 leading-normal flex flex-wrap">
                                        <li class="px-3 mr-1.5 mt-1.5 text-base text-gray-700 leading-relaxed print:bg-white print:border-inset bg-gray-150">
                                            CSS
                                        </li>
                                        <li class="px-3 mr-1.5 mt-1.5 text-base text-gray-700 leading-relaxed print:bg-white print:border-inset bg-gray-150">
                                            PHP
                                        </li>
                                        <li class="px-3 mr-1.5 mt-1.5 text-base text-gray-700 leading-relaxed print:bg-white print:border-inset bg-gray-150">
                                            Git
                                        </li>
                                        <li class="px-3 mr-1.5 mt-1.5 text-base text-gray-700 leading-relaxed print:bg-white print:border-inset bg-gray-150">
                                            WordPress
                                        </li>
                                        <li class="px-3 mr-1.5 mt-1.5 text-base text-gray-700 leading-relaxed print:bg-white print:border-inset bg-gray-150">
                                            Linux Server
                                        </li>
                                        <li class="px-3 mr-1.5 mt-1.5 text-base text-gray-700 leading-relaxed print:bg-white print:border-inset bg-gray-150">
                                            UI Design
                                        </li>
                                        <li class="px-3 mr-1.5 mt-1.5 text-base text-gray-700 leading-relaxed print:bg-white print:border-inset bg-gray-150">
                                            Photoshop
                                        </li>
                                        <li class="px-3 mr-1.5 mt-1.5 text-base text-gray-700 leading-relaxed print:bg-white print:border-inset bg-gray-150">
                                            Illustrator
                                        </li>
                                        <li class="px-3 mr-1.5 mt-1.5 text-base text-gray-700 leading-relaxed print:bg-white print:border-inset bg-gray-150">
                                            Figma
                                        </li>
                                    </ul>
                                </article>
                            </section>

                            <section class="mt-7">
                                <div class="col-break-avoid">
                                    <h2 class="mb-4 text-2sm text-gray-500 font-bold print:font-normal tracking-widest">
                                        CONTACT
                                    </h2>

                                    <article class="mb-4 col-break-avoid">
                                        <ul>
                                            <li class="mt-1.5 flex items-start justify-start text-m text-gray-700 leading-normal">
                                                <span class="icon-parent flex items-center justify-center flex-shrink-0">
                                                    <svg
                                                        class="w-4.5 h-4.5"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        width="24"
                                                        height="24">
                                                        <path
                                                            class="text-gray-600 print:text-gray-900 fill-current"
                                                            d="M19.48 13.03A4 4 0 0 1 16 19h-4a4 4 0 1 1 0-8h1a1 1 0 0 0 0-2h-1a6 6 0 1 0 0 12h4a6 6 0 0 0 5.21-8.98L21.2 12a1 1 0 1 0-1.72 1.03zM4.52 10.97A4 4 0 0 1 8 5h4a4 4 0 1 1 0 8h-1a1 1 0 0 0 0 2h1a6 6 0 1 0 0-12H8a6 6 0 0 0-5.21 8.98l.01.02a1 1 0 1 0 1.72-1.03z"></path>
                                                    </svg>
                                                </span>
                                                <span class="ml-1.5">
                                                    pat-cooney.com
                                                </span>
                                            </li>
                                            <li class="mt-1.5 flex items-start justify-start text-m text-gray-700 leading-normal">
                                                <span class="icon-parent flex items-center justify-center flex-shrink-0">
                                                    <svg
                                                        class="w-4.5 h-4.5"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        width="24"
                                                        height="24">
                                                        <path
                                                            class="text-gray-600 print:text-gray-900 fill-current"
                                                            d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
                                                    </svg>
                                                </span>
                                                <span class="ml-1.5">
                                                    Woburn, Massachusetts
                                                </span>
                                            </li>
                                            <li class="mt-1.5 flex items-start justify-start text-m text-gray-700 leading-normal">
                                                <span class="icon-parent flex items-center justify-center flex-shrink-0">
                                                    <svg
                                                        class="w-4.5 h-4.5"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        width="24"
                                                        height="24">
                                                        <path
                                                            class="text-gray-600 print:text-gray-900 fill-current"
                                                            d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2zm16 3.38V6H4v1.38l8 4 8-4zm0 2.24l-7.55 3.77a1 1 0 0 1-.9 0L4 9.62V18h16V9.62z"></path>
                                                    </svg>
                                                </span>
                                                <span class="ml-1.5">
                                                    pat.cooney13@gmail.com
                                                </span>
                                            </li>
                                            <li class="mt-1.5 flex items-start justify-start text-m text-gray-700 leading-normal">
                                                <span class="icon-parent flex items-center justify-center flex-shrink-0">
                                                    <svg
                                                        class="w-4.5 h-4.5"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        width="24"
                                                        height="24">
                                                        <path
                                                            class="text-gray-600 print:text-gray-900 fill-current"
                                                            d="M13.04 14.69l1.07-2.14a1 1 0 0 1 1.2-.5l6 2A1 1 0 0 1 22 15v5a2 2 0 0 1-2 2h-2A16 16 0 0 1 2 6V4c0-1.1.9-2 2-2h5a1 1 0 0 1 .95.68l2 6a1 1 0 0 1-.5 1.21L9.3 10.96a10.05 10.05 0 0 0 3.73 3.73zM8.28 4H4v2a14 14 0 0 0 14 14h2v-4.58l-4.5-1.5-1.12 2.26a1 1 0 0 1-1.3.46 12.04 12.04 0 0 1-6.02-6.01 1 1 0 0 1 .46-1.3l2.26-1.14L8.28 4z"></path>
                                                    </svg>
                                                </span>
                                                <span class="ml-1.5">
                                                    617-642-4712
                                                </span>
                                            </li>
                                        </ul>
                                    </article>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            );
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
