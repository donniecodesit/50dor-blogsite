import React from 'react';
import GoogleLogin from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectSignedIn,
    setSignedIn,
    setUserData
} from "../Features/userSlice";
import "../Styling/HomePage.css"

const HomePage = () => {
    const isSignedIn = useSelector(selectSignedIn);
    const dispatch = useDispatch();
    const login = (response) => {
        dispatch(setSignedIn(true));
        dispatch(setUserData(response.profileObj));
    };


    return (
        <div className="home__page" style={{display: isSignedIn ? "none" : ""}}>
            {!isSignedIn ? (
                <div className="login__message">
                    <h2>📘</h2>
                    <h1>A reader's favorite place!</h1>
                    <p>We provide high quality online resources for reading blogs. Just sign up and start reading some quality blogs!</p>
                    <GoogleLogin
                        clientId="413353029839-i9jigpue7s3og9qgackeg850v25l2tsg.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="login__button">
                                Login with Google
                            </button>
                        )}
                        onSuccess={login}
                        onFailure={login}
                        isSignedIn={true}
                        cookiePolicy={"single_host_origin"}
                    />
                </div>
            ) : (
                ""
            )}
        </div>
    )
}

export default HomePage;