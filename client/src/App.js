import React, { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import { UserContext } from './context/user';
import Navbar from './components/Navbar';
import ReactMap from './components/ReactMap';
import LandingPage from './components/LandingPage';
import './App.css'
import PlaceForm from './components/PlaceForm';
import Dashboard from './components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import PlaceCollection from './components/PlaceCollection';

function App() {
  const { user, setUser } = useContext(UserContext)
console.log(user)
  useEffect(() => {
    fetch('/me')
      .then(resp => {
        if (resp.ok) resp.json().then(data => setUser(data))
        else resp.json().then(errors => console.log(errors))
      })
  }, [])



  if (!user)
    return (<LandingPage setUser={setUser} />)
  else
    return (
      <div>
        <Navbar setUser={setUser} />
        <Routes>
          <Route path='/' element={<Dashboard/>}></Route>
          <Route path='/places/new' element={<PlaceForm />}></Route>
          <Route path='/places/collection' element={<PlaceCollection/>}></Route>
        </Routes>

      </div>
    );
}
// ya29.a0ARrdaM8X_JbEzDPIajcjg44xRvZKXkWoQzxZBFrUAIiQZtxt9UjUjhLfpZrYrWBgmIqfenBo3hJuPml611Ghy06nIau1JMo1
export default App;
