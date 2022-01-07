
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import NewPlaceMap from './NewPlaceMap';
import EditPlaceMap from './EditPlaceMap';
const styles = {
    width: "80vw",
    height: "50vh",
    margin: '10em',
    border: "5px solid"

};

export default function PlaceForm() {
    const params = useParams();
    const navigate = useNavigate();
    // const [map, setMap] = useState(null);
    // const mapContainer = useRef(null);
    // // const [coords, setCoords] = useState({longitude: '', latitude: ''})
    // const [longitude, setLongitude] = useState('')
    // const [latitude, setLatitude] = useState('')

   
    const [placeData, setPlaceData] = useState({
        name: '',
        longitude: '',
        latitude: '',
        description: '',
        visited: false

    })

    useEffect(() => {
        if (params.id)
            fetch(`/places/${params.id}`)
                .then(r => r.json())
                .then(data => {
                    setPlaceData(data)

                })
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(placeData)

        const response = await fetch(params.id ? `/places/${params.id}` : '/places', {
            method: params.id ? 'PATCH' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(placeData)
        });
        const data = await response.json();

        if (response.ok) {

            console.log(data);
            navigate(`/places/${data.id}`)

        } else {
            console.log(data)
            navigate('/')
        }
    }
    const handleChangeName = (e) => {
        setPlaceData({...placeData, name : e.target.value })
    }
    const handleChangeDesc = (e) => {
        setPlaceData({...placeData, description : e.target.value })
    }
    const handleChangeVisited = (e) => {
        setPlaceData({...placeData, visited: e.target.checked })

    }
    
















    return (
        <div>
         {params.id? <EditPlaceMap setPlaceData={setPlaceData} placeData={placeData}/> : <NewPlaceMap setPlaceData={setPlaceData} placeData={placeData}/>}
            <div className='container-fluid mt-5 '>
                <div className='row'>
                    <form className='' onSubmit={handleSubmit}>
                        <label className='form-label'>Location Name:</label>
                        <input className='form-control border-dark' type='text' name='name' value={placeData.name} onChange={handleChangeName} required></input>
                        <label className='form-label'>Latitude:</label>
                        <input className='form-control border-dark' type='text' name='latitude' value={placeData.latitude}  placeholder='Click on Map' required></input>
                        <label className='form-label'>Longitude:</label>
                        <input className='form-control border-dark' type='text' name='longitude' value={placeData.longitude}  placeholder='Click on Map' required></input>
                        <br />
                        <label className='form-label'>Visited: </label>
                        <input type='checkbox' name='visited' value={placeData.visited} onChange={handleChangeVisited}></input>
                        <br />
                        <label className='form-label'>Description:</label>
                        <textarea id='placeDescription' className='form-control border-dark' name='description' value={placeData.description} onChange={handleChangeDesc}></textarea>
                        <button id='form-submit-button' className='btn btn-dark mt-5'>Submit</button>
                    </form>
                    {/* <div id='placePreviewColumn' className='col-6'>
                        <label id='preview'>Preview:</label>
                        <div id='placePreview' className='card border-dark'>

                            <h1>{placeData.name}</h1>
                            <h3>{placeData.latitude}</h3>
                            <h3>{placeData.longitude}</h3>

                            <p>{placeData.description}</p>
                        </div>
                    </div> */}

                </div>
            </div>
        </div>
    )
}
