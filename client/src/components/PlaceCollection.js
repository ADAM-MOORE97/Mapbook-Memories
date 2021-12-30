import React, {useEffect, useState} from 'react'
import PlaceCard from './PlaceCard';

export default function PlaceCollection() {
    const [placeData, setPlaceData] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([])
    useEffect(()=>{
        fetch('/places')
        .then(r=>r.json())
        .then(data=>{
            console.log(data)
            setPlaceData(data)
            setFilteredPlaces(data)
        })
    }, [])

    function handleChange(e){
        let filteredData = placeData.filter((place) => place.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setFilteredPlaces(filteredData)
      }
      function handleSubmit(e){
        e.preventDefault()
    
    
      }


    return (
        <div>
             <form onSubmit={handleSubmit} className="d-flex ms-auto z-1">
        <input 
          className="form-control me-2 "
          role="search"
          type="search"
          placeholder="Search by place name"
          aria-label="Search"
          onChange={handleChange}
        />
      </form>
             <div className="mt-5">
      {filteredPlaces.map((place) => {
        return <PlaceCard className="mt-2" key={place.id} place={place}/>;
      })}
    </div>
            
        </div>
    )
}
