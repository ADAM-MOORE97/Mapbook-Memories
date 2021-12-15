import React, { useRef, useEffect, useState} from 'react';
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';


mapboxgl.accessToken = 'pk.eyJ1IjoiYWRhbW1vb3JlMjEiLCJhIjoiY2t4NTY4MmxkMjE3MTJ1bXI0c2hkcWF4MCJ9.4mGlkslBlwc6tAmqbmUuoA';
function Map() {
const mapContainer = useRef(null);
const map = useRef(null);
const [lng, setLng] = useState(-97.3);
const [lat, setLat] = useState(37.10);
const [zoom, setZoom] = useState(3);
let jsondata = {
    type: "MultiPoint",
    coordinates: 
        [[-97.10, 37.01], [51.0, 1.0]]
    
 }

useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng,lat],
      zoom: zoom
    });
    const directions =  new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    });
  map.current.addControl(directions, 'top-right')

 
  
  map.current.on('click', (e)=>{
    console.log(e.lngLat.lat)
    console.log(e.lngLat.lng)
   
  })
  
  
  map.current.on('move', () => {
    setLng(map.current.getCenter().lng.toFixed(4));
    setLat(map.current.getCenter().lat.toFixed(4));
    setZoom(map.current.getZoom().toFixed(2));
    });
  
    let hey = jsondata.coordinates.map(coords =>{
        let marker = new mapboxgl.Marker({color: 'black', draggable: true,  })
        .setLngLat(coords)
        .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(
                '<h3>hey</h3><a href="https://www.youtube.com/watch?v=0yW7w8F2TVA">link</a>'
              )
          )
        .addTo(map.current)
}) 

  });


    return (
        <div>
                 <div ref={mapContainer}
      className='map-container'
      style={{height: '400px',
      margin:'100px'}}>
      </div>
      <div className="sidebar">
Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
</div>
        </div>
    )
}
export default Map;


