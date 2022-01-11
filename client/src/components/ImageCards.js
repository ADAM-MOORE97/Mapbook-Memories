import React, { useState, useEffect } from 'react'
import '../App.css'


export default function ImageCards({ images, info, }) {
console.log(images)

    const [place, setPlace] = useState({})
    const [index, setIndex] = useState(0); // create state to keep track of images index, set the default index to 0
    console.log(info.start_date)
    const slideRight = () => {
        setIndex((index + 1) % images.length); // increases index by 1
    };

    const slideLeft = () => {
        const nextIndex = index - 1;
        if (nextIndex < 0) {
            setIndex(images.length - 1); // returns last index of images array if index is less than 0
        } else {
            setIndex(nextIndex);
        }
    };

    useEffect(() => {
        fetch(`/places/${info.place_id}`)
            .then(r => r.json())
            .then(data => setPlace(data))
    }, [])
    return (
     <div>
         <div className='card'>
                       <div className='card-header'>
                       <h2>TRIP: {info.name}</h2>
                        <h5>Start: {info.start_date}, End: {info.end_date} </h5>
                       </div>
                </div>
                <div className='m-3'>

                
                {images.map(image=><div className='polaroid center'><a title={place.name}><img  src={image} alt={index} /></a></div>)}
                           
                      
                





            </div>

     </div>
               
        
    )
}
