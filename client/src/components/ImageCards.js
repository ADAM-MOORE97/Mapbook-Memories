import React, { useState, useEffect } from 'react'

export default function ImageCards({ images, info, carousel }) {
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
        images.length > 0 && (
            <div>
                {carousel ?
                    <div>    <div>
                        <h2>Trip: {info.name}</h2>
                        <h4>Place: {place.name}</h4>
                        <h5>Start: {info.start_date}, End: {info.end_date} </h5>

                    </div>
                        <div id='ImageSlideContainer'>
                            <img src={images[index]} alt={index} width={250} />
                            <div>
                                <button onClick={slideLeft}>{"<"}</button>
                                <button onClick={slideRight}>{">"}</button>
                            </div>
                        </div></div> : <div>
                        <h2>Trip: {info.name}</h2>
                                <h4>Place: {place.name}</h4>
                                <h5>Start: {info.start_date}, End: {info.end_date} </h5>
                        {images.map(image => <img src={image} alt={index} width={250} />)}</div>
                }





            </div>
        )
    )
}
