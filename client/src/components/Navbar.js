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

        <nav className="navbar navbar-expand-xl text-light bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand text-light "> | MapBook Memories  |</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarWithDropdown" aria-controls="navbarWithDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse show" id="navbarWithDropdown">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link active text-light" aria-current="" href="/">DashBoard</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle text-light" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Places
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a className="dropdown-item" href="/places/collection">Collection</a></li>
            <li><a className="dropdown-item" href="/places/new">Add Place</a></li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle text-light" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Trips
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a className="dropdown-item" href="/trips/collection">Collection</a></li>
            <li><a className="dropdown-item" href="/trips/gallery">Gallery</a></li>
            <li><a className="dropdown-item" href="/trips/new">Add Trip</a></li>
          </ul>
        </li>
        <li className="nav-item">
        <GoogleLogout
                className='nav-link'
                buttonText="Logout"
                onLogoutSuccess={logout}
            >
            </GoogleLogout>
        </li>
        {/* <li class="nav-item">
          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </li> */}
      </ul>
    </div>
  </div>
</nav>

      
      
    

            
       

    )
}
