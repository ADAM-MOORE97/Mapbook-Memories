import React, { useEffect, useState, useRef, useContext } from 'react'
import PlaceCard from './PlaceCard';
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { UserContext } from '../context/user';



const styles = {
  width: "80vw",
  height: "50vh",
  margin: '10em',
  border: "5px solid"

};


export default function PlaceCollection() {
  const [placeData, setPlaceData] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([])
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const [mapSearch, setMapSearch] = useState(false)
  const [markers, setMarkers] = useState()
  const { user, setUser } = useContext(UserContext)


  function handleChange(e) {
    let filteredData = placeData.filter((place) => place.name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilteredPlaces(filteredData)

  }
  function handleSubmit(e) {
    e.preventDefault()


  }
  console.log(user)
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWRhbW1vb3JlMjEiLCJhIjoiY2t4NTY4MmxkMjE3MTJ1bXI0c2hkcWF4MCJ9.4mGlkslBlwc6tAmqbmUuoA';;
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
        center: [-98.100000, 39.500000],
        zoom: 3.000
      });
      const directions = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker: false

      });

      map.addControl(directions, 'top-right')

      map.on("load", () => {
        setMap(map);
        map.resize();
      });

    };
    fetch('/places')
      .then(r => r.json())
      .then(data => {
        console.log(data)
        setPlaceData(data)
        setFilteredPlaces(data)

      })
    placeData.map(place => {
      if (place.visited) {
        new mapboxgl.Marker({ color: 'black', offset: [0, -50 / 2] })
          .setLngLat([place.longitude, place.latitude])
          .addTo(map)
      }
      else if (!place.visted) {
        new mapboxgl.Marker({ color: 'red', offset: [0, -50 / 2] })
          .setLngLat([place.longitude, place.latitude])
          .addTo(map)

      }
    })

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);





if(filteredPlaces === []){
  console.log('yay')
}


  return (
    <div>
      <div ref={el => (mapContainer.current = el)} style={styles} />


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
          return <PlaceCard className="mt-2" key={place.id} place={place} />;
        })}
      </div>

    </div>
  )
}
