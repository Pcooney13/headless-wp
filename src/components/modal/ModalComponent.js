// Look into banners or somethign  for letting user know they logged in/fucked up

//====================================================================================================================================
// Log in/out   + works
//====================================================================================================================================
// Sign up      + creates user 
//              - No first/last name assignment available - no image
//              - Send email to users email and have them click link to confirm membership then log in ideally
//              - Maybe can send user first/last name in url and set it on confirm - but what about image?
//====================================================================================================================================
// Forgot PW    + sends user email 
//              - email links to Wordpress looking-ass login page
//====================================================================================================================================

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./Modal";
import Cookies from "js-cookie";
import { ReactComponent as SVGCloseX } from '../../assets/svgs/close-x.svg'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function ModalComponent(props) {
    
    const transition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] };

    const [form, setForms] = useState({
        isOpen: false,
        form: undefined,
        dropDown: false,
        ddOpen: false,
    });

    function handlOpenModal(open, formname) {
        if (formname) {
            setForms({
                isOpen: true,
                form: formname,
            });
        } else {
            setForms({
                isOpen: false,
            });
        }
    }

    function toggleDropdown(logout) {
        setForms({
            isOpen: form.isOpen,
            form: form.form,
            dropDown: form.dropDown,
            ddOpen: !form.ddOpen,
        });
        console.log(logout)
        if (logout === "logout") {
            Cookies.remove("wp-auth-token");
            Cookies.remove("username");
            Cookies.remove("userImageLink");
            Cookies.remove("name");
            Cookies.remove("user_id");
        }
    }

    function handlelogin(e) {
        e.preventDefault();
        const data = new FormData(e.target);

        fetch("https://pat-cooney.com/wp-json/jwt-auth/v1/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                username: data.get("username"),
                password: data.get("password"),
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.status);
                }
                if (200 === response.status) {
                    return response.json();
                }
            })
            .then((post) => {
                console.log("user logged in", post.user_nicename);
                //JWT AUTH TOKEN SET
                Cookies.set("wp-auth-token", post.token);
                console.log(Cookies.get("wp-auth-token"))
                return fetch(
                    `https://pat-cooney.com/wp-json/v1/users/${post.user_nicename}`
                )
                    .then((boobs) => {
                        return boobs.json();
                    })
                    .then((data) => {
                        if (data.image.thumb) {
                            Cookies.set("username", data.slug);
                            Cookies.set(
                                "name",
                                `${data.first_name} ${data.last_name}`
                            );
                            Cookies.set("user_id", data.id);
                            Cookies.set("userImageLink", data.image.thumb);
                            handlOpenModal(false);
                        }
                    });
            })
            .catch(function (error) {
                console.log(error);
                if (error.message === "403") {
                    toast.error('you entered your stuff wrong, bubs')
                }
            });
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
    }

    // Creates New User - no image option - firstname/lastname not saving to fields in WP
    function handleSignIn(e) {
        e.preventDefault()
        const data = new FormData(e.target)
        if (data.get('password') !== data.get('re-password')) {
            alert('passwords do not match')
        } else {
            const username = data.get('username')
            const first_name = data.get('firstname')
            const last_name = data.get('lastname')
            const email = data.get('email')
            const password = data.get('password')

            fetch('https://pat-cooney.com/wp-json/wp/v2/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    firstname: first_name,
                    first_name: first_name,
                    user_first_name: first_name,
                    user_firstname: first_name,
                    user_last_name: last_name,
                    website: last_name,
                    email: email,
                }),
            })
                .then(function (response) {
                    console.log(response)
                    if (!response.ok) {
                        throw Error(response.status)
                    }
                    if (200 === response.status) {
                        return response.json()
                    }
                })
                .then(function (post) {
                    // Cookies.set('wp-auth-token', post.token);
                    Cookies.set(post.token);
                    console.log('success', post)
                    console.log(post.id)
                })
                .catch(function (error) {
                    console.log(error)
                    if (error.message === '403') {
                        console.log('error on sign up')
                    }
                })
            document.getElementById('username').value = ''
            document.getElementById('email').value = ''
            document.getElementById('password').value = ''
            document.getElementById('re-password').value = ''
            document.getElementById('firstname').value = ''
            document.getElementById('lastname').value = ''
            handlOpenModal(false)
        }
    }

    // Creates New User - no image option - firstname/lastname not saving to fields in WP
    function handleForgotPW(e) {
        e.preventDefault()
        const data = new FormData(e.target)
            const email = data.get('email')

            fetch('https://pat-cooney.com/wp-json/wp/v2/users/lost-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_login: email,
                }),
            })
                .then(function (response) {
                    console.log(response)
                    if (!response.ok) {
                        throw Error(response.status)
                    }
                    if (200 === response.status) {
                        return response.json()
                    }
                })
                .then(function (post) {
                    // Cookies.set('wp-auth-token', post.token);
                    console.log('success', post)
                    console.log(post.id)
                })
                .catch(function (error) {
                    console.log(error)
                    if (error.message === '403') {
                        console.log('error on sign up')
                    }
                })
            
            document.getElementById('email').value = ''
            handlOpenModal(false)
    }
    
    const CloseButton = ({ closeToast }) => (
    <SVGCloseX
        className="w-6 h-6 top-4 mb-px right-4 opacity-75 hover:opacity-100 transition-all duration-300 transform hover:scale-125 fill-current"
        onClick={closeToast}
    >
        {' '}
        delete
    </SVGCloseX>
)
    // dynamic content based on if user is logged in
    let content = null;
    let dropdown = null;    

    if (form.form === "log_in") {
        content = (
            <div className="w-full flex-col flex justify-center items-center">
                <form
                    className="form py-4 px-8"
                    onSubmit={(e) => handlelogin(e)}
                >
                    <h2 className="font-gotham-bold" id="modal-title">
                        Log in
                    </h2>
                    <div className="input" id="modal-username">
                        <label>Username:</label>
                        <input
                            id="username"
                            className="username"
                            type="text"
                            maxLength="16"
                            name="username"
                        />
                    </div>
                    <div className="input" id="modal-password">
                        <label>Password:</label>
                        <input
                            id="password"
                            className="password"
                            type="password"
                            name="password"
                        />
                    </div>
                    <button type="submit" id="modal-submit" className="submit">
                        Login
                    </button>
                    <p
                        onClick={() => handlOpenModal(true, "sign_in")}
                        id="modal-btn-left"
                    >
                        Sign up
                    </p>
                    <p
                        onClick={() => handlOpenModal(true, "forgot_pw")}
                        id="modal-btn-right"
                    >
                        Forgot Password
                    </p>
                </form>
            </div>
        );
    }
    if (form.form === "sign_in") {
        content = (
            <div className="w-full flex-col flex justify-center items-center">
                <form
                    className="form py-4 px-8"
                    onSubmit={(e) => handleSignIn(e)}
                >
                    <h2 className="font-gotham-bold" id="modal-title">
                        Sign up
                    </h2>
                    <div className="input input__half" id="modal-firstname">
                        <label>First Name:</label>
                        <input
                            id="firstname"
                            className="firstname"
                            type="text"
                            maxLength="16"
                            name="firstname"
                        />
                    </div>
                    <div className="input input__half" id="modal-lastname">
                        <label>Last Name:</label>
                        <input
                            id="lastname"
                            className="lastname"
                            type="text"
                            maxLength="16"
                            name="lastname"
                        />
                    </div>
                    <div className="input" id="modal-email">
                        <label>Email:</label>
                        <input
                            id="email"
                            className="email"
                            type="email"
                            name="email"
                        />
                    </div>
                    <div className="input" id="modal-username">
                        <label>Username:</label>
                        <input
                            id="username"
                            className="username"
                            type="text"
                            maxLength="16"
                            name="username"
                        />
                    </div>
                    <div className="input input__half" id="modal-password">
                        <label>Password:</label>
                        <input
                            id="password"
                            className="password"
                            type="password"
                            name="password"
                        />
                    </div>
                    <div className="input input__half" id="modal-re-password">
                        <label>Confirm Password:</label>
                        <input
                            id="re-password"
                            className="re-password"
                            type="password"
                            name="re-password"
                        />
                    </div>
                    <button type="submit" id="modal-submit" className="submit">
                        Sign up
                    </button>
                    <p
                        onClick={() => handlOpenModal(true, 'log_in')}
                        id="modal-btn-left"
                    >
                        Log in
                    </p>
                    <p
                        onClick={() => handlOpenModal(true, 'forgot_pw')}
                        id="modal-btn-right"
                    >
                        Forgot Password
                    </p>
                </form>
            </div>
        )
    }
    if (form.form === "forgot_pw") {
        content = (
            <div className="w-full flex-col flex justify-center items-center">
                <form
                    className="form py-4 px-8"
                    onSubmit={(e) => handleForgotPW(e)}
                >
                    <h2 className="font-gotham-bold" id="modal-title">
                        Forgot Password
                    </h2>
                    <div className="input" id="modal-email">
                        <label>Email:</label>
                        <input
                            id="email"
                            className="email"
                            type="email"
                            name="email"
                        />
                    </div>
                    <button type="submit" id="modal-submit" className="submit">
                        Login
                    </button>
                    <p
                        onClick={() => handlOpenModal(true, 'log_in')}
                        id="modal-btn-left"
                    >
                        Login
                    </p>
                    <p
                        onClick={() => handlOpenModal(true, 'sign_in')}
                        id="modal-btn-right"
                    >
                        Sign Up
                    </p>
                </form>
            </div>
        )
    }
    if (form.ddOpen) {
        dropdown = (
            <div>
                <motion.ul
                    initial={{
                        opacity: 0,
                        y: 16,
                    }}
                    animate={{
                        opacity: '100%',
                        y: 0,
                    }}
                    exit={{
                        opacity: 0,
                        y: 50,
                    }}
                    transition={{ ...transition }}
                    style={{ zIndex: -100 }}
                    className="h-32 absolute top-0 h-auto mt-16 bg-white max-w-screen-xs w-full right-0"
                >
                    <li className="h-16 text-black-800 transition-color duration-500 border-b border-black-100 p-4 w-full p-0 hover:bg-blue-200">
                        <Link
                            className="text-black-800"
                            onClick={() => {
                                toggleDropdown()
                            }}
                            to={`/users/${Cookies.get('username')}`}
                        >
                            My Page
                        </Link>
                    </li>
                    <li
                        onClick={(e) => {
                            toggleDropdown('logout')
                        }}
                        className="h-16 text-black-800 transition-color duration-500 border-b border-black-100 p-4 w-full p-0 hover:bg-blue-200"
                    >
                        <span>Log Out</span>
                    </li>
                </motion.ul>
            </div>
        )
    }
    return Cookies.get('username') !== undefined ? (
        // User logged in
        <div className="ml-auto">
            <button className="text-white flex items-center p-4" onClick={() => toggleDropdown()}>
                <img
                    className="mr-2 h-8 w-8 pointer-events-none rounded-full"
                    src={Cookies.get('userImageLink')}
                    alt="user pic"
                />
                <p className="pointer-events-none">{Cookies.get('name')}</p>
            </button>
            <AnimatePresence exitBeforeEnter>{dropdown}</AnimatePresence>
        </div>
    ) : (
        // No user logged in
        <div className="ml-auto">            
            <ToastContainer autoClose={15000} closeButton={CloseButton} />
            <button className="text-white opacity-50 p-4" onClick={() => handlOpenModal(true, 'log_in')}>
                Login
            </button>
            <button className="text-white p-4" onClick={() => handlOpenModal(true, 'sign_in')}>
                Sign Up
            </button>
            <Modal isOpen={form.isOpen} handleClose={() => handlOpenModal(false)}>
                {content}
            </Modal>
        </div>
    )
}

export default ModalComponent;
