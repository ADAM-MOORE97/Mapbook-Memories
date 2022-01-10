import React, { useContext, useEffect, useState } from 'react';

import { UserContext } from '../context/user';
import PlacesDash from './PlacesDash';
import ReactMap from './ReactMap';
import TripDash from './TripDash';




export default function Dashboard({setPlaces, setTrips}) {
    const { user, setUser } = useContext(UserContext)
   const [placeData, setPlaceData] = useState()
   const [tripData, setTripData] =useState()


    useEffect(() => {
        fetch('/places')
            .then(r => r.json())
            .then(data => {
                setPlaces(data)
                setPlaceData(data)
            });
     
    
        
    }, [])

    useEffect(()=>{
        fetch('/trips')
        .then(r => r.json())
        .then(data => {
            setTrips(data);
            setTripData(data)
        });

    }, [])





    return (
        <div className='container'>
           
<PlacesDash placeData={placeData}/>
<TripDash tripData={tripData}/>

<ReactMap/>




        </div>
    )
}
