import React from 'react';
import Cookies from 'js-cookie';

class UserLogIn extends React.Component {
    render() {

        const { username } = this.props;
        const { user } = this.props;

        return (
            <li className="ml-auto pr-0 border-l border-black pl-2 pr-0 text-white" id="log">
                {username !== undefined ||
                    Cookies.get('username') !== undefined ? (
                        <div>
                            <button
                            id="log-out"
                            className="text-white"
                            onClick={() => {
                                this.props.handlelogout();

                            }}>
                            {Cookies.get("userImageLink")
                                ? <img className="avatar-image" src={Cookies.get("userImageLink")} alt="user pic" />
                                : ''}

                        
                            {console.log(user)}
                                logout {username}
                        </button>
                                <ul className="absolute top-0 mt-16 bg-white max-w-screen-xs w-full right-0">
                                    <li className="text-black-800 transition-color duration-500 border-b border-black-100 p-4 w-full p-0 hover:bg-blue-200"><span>test</span></li>
                                    <li className="text-black-800 transition-color duration-500 border-b border-black-100 p-4 w-full p-0 hover:bg-blue-200"><span>test</span></li>
                                </ul>
                            </div>
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

export default UserLogIn;