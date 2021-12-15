// import React, { useRef, useEffect, useState} from 'react';
// import mapboxgl from 'mapbox-gl'
// import 'mapbox-gl/dist/mapbox-gl.css'
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
// import { MapboxStyleDefinition, MapboxStyleSwitcherControl } from "mapbox-gl-style-switcher";
import Map from './Map';
import ReactMap from './ReactMap';
 

// mapboxgl.accessToken = 'pk.eyJ1IjoiYWRhbW1vb3JlMjEiLCJhIjoiY2t4NTY4MmxkMjE3MTJ1bXI0c2hkcWF4MCJ9.4mGlkslBlwc6tAmqbmUuoA';

function App() {
// const mapContainer = useRef(null);
// const map = useRef(null);
// const [lng, setLng] = useState(-97.3);
// const [lat, setLat] = useState(37.10);
// const [zoom, setZoom] = useState(3);

// useEffect(() => {
//   if (map.current) return;
//   map.current = new mapboxgl.Map({
//     container: mapContainer.current,
//     style: 'mapbox://styles/mapbox/streets-v11',
//     center: [lng,lat],
//     zoom: zoom
//   });
//   const directions =  new MapboxGeocoder({
//     accessToken: mapboxgl.accessToken,
//     mapboxgl: mapboxgl
//   });
// map.current.addControl(directions, 'top-right')

// map.current.on('click', (e)=>{
//   console.log(e.lngLat.lat)
//   console.log(e.lngLat.lng)
//   console.log(e)
// })


// map.current.on('move', () => {
//   setLng(map.current.getCenter().lng.toFixed(4));
//   setLat(map.current.getCenter().lat.toFixed(4));
//   setZoom(map.current.getZoom().toFixed(2));
//   });


// });



  return (
    <div>
      {/* <div ref={mapContainer}
      className='map-container'
      style={{height: '400px',
      margin:'100px'}}>
      </div>
      <div className="sidebar">
Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
</div> */}
    {/* <Map/> */}
    <ReactMap/>
    </div>
  );
}

export default App;
