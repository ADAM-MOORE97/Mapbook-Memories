import React, {useState, useEffect, useRef} from 'react'
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

export default function NewPlaceMap({setPlaceData, placeData}) {
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);

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
                console.log(coords.lngLat)
                setPlaceData({...placeData, latitude: coords.lngLat.lat.toFixed(6), longitude: coords.lngLat.lng.toFixed(6)  })

            })
        };
        if (!map) initializeMap({ setMap, mapContainer });
    }, [map]);


    return (
        <div>
            <div ref={el => (mapContainer.current = el)} style={styles} />
        </div>
    )
}
