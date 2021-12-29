// import React, {useState, useEffect, useContext} from 'react'
// import { UserContext } from '../context/user';
import {GoogleLogout } from 'react-google-login';
import { Link } from 'react-router-dom';


export default function Navbar({setUser}) {
    // const {user, setUser} = useContext(UserContext)

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
            <Link to='/new_place'>New Place</Link>
        </div>
    )
}
