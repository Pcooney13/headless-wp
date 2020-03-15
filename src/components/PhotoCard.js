import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

class PhotoCard extends Component {
    render() {
        return (
            mapOver === 0
                ?
                <p>No matches</p>
                :
                mapOver.map(post => (
                    <div key={post.slug} className={`card ${post.slug} ${this.state.active === post && 'clicked-full'}`}>
                        <div className="card-imagebox">
                            <Link
                                to={`${this.state.active === post ? '/photos' : '/photos/' + post.slug}`}
                                className={`card-image-link ${this.state.active === post && 'image-big'}`}
                                onClick={e =>
                                    this.activeImage(post, e)
                                }
                            >
                                <img
                                    data-src={
                                        this.state.active === post
                                            ? post.image.full
                                            : post.image
                                                ? post.image.medium
                                                : `https:via.placeholder.com/300x200/${post.color}/ffffff'`
                                    }
                                    data-srcset={
                                        this.state.active === post
                                            ? post.image.full
                                            : post.image
                                                ? post.image.medium
                                                : `https:via.placeholder.com/300x200/${post.color}/ffffff'`
                                    }
                                    height="200"
                                    width="300"
                                    className={`card-image lazy ${this.state.active === post && 'clicked-full'}`}
                                    alt={post.title
                                        .replace('#038;', '')
                                        .replace('&#8217;', "'")}></img>
                                <div className="author-box">
                                    <div
                                        className="author-image"
                                        style={{
                                            backgroundImage: `url(${
                                                post.author
                                                    .custom_avatar
                                                    ? post.author
                                                        .custom_avatar
                                                    : post.author.avatar
                                                })`,
                                        }}></div>
                                    <p className="author">
                                        {post.author.title}
                                    </p>
                                    {post.author.slug === Cookies.get('username') && (
                                        <Link
                                            to="/photos"
                                            className="delete-trash"
                                            onClick={e =>
                                                this.deleteshit(post.id, e)
                                            }>
                                            <svg
                                                className="bi bi-trash"
                                                width="24px"
                                                height="24px"
                                                viewBox="0 0 20 20"
                                                fill="white"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.5 7.5A.5.5 0 018 8v6a.5.5 0 01-1 0V8a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V8a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V8z" />
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.5 5a1 1 0 01-1 1H15v9a2 2 0 01-2 2H7a2 2 0 01-2-2V6h-.5a1 1 0 01-1-1V4a1 1 0 011-1H8a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM6.118 6L6 6.059V15a1 1 0 001 1h6a1 1 0 001-1V6.059L13.882 6H6.118zM4.5 5V4h11v1h-11z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </Link>
                                    )}
                                </div>
                            </Link>
                        </div>
                        <div className="card-textbox">
                            {/* {this.props.username ? <button onClick={() => "boobs"}>♡</button>: '' } */}
                            <div className="card-titlebox">
                                <div className="text-container">
                                    <h4 className="card-title">
                                        {post.title
                                            .replace('#038;', '')
                                            .replace('&#8217;', "'")}
                                    </h4>
                                    {/* {post.location && post.location.city && post.location.state_short ? (
                                                                <p className="card-location">
                                                                    {post.location.city},{' '}
                                                                    {post.location.state_short}
                                                                </p>
                                                            ) 
                                                            : 
                                                            post.location && post.location.city && post.location.country && (
                                                                <p className="card-location">
                                                                    {post.location.city},{' '}
                                                                    {post.location.country}
                                                                </p>
                                                            )} */}
                                    <p className="card-location">
                                        {post.location &&
                                            post.location.city
                                            ?
                                            `${post.location.city}, ${post.location && post.location.state_short && post.location.state_short}`
                                            : post.location && post.location.state &&
                                            `${post.location.state}, `
                                        }
                                        {post.location && post.location.country !== 'United States' &&
                                            `${post.location.country}`}
                                    </p>
                                </div>
                                {/* <input className="likes" type="checkbox" /> */}
                                <div className="heart-box">
                                    <input
                                        id={`hrt-${post.slug}`}
                                        className="heart-input"
                                        type="checkbox"
                                    />
                                    <label
                                        onClick={e => {
                                            this.clickedHeart(
                                                e,
                                                this.props.username,
                                                post.slug
                                            );
                                        }}
                                        htmlFor={`hrt-${post.slug}`}>
                                        {/* <svg
                                                                        viewBox="0 0 20 20"
                                                                        fill="currentColor"
                                                                        xmlns="http://www.w3.org/2000/svg">
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M10 4.748l-.717-.737C7.6 2.281 4.514 2.878 3.4 5.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.837-3.362.314-4.385-1.114-2.175-4.2-2.773-5.883-1.043L10 4.748zM10 17C-5.333 6.868 5.279-1.04 9.824 3.143c.06.055.119.112.176.171a3.12 3.12 0 01.176-.17C14.72-1.042 25.333 6.867 10 17z"
                                                                            clipRule="evenodd"
                                                                            />
                                                                    </svg> */}

                                        <svg
                                            width="18px"
                                            height="18px"
                                            className="heart-svg not-liked"
                                            data-name="Layer 1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 34 29.7">
                                            <path
                                                className="outline"
                                                d="M21,35.85l-.6-.5C7.5,24.85,4,21.15,4,15.15a9,9,0,0,1,9-9c4.1,0,6.4,2.3,8,4.1,1.6-1.8,3.9-4.1,8-4.1a9,9,0,0,1,9,9c0,6-3.5,9.7-16.4,20.2ZM13,8.15a7,7,0,0,0-7,7c0,5.1,3.2,8.5,15,18.1,11.8-9.6,15-13,15-18.1a7,7,0,0,0-7-7c-3.5,0-5.4,2.1-6.9,3.8L21,13.25,19.9,12C18.4,10.25,16.5,8.15,13,8.15Z"
                                                transform="translate(-4 -6.15)"
                                            />
                                            <path
                                                className="fill"
                                                d="M20.37,34.18C8.46,24.49,5,20.84,5,15.31a7.91,7.91,0,0,1,8-8c4,0,6.2,2.49,7.65,4.13l.35.42.34-.4C22.8,9.8,25,7.31,29,7.31a7.91,7.91,0,0,1,8,8c0,5.53-3.46,9.18-15.37,18.87l-.63.51Z"
                                                transform="translate(-4 -6.15)"
                                            />
                                        </svg>
                                    </label>
                                </div>
                            </div>
                            <p className="card-categories">
                                {post.categories
                                    ? post.categories.map(category => (
                                        <Link
                                            key={counter++}
                                            className="card-category"
                                            style={{
                                                backgroundColor:
                                                    category.color,
                                                borderTopColor:
                                                    category.color,
                                            }}
                                            to={`/photos/${category.slug}`}
                                            onClick={e =>
                                                this.handleCategories(
                                                    category,
                                                    e
                                                )
                                            }
                                            data-tooltip={
                                                category.title
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                category.title.slice(
                                                    1
                                                )
                                            }
                                            aria-hidden="true">
                                            {category.title
                                                .slice(0, 1)
                                                .toUpperCase()}
                                        </Link>
                                    ))
                                    : ''}
                            </p>
                        </div>
                    </div>
                )
                )
        )
    }
}

export default PhotoCard;