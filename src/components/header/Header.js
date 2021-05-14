import React from 'react'
import { NavLink } from 'react-router-dom'
import Cookies from 'js-cookie'
// import UserLogIn from './UserLogIn';

import ModalComponent from '../modal/ModalComponent'

class Header extends React.Component {
    // for some reason only Admin level can do this?
    // subscriber level can upload photos on Photos.js so figure out where and bring it over
    submitNewAvatar(e) {
        e.preventDefault()

        const rootURL = 'https://pat-cooney.com'
        const mediaEndpoint = rootURL + '/wp-json/wp/v2/media/'
        const userEndpoint = rootURL + '/wp-json/wp/v2/users/me'

        const wrapper = document.getElementById('profile-wrapper')
        const name = document.getElementById('name')
        const description = document.getElementById('description')
        const profilePic = document.getElementById('profile-pic')
        const profilePicInput = document.getElementById('profile-pic-input')
        const fileLabel = document.querySelector('.custom-file-label')

        const formData = new FormData()
        formData.append('file', profilePicInput.files[0])
        // console.log(Cookies.get('wp-auth-token'))
        //send image to media library
        fetch(mediaEndpoint, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + Cookies.get('wp-auth-token'),
            },
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                const input = {
                    profile_image: data.source_url,
                }
                //send image url to backend
                fetch(userEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + Cookies.get('wp-auth-token'),
                    },
                    body: JSON.stringify(input),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data)
                        //clear file input text content
                        fileLabel.textContent = ''
                        //re-fetch data from server
                        this.getData(
                            wrapper,
                            name,
                            userEndpoint,
                            description,
                            profilePic
                        )
                    })
                    .catch((err) => {
                        console.log(err.message)
                    })
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    showUploadedAvatar(e) {
        const fileLabel = document.querySelector('.custom-file-label')

        fileLabel.textContent = e.target.files[0].name
    }

    getData(wrapper, name, userEndpoint, description, profilePic) {
        //hide Card display to mimic loading
        wrapper.style.opacity = 0
        fetch(userEndpoint + '?context=edit', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + Cookies.get('wp-auth-token'),
            },
        })
            .then((res) => res.json())
            .then((data) => {
                //re-display card after response is received
                wrapper.style.opacity = 1
                name.innerHTML = `${data.last_name} ${data.first_name}`
                description.innerHTML = data.description
                profilePic.innerHTML = data.profile_image
                    ? `<img className="card-img-top" src="${data.profile_image}" alt="${data.last_name}" />`
                    : 'No Image found'
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        let scrollPos = 0
        window.addEventListener('scroll', debounce(checkPosition))

        function debounce(func, wait = 13, immediate = true) {
            var timeout
            return function () {
                var context = this,
                    args = arguments
                var later = function () {
                    timeout = null
                    if (!immediate) func.apply(context, args)
                }
                var callNow = immediate && !timeout
                clearTimeout(timeout)
                timeout = setTimeout(later, wait)
                if (callNow) func.apply(context, args)
            }
        }

        function checkPosition() {
            let windowY = window.scrollY
            const header = document.querySelector('#header')
            const sidebar = document.querySelector('#sidebar')
            if (window.scrollY < 115) {
                header.classList.add('is-visible')
                header.classList.remove('is-hidden')
                sidebar && sidebar.classList.remove('pt-16')
            } else if (windowY < scrollPos) {
                // Scrolling UP
                header.classList.add('is-visible')
                sidebar && sidebar.classList.add('pt-16')
                header.classList.remove('is-hidden')
            } else {
                // Scrolling DOWN
                header.classList.add('is-hidden')
                header.classList.remove('is-visible')
                sidebar && sidebar.classList.remove('pt-16')
            }
            scrollPos = windowY
        }

        return (
            <header className="header-wrap">
                {console.log(this.props)}
                <div className="h-16">
                    <ul
                        id="header"
                        className="bg-green w-full transition-all duration-300 z-50 px-0 md:px-4 top-0 h-16 fixed flex m-0 items-center h-16"
                    >
                        <li className="inline-block">
                            <NavLink className="block p-4" to="/">
                                <h1 className="tracking-tighter text-white text-xl font-gotham-bold">
                                    Pat Cooney
                                </h1>
                            </NavLink>
                        </li>
                        <li className="inline-block">
                            <NavLink
                                className="p-4 text-white opacity-50"
                                activeClassName="opacity-100 font-gotham-medium"
                                to="/ingredients"
                            >
                                Ingredients
                            </NavLink>
                        </li>
                        <li className="inline-block">
                            <NavLink
                                className="p-4 text-white opacity-50"
                                activeClassName="opacity-100 font-gotham-medium"
                                to="/recipes"
                            >
                                Recipes
                            </NavLink>
                        </li>
                        <li className="inline-block">
                            <NavLink
                                className="p-4 text-white opacity-50"
                                activeClassName="opacity-100 font-gotham-medium"
                                to="/users"
                            >
                                Users
                            </NavLink>
                        </li>
                        {/* <li className="inline-block">
                            <NavLink
                                className="p-4 text-white opacity-50"
                                activeClassName="opacity-100 font-gotham-medium"
                                to="/weather"
                            >
                                Weather
                            </NavLink>
                        </li> */}
                        <li className="inline-block">
                            <NavLink
                                className="p-4 text-white opacity-50"
                                activeClassName="opacity-100 font-gotham-medium"
                                to="/resume"
                            >
                                Resume
                            </NavLink>
                        </li>
                        <ModalComponent user={this.props.user} />
                    </ul>
                </div>
                {/* Update user avatar modal */}
                <div
                    id="profile-wrapper"
                    // className="card shadow bg-white rounded w-72 p-8 mt-4"
                    className="card shadow bg-white rounded w-72 p-8 mt-4 hidden"
                >
                    <div id="profile-pic-wrapper" className="position-relative">
                        <div id="profile-pic">
                            <img
                                style={{ maxWidth: '100%' }}
                                className="card-img-top"
                                src={Cookies.get('userImageLink')}
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
                        <p>
                            ADDS IMAGE TO MEDIA LIBRARY - NEED TO SAVE TO
                            PROFILE IMAGE
                        </p>
                        <h4 className="card-title font-weight-normal" id="name">
                            {Cookies.get('username')}
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
                                    onChange={(e) => this.showUploadedAvatar(e)}
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
            </header>
        )
    }
}

export default Header
