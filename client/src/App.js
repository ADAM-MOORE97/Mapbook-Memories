import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import { UserContext } from './context/user';
import Navbar from './components/Navbar';
import ReactMap from './components/ReactMap';
import LandingPage from './components/LandingPage';
import './App.css'
import PlaceForm from './components/PlaceForm';
import Dashboard from './components/Dashboard';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import PlaceCollection from './components/PlaceCollection';
import PlaceDetails from './components/PlaceDetails';
import TripCollection from './components/TripCollection';
import TripDetails from './components/TripDetails';
import TripForm from './components/TripForm';
import TripGallery from './components/TripGallery';

function App() {
  const { user, setUser } = useContext(UserContext)
  const [places, setPlaces] = useState([])
  const [trips, setTrips] = useState([])

  useEffect(() => {
    fetch('/me')
      .then(resp => {
        if (resp.ok) resp.json().then(data => setUser(data))
        else resp.json().then(errors => console.log(errors))
        console.log(user)
      })
  },[])
 





  if (!user)
    return (<LandingPage setUser={setUser} />)
  else
    return (
      <div>
        <Navbar setUser={setUser} />
        <Routes>
          <Route path='/' element={<Dashboard setPlaces={setPlaces} setTrips={setTrips} />}></Route>
          <Route path='/places/new' element={<PlaceForm />}></Route>
          <Route path='/places/collection' element={<PlaceCollection/>}></Route>
          <Route path='/places/:id' element={<PlaceDetails/>}></Route>
          <Route path='/places/:id/edit' element={<PlaceForm/>}></Route>
          <Route path='/trips/collection' element={<TripCollection/>}></Route>
          <Route path='/trips/:id' element={<TripDetails/>}></Route>
          <Route path='/trips/new' element={<TripForm user={user}/>}></Route>
          <Route path='/trips/:id/edit' element={<TripForm user={user}/>}></Route>
          <Route path='/trips/gallery' element={<TripGallery/>}></Route>
        </Routes>

      </div>
    );
}
// ya29.a0ARrdaM8X_JbEzDPIajcjg44xRvZKXkWoQzxZBFrUAIiQZtxt9UjUjhLfpZrYrWBgmIqfenBo3hJuPml611Ghy06nIau1JMo1
export default App;
