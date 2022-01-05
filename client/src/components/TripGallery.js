import React, {useState, useEffect} from 'react'
import ImageCards from './ImageCards'

export default function TripGallery() {
    const [carousel, setCarousel] = useState(true)
    const[tripData, setTripData] = useState([])
    const [filterTrip, setFilterTrip] = useState([])

    useEffect(()=>{
        fetch('/trips')
        .then(r=>r.json())
        .then(data=>{
            setTripData(data)
            setFilterTrip(data)
            console.log(data)
        })
    },[])
    return (
        <div>
            <button onClick={()=>setCarousel(!carousel)}>Toggle Display</button>
            {filterTrip.map((tripInfo)=>{
                let info = tripInfo
                let images = tripInfo.attachment_urls
                    return <ImageCards carousel={carousel} images={images} info={info} />
                })}
            
        </div>
    )
}
