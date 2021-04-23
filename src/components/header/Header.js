//create a new user --> [SIGN UP] button

//



import React from 'react';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import UserLogIn from './UserLogIn';


class Header extends React.Component {

    

    // for some reason only Admin level can do this?
    // subscriber level can upload photos on Photos.js so figure out where and bring it over
    submitNewAvatar(e) {
        e.preventDefault();

        const rootURL = 'https://pat-cooney.com';
        const mediaEndpoint = rootURL + '/wp-json/wp/v2/media/';
        const userEndpoint = rootURL + '/wp-json/wp/v2/users/me';

        const wrapper = document.getElementById('profile-wrapper');
        const name = document.getElementById('name');
        const description = document.getElementById('description');
        const profilePic = document.getElementById('profile-pic');
        const profilePicInput = document.getElementById('profile-pic-input');
        const fileLabel = document.querySelector('.custom-file-label');

        const formData = new FormData();
        formData.append('file', profilePicInput.files[0]);
        // console.log(Cookies.get('wp-auth-token'))
        //send image to media library
        fetch(mediaEndpoint, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + Cookies.get('wp-auth-token'),
            },
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                const input = {
                    profile_image: data.source_url
                };
                //send image url to backend
                fetch(userEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + Cookies.get('wp-auth-token'),
                    },
                    body: JSON.stringify(input)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        //clear file input text content
                        fileLabel.textContent = '';
                        //re-fetch data from server
                        this.getData(wrapper, name, userEndpoint, description, profilePic);
                    })
                    .catch(err => {
                        console.log(err.message);
                    });
            })
            .catch(err => {
                console.log(err.message);
            });
    }

    showUploadedAvatar(e) {
        const fileLabel = document.querySelector('.custom-file-label');

        fileLabel.textContent = e.target.files[0].name;
    }

    getData(wrapper, name, userEndpoint, description, profilePic) {
        //hide Card display to mimic loading
        wrapper.style.opacity = 0;
        fetch(userEndpoint + '?context=edit', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + Cookies.get('wp-auth-token'),
            }
        })
        .then(res => res.json())
        .then(data => {
            //re-display card after response is received
            wrapper.style.opacity = 1;
            name.innerHTML = `${data.last_name} ${data.first_name}`;
            description.innerHTML = data.description;
            profilePic.innerHTML = data.profile_image
                ? `<img className="card-img-top" src="${data.profile_image}" alt="${data.last_name}" />`
                : 'No Image found';
        })
        .catch(err => {
            console.log(err);
        });
    }


    render() {

        const { username } = this.props;
        const { user } = this.props;
        let scrollPos = 0;
        window.addEventListener('scroll', debounce(checkPosition));

        function debounce(func, wait = 13, immediate = true) {
            var timeout;
            return function() {
                var context = this,
                    args = arguments;
                var later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        }

        function checkPosition() {
            let windowY = window.scrollY;
            if (window.scrollY < 115) {
                document.querySelector('.header').classList.add('is-visible');
                document.querySelector('.header').classList.remove('is-hidden');
            } else if (windowY < scrollPos) {
                // Scrolling UP
                document.querySelector('.header').classList.add('is-visible');
                document.querySelector('.header').classList.remove('is-hidden');
            } else {
                // Scrolling DOWN
                document.querySelector('.header').classList.add('is-hidden');
                document
                    .querySelector('.header')
                    .classList.remove('is-visible');
            }
            scrollPos = windowY;
        }

        return (
            <header className="header-wrap">
                <div className="h-16">
                    <ul
                        id="header"
                        className="bg-green top-0 p-5 fixed flex m-0 items-center h-16 header primary-header is-visible"
                    >
                        <li className="pr-8 inline-block">
                            <NavLink to="/">
                                <h1 className="tracking-tighter text-xl font-gotham-bold">
                                    Pat Cooney
                                </h1>
                            </NavLink>
                        </li>
                        <li className="pr-8 inline-block">
                            <NavLink
                                activeClassName="active"
                                to="/ingredients"
                            >
                                Ingredients
                            </NavLink>
                        </li>
                        <li className="pr-8 inline-block">
                            <NavLink
                                activeClassName="active"
                                to="/recipes"
                            >
                                Recipes
                            </NavLink>
                        </li>
                        <li className="pr-8 inline-block">
                            <NavLink activeClassName="active" to="/users">
                                Users
                            </NavLink>
                        </li>
                        <li className="pr-8 inline-block">
                            <NavLink activeClassName="active" to="/weather">
                                Weather
                            </NavLink>
                        </li>
                        <li className="pr-8 inline-block">
                            <NavLink activeClassName="active" to="/resume">
                                Resume
                            </NavLink>
                        </li>
                        <UserLogIn
                            user={user}
                            username={username}
                            className="color-white"
                            modalState={this.props.modalState}
                            showModal={this.props.showModal}
                            hideModal={this.props.hideModal}
                            userDropdown={this.props.userDropdown}
                            handleAccountForm={this.props.handleAccountForm}
                            handlelogout={this.props.handlelogout}
                            handlelogin={this.props.handlelogin}
                            handleSignIn={this.props.handleSignIn}
                        />
                    </ul>
                </div>
                <div id="modal">
                    <span
                        onClick={() => {
                            this.props.hideModal();
                        }}
                        className="close-modal"
                    >
                        &times;
                    </span>
                    <form
                        className="form"
                        onSubmit={this.props.handleAccountForm}
                    >
                        <h2 id="modal-title">Log in</h2>
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
                        <div
                            className="input input__half"
                            id="modal-re-password"
                        >
                            <label>Confirm Password:</label>
                            <input
                                id="re-password"
                                className="re-password"
                                type="password"
                                name="re-password"
                            />
                        </div>
                        <button
                            type="submit"
                            id="modal-submit"
                            className="submit"
                        >
                            Login
                        </button>
                        <p
                            onClick={(e) => {
                                this.props.showModal(e);
                            }}
                            id="modal-btn-left"
                        >
                            Login
                        </p>
                        <p
                            onClick={(e) => {
                                this.props.showModal(e);
                            }}
                            id="modal-btn-right"
                        >
                            Forgot Password
                        </p>
                    </form>
                </div>
                <div id="modal-bg"></div>
                {username !== undefined ||
                Cookies.get("username") !== undefined ? (
                    <div
                        id="profile-wrapper"
                        className="card shadow bg-white rounded w-72 p-8 mt-4 hidden"
                    >
                        <div
                            id="profile-pic-wrapper"
                            className="position-relative"
                        >
                            <div id="profile-pic">
                                <img
                                    style={{ maxWidth: "100%" }}
                                    className="card-img-top"
                                    src={Cookies.get("userImageLink")}
                                    alt="user avatar"
                                ></img>
                            </div>
                            <button
                                id="edit-image"
                                onChange={(e) => this.submitNewAvatar(e)}
                                type="button"
                                className="btn btn-secondary position-absolute rounded-0"
                                data-toggle="modal"
                                data-target="#exampleModal"
                            >
                                <span>
                                    <small>Edit Image</small>
                                </span>
                            </button>
                        </div>
                        <div className="card-body">
                            <h4
                                className="card-title font-weight-normal"
                                id="name"
                            >
                                {Cookies.get("username")}
                            </h4>
                            <p
                                className="card-text text-muted"
                                id="description"
                            ></p>
                        </div>

                        <form
                            className="form"
                            id="profile-form"
                            onSubmit={(e) => this.submitNewAvatar(e)}
                        >
                            <div className="input-group">
                                <div className="custom-file">
                                    <input
                                        id="profile-pic-input"
                                        type="file"
                                        className="custom-file-input"
                                        onChange={(e) =>
                                            this.showUploadedAvatar(e)
                                        }
                                        accept=".jpg, .jpeg, .png"
                                    />
                                    <label
                                        className="custom-file-label"
                                        htmlFor="inputGroupFile04"
                                    >
                                        Choose file
                                    </label>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-outline-secondary"
                                id="inputGroupFileAddon04"
                            >
                                Upload
                            </button>
                        </form>
                    </div>
                ) : (
                    <p></p>
                )}
            </header>
        );
    }
}

export default Header;
