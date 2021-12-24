import React, {useState} from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';


export default function Navbar() {
const [user, setUser] = useState({})
    const responseGoogle = (response) => {
        // setUser({name: response.profileObj.name, givenName: response.profileObj.givenName, email: response.profileObj.email, imageUrl: response.profileObj.imageUrl, password: response.profileObj.googleId, password_confirmation: response.profileObj.googleId})
        fetch('/auth_users',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: response.profileObj.name, givenName: response.profileObj.givenName, email: response.profileObj.email, imageUrl: response.profileObj.imageUrl, password: response.profileObj.googleId, password_confirmation: response.profileObj.googleId})
        }).then(r=>r.json()).then(data=>console.log(data))
        // console.log(response.profileObj)
        // console.log(user)
    }
    const logout = (response) => {
        console.log(response);
    }

    return (
        <div>
            <GoogleLogin
                clientId="135982098217-qg8k3ulv2qcbmjvb5jc0qjdmb6ehbtnr.apps.googleusercontent.com"
                buttonText="Access"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
               
            />

            <GoogleLogout
                buttonText="Logout"
                onLogoutSuccess={logout}
            >
            </GoogleLogout>
        </div>
    )
}
