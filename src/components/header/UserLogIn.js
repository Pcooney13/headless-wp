import React from 'react';
import Cookies from 'js-cookie';

class Header extends React.Component {
    render() {

        const { username } = this.props;
        const { user } = this.props;

        return (
            <li id="log">
                {username !== undefined ||
                    Cookies.get('username') !== undefined ? (
                        <button
                            id="log-out"
                            onClick={() => {
                                this.props.handlelogout();
                            }}>
                            {Cookies.get("userImageLink")
                                ? <img className="avatar-image" src={Cookies.get("userImageLink")} alt="user pic" />
                                : ''}

                        
                            {console.log(user)}
                                            logout {username}
                        </button>
                    ) : (
                        <div>
                            <button
                                onClick={e => {
                                    this.props.showModal(e);
                                }}
                                id="log-in"
                                className="hidden md:inline-block">
                                Log In
                                            </button>
                            <button
                                onClick={e => {
                                    this.props.showModal(e);
                                }}
                                id="sign-up"
                                className="pl-4 md:pl-0">
                                Sign Up
                                            </button>
                        </div>
                    )}
            </li>
        )
    }
}

export default Header;