import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { GoogleLogout } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import {
    selectSignedIn,
    selectUserData,
    setInput,
    setSignedIn,
    setUserData
} from "../Features/userSlice";

import "../Styling/NavBar.css";

const NavBar = () => {
    const [inputVal, setInputVal] = useState("tech");
    const isSignedIn = useSelector(selectSignedIn);
    const userData = useSelector(selectUserData);

    const dispatch = useDispatch();

    const logout = (response) => {
        dispatch(setSignedIn(false));
        dispatch(setUserData(null));
    }

    const handleClick = (event) => {
        event.preventDefault();
        dispatch(setInput(inputVal));
    }

    return (
        <div className="navbar">
            <h1 className="navbar__header">BlogMania 💬</h1>
            {isSignedIn && (
                <div className="blog__search">
                    <input className="search" placeholder="Search for a blog" value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
                    <button className="submit" onClick={handleClick}>Search</button>
                </div>
            )}

            {isSignedIn ? (
                <div className="navbar__user__data">
                    <Avatar className="user" src={userData?.imageUrl} alt={userData?.name} />
                    <h1 className="signedIn">{userData?.givenName}</h1>
                    <GoogleLogout
                        clientId="413353029839-i9jigpue7s3og9qgackeg850v25l2tsg.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="logout__button">
                                Logout
                            </button>
                        )}
                        onLogoutSuccess={logout}
                    />
                </div>
            ) : (
                <h1 className="notSignedIn">User not available..</h1>
            )}
        </div>
    )
}

export default NavBar;