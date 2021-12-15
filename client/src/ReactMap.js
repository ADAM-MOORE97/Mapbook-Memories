import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const styles = {
    width: "100vw",
    height: "50vh",

};

const ReactMap = () => {
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);
    const [lng, setLng] = useState(-98.1);
    const [lat, setLat] = useState(39.5);
    const [zoom, setZoom] = useState(3);
    const [coords, setCoords] = useState([])
    

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYWRhbW1vb3JlMjEiLCJhIjoiY2t4NTY4MmxkMjE3MTJ1bXI0c2hkcWF4MCJ9.4mGlkslBlwc6tAmqbmUuoA';;
        const initializeMap = ({ setMap, mapContainer }) => {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
                center: [-98.1, 39.5],
                zoom: 3
            });
            const directions = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl
            });

            map.addControl(directions, 'top-right')

            map.on("load", () => {
                setMap(map);
                map.resize();
            });
            map.on('click', (e) => {
                // console.log(e.lngLat.lat)
                // console.log(e.lngLat.lng)
                
            })
            map.on('move', () => {
                setLng(map.getCenter().lng.toFixed(1));
                setLat(map.getCenter().lat.toFixed(1));
                setZoom(map.getZoom().toFixed(1));
            });
            map.on('contextmenu', (e) => {
                
            const marker = new mapboxgl.Marker({ color: 'black', draggable: true})
                    .setLngLat([e.lngLat.lng.toFixed(0), e.lngLat.lat.toFixed(0)])
                    
                    .addTo(map)
                   
                   marker.on('dragend', (e)=>{
                       let lngLat = e.target.getLngLat();
                       
                       let lat = lngLat['lat']
                       let lng = lngLat['lng']
                    //    console.log(lat)
                       setCoords([lng, lat])
                    //    console.log(`${lngLat['lat']} ${lngLat['lng']}`)
                       console.log(coords)
                   })
                    
                   
                         
                                
            } );
           
        };

        if (!map) initializeMap({ setMap, mapContainer });
    }, [map, coords]);
console.log(coords)
function handleMarker(e){
    e.preventDefault();
    new mapboxgl.Marker({ color: 'black', draggable: true})
                    .setLngLat([coords[0], coords[1]])
                    .addTo(map)

}

    return (
        <div>
            <div ref={el => (mapContainer.current = el)} style={styles} />
            <div className="sidebar">
                Center = Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <form  onSubmit={e =>handleMarker(e)}>
            <label/>
            <input value={`${coords}`}/>
           
         <button>New Marker</button>
            </form>
            
        </div>
        );
};

export default ReactMap;