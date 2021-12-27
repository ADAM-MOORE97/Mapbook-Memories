import React, {useContext, useState} from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { UserContext } from '../context/user';




export default function LandingPage() {
    const {user, setUser} = useContext(UserContext);
    
    async function responseGoogle(response) {
        // setUser({name: response.profileObj.name, givenName: response.profileObj.givenName, email: response.profileObj.email, imageUrl: response.profileObj.imageUrl, password: response.profileObj.googleId, password_confirmation: response.profileObj.googleId})
        const r = await fetch('/auth_users',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: response.profileObj.name, givenName: response.profileObj.givenName, email: response.profileObj.email, imageUrl: response.profileObj.imageUrl, password: response.profileObj.googleId, password_confirmation: response.profileObj.googleId})
        })
        const data = await r.json();
        if (r.ok){
            console.log(data)
            fetch('/login', {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email: response.profileObj.email, password: response.profileObj.googleId})
            }).then(res=>res.json()).then(dat=>setUser(dat))
        }
        else{alert(data.errors.join('\n \n'))}
    }
        
        
        
        
       
    
  
    return (
        <div className='landingpage'>
            <img className='logo' src="https://i.imgur.com/rsLrCNh.png"></img>
             <GoogleLogin
                clientId="135982098217-qg8k3ulv2qcbmjvb5jc0qjdmb6ehbtnr.apps.googleusercontent.com"
                buttonText="Access"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
               
            />
            
        </div>
    )
}
