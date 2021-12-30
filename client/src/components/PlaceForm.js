
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
const styles = {
    width: "80vw",
    height: "50vh",
    margin: '10em',
    border: "5px solid"

};

export default function PlaceForm() {
    const params = useParams();
    const navigate = useNavigate();
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);
    // const [coords, setCoords] = useState({longitude: '', latitude: ''})
    const [longitude, setLongitude] = useState('')
    const [latitude, setLatitude] = useState('')
    const [hasBeen, setHasBeen] = useState(false)
    const [placeData, setPlaceData] = useState({
        name: '',
        longitude: '',
        latitude: '',
        description: '',
        visited: hasBeen

    })
    const handleSubmit = async (e) => {
        e.preventDefault();
      
      
        
        const response = await fetch(params.id ? `/places/${params.id}` : '/places', {
            method: params.id ? 'PATCH' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(placeData)
        });
        const data = await response.json();

        if (response.ok) {
            navigate(`/places/${data.id}`)
            console.log(data)
        } else {
            alert(data.errors.join("\n \n"))
        }
    }
    const handleChange = (e) => {

        setHasBeen(hasBeen => !hasBeen)
        setPlaceData({ ...placeData, [e.target.name]: e.target.value})

    }








  


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
            map.on('click', (coords) => {
               setLongitude(coords.lngLat.lng.toFixed(6))
                setLatitude(coords.lngLat.lat.toFixed(6))
              


            })
      
          

        };

        if (!map) initializeMap({ setMap, mapContainer });
    }, [map]);















    return (
        <div>
        <div ref={el => (mapContainer.current = el)} style={styles} />
        <div className="sidebar">
                Latitude: {latitude} | Longitude: {longitude} 
            </div>
        <div className='container-fluid mt-5'>
            <div className='row'>
                <form className='col-6' onSubmit={handleSubmit}>
                    <label className='form-label'>Location Name:</label>
                    <input className='form-control border-dark' type='text' name='name' value={placeData.name} onChange={handleChange} required></input>
                    <label className='form-label'>Latitude:</label>
                    <input className='form-control border-dark' type='text' name='latitude' value={placeData.latitude} onChange={handleChange} placeholder='Paste click result here' required></input>
                    <label className='form-label'>Longitude:</label>
                    <input className='form-control border-dark' type='text' name='longitude' value={placeData.longitude} onChange={handleChange} placeholder='Paste click result here' required></input>
                    <br />
                    <label className='form-label'>Visited: </label>
                    <input type='checkbox' name='visited' value={hasBeen} onChange={handleChange} ></input>
                    <br />
                    <label className='form-label'>description:</label>
                    <textarea id='placeDescription' className='form-control border-dark' name='description' value={placeData.description} onChange={handleChange}></textarea>
                    <button id='form-submit-button' className='btn btn-dark mt-5'>Submit</button>
                </form>
                <div id='placePreviewColumn' className='col-6'>
                    <label id='preview'>Preview:</label>
                    <div id='placePreview' className='card border-dark'>

                        <h1>{placeData.name}</h1>
                        <h3>{placeData.latitude}</h3>
                        <h3>{placeData.longitude}</h3>
                        
                        <p>{placeData.description}</p>
                    </div>
                </div>

            </div>
        </div>
        </div>
    )
}
