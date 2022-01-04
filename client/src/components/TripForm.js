import React, { useState, useEffect } from 'react'

export default function TripForm({ user }) {
    const [name, setName] = useState(''
    )
    const [attachment, setAttachment] = useState({ attachments: [] })
    // const [showImgForm, setShowImgForm] = useState(false)
    const [image, setImage] = useState()
    const [places, setPlaces] = useState([])
    const style = {
        width: '400px',
        height: '400px'
    }

    useEffect(() => {
        fetch('/places')
            .then(r => r.json())
            .then(data => setPlaces(data))
    })


    const submitForm = (e) => {
        e.preventDefault();
        console.log(attachment)
        const form = e.target
        const formData = new FormData();
        formData.append("name", form.name.value);
        formData.append("user_id", user.id)
        formData.append("place_id", 1)
        //   formData.append("attachment", attachment);
        // console.log(form.attachments.files)
        for (let i = 0; i < form.attachments.files.length; i++) {
            formData.append('attachments[]', form.attachments.files[i])
        }

        fetch('/trips', {
            method: 'POST',
            body: formData
        }).then(r => r.json())
            .then(data => {
                setImage(data);
                console.log(data)
            })
    }

    const onImageUpload = (e) => {

        setAttachment({
            attachments: [...e.target.files]
        })
    }
    const handlePlaceChange = (e) => {
        console.log(e.target.value)
    }

    return (
        <div>
            {image ? image.attachment_urls.map((pic) => <img src={pic} style={style} />) : null}
            <form onSubmit={submitForm}>
                <select onChange={handlePlaceChange}>
                    <option value="Select a Place"> -- Select a Place -- </option>
                    {/* Mapping through each fruit object in our fruits array
          and returning an option element with the appropriate attributes / values.
         */}
                    {places.map((place) => <option value={place.id}>{place.name}</option>)}
                </select>
                <input name='name' onChange={(e) => setName(e.target.value)}></input>
                {/* <input value={tripData.start_date} name='start_date' onChange={handleChange}></input>
                <input value={tripData.end_date} name='end_date' onChange={handleChange}></input>
                <input value={tripData.description} name='description' onChange={handleChange}></input>
                <input type='checkbox' name='taken'></input> */}
                <input name='attachments' type='file' accept='image/*' multiple={true} onChange={onImageUpload}></input>
                <button type='submit'>Submit</button>
            </form>

        </div>
    )
}
