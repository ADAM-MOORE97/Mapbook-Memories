import React, {useState, useEffect, useContext} from 'react'
import { UserContext } from '../context/user';
import {GoogleLogout } from 'react-google-login';


export default function Navbar() {
    const {user, setUser} = useContext(UserContext)

    const logout = (response) => {
        fetch("/logout", {
            method: "DELETE",
          }).then(setUser());
    }

    return (
        <div>
            <GoogleLogout
                buttonText="Logout"
                onLogoutSuccess={logout}
            >
            </GoogleLogout>
        </div>
    )
}
