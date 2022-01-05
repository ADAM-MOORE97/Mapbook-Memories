// import React, {useState, useEffect, useContext} from 'react'
// import { UserContext } from '../context/user';
import { GoogleLogout } from 'react-google-login';
import { Link } from 'react-router-dom';


export default function Navbar({ setUser }) {
    // const {user, setUser} = useContext(UserContext)

    const logout = (response) => {
        fetch("/logout", {
            method: "DELETE",
        }).then(setUser());
    }

    return (
        // <div>
        //     <GoogleLogout
        //         buttonText="Logout"
        //         onLogoutSuccess={logout}
        //     >
        //     </GoogleLogout>

        //     <Link to='/'>Dashboard</Link>
        //     <Link to='/places/new'>New Place</Link>
        //     <Link to='/places/collection'>Place Collection</Link>
        // </div>
        <nav className="navbar sticky-top navbar-dark bg-dark"> 
            <Link className='navbar-brand nav-link text-light' to='/'><h1 className='navbar-brand nav-link text-light'>Dashboard</h1></Link>
         
        <div className='nav-item dropdown'>

        <h1 className="dropdown-toggle navbar-brand  text-light"
          data-bs-toggle="dropdown"
          role="button"> Places</h1>
       
        <ul className="dropdown-menu mt-2">
        <Link className="nav-link text-dark dropdown-item" to='/places/collection'>Place Collection</Link>
        <Link className="nav-link text-dark dropdown-item" to='/places/new'>Add Place</Link>
        </ul>
        </div>
      
    

            
        </nav>

    )
}
