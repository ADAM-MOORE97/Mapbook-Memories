import React, {useContext, useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom'
import { UserContext } from './context/user';
import Navbar from './components/Navbar';
import ReactMap from './components/ReactMap';
import LandingPage from './components/LandingPage';
import './App.css'

 


function App() {
  const {user, setUser} = useContext(UserContext)
  
  useEffect(() => {
    fetch('/me')
      .then(resp => {
        if (resp.ok) resp.json().then(data=> setUser(data))
        else resp.json().then(errors=> console.log(errors))})
      }, [])


 console.log(user)
 if(!user)
 return(<LandingPage/>)
 else
  return (
    <div>
      
      <Navbar/>
      <Routes>
        <Route path='/' element={<ReactMap/>}></Route>

      </Routes>
      
    </div>
  );
}
// ya29.a0ARrdaM8X_JbEzDPIajcjg44xRvZKXkWoQzxZBFrUAIiQZtxt9UjUjhLfpZrYrWBgmIqfenBo3hJuPml611Ghy06nIau1JMo1
export default App;
