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
    const [coords, setCoords] = useState({lng, lat})
    const [markers, setMarkers] = useState([{id:1, lng: lng, lat: lat}])
    

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
                mapboxgl: mapboxgl,
                marker: false

            });

            map.addControl(directions, 'top-right')

            map.on("load", () => {
                setMap(map);
                map.resize();
            });
            map.on('click', (e) => {
                setCoords({lng: e.lngLat.lng, lat: e.lngLat.lat})
                // console.log(e.lngLat.lng)
                
            })
            map.on('move', () => {
                setLng(map.getCenter().lng.toFixed(1));
                setLat(map.getCenter().lat.toFixed(1));
                setZoom(map.getZoom().toFixed(1));
            });
            map.on('contextmenu', (e) => {
                
            const marker = new mapboxgl.Marker({ color: 'black', draggable: true, offset: [0, -50/2]})
                    .setLngLat([e.lngLat.lng.toFixed(6), e.lngLat.lat.toFixed(6)])
                    .addTo(map)
                    marker.id = Math.abs(e.lngLat.lng)
                    // let lngLat = e.target.getLngLat();
                    //    coords.push({lng:lngLat['lat'], lat:lngLat['lng']})
                    let markerz = {id: marker.id, lng: marker.getLngLat().lng, lat: marker.getLngLat().lat}
                    // console.log(markers)
                    setMarkers(markers.push(markerz))
                    console.log(markers)
                   
                    // console.log(Math.abs(marker.getLngLat().lng))
                    // console.log(marker.id)
                   
                   marker.on('dragend', (e)=>{
                    let lngLat = e.target.getLngLat();
                    setCoords({lng:lngLat['lat'], lat:lngLat['lng']})
                    console.log(coords)
                    //    let lngLat = e.target.getLngLat();
                    //    coords.push({lng:lngLat['lat'], lat:lngLat['lng']})
                    // let index = markers.findIndex(marker=> marker.id === e.target.id)
                    // markers[index].lng = lngLat['lng']
                    // markers[index].lat = lngLat['lat']
                    // console.log(markers)
                    // setMarkers(markers)

                    
                   })
              
                         
                                
            } );
           
        };

        if (!map) initializeMap({ setMap, mapContainer });
    }, [map]);

function handleMarker(e){
    e.preventDefault();
   let marker =  new mapboxgl.Marker({ color: 'black', draggable: true,})
                    .setLngLat([coords.lng, coords.lat])
                    .addTo(map)
                    marker.id = Math.abs(marker.getLngLat().lng)
                    let markerObj = {id: marker.id, lng: marker.getLngLat().lng, lat: marker.getLngLat().lat}
    setMarkers(markerObj)
    console.log(markers)

}

    return (
        <div>
            <div ref={el => (mapContainer.current = el)} style={styles} />
            <div className="sidebar">
                Center = Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <form  onSubmit={e =>handleMarker(e)}>
            <label/>
            <input name="lng" value={coords.lng} placeholder="Longitude"/>
            <input value={coords.lat} placeholder="Latitude"/>
           
         <button>New Marker</button>
            </form>
            
        </div>
        );
};

export default ReactMap;