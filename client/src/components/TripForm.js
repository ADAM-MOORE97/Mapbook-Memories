import React, { useState, useEffect } from 'react'

export default function TripForm({ user }) {
    const [name, setName] = useState('')
    const [start_date, setStart_Date] = useState('')
    const [end_date, setEnd_Date] = useState('')
    const [description, setDescription] = useState('')
    const [placeId, setPlaceId] = useState('')
    const [taken, setTaken] = useState('')
    const [attachment, setAttachment] = useState({ attachments: [] })
    const [places, setPlaces] = useState([])
 

    useEffect(() => {
        fetch('/places')
            .then(r => r.json())
            .then(data => setPlaces(data))
    }, [])


    const submitForm = (e) => {
        e.preventDefault();
        console.log(attachment)
        const form = e.target
      
        const formData = new FormData();
        // formData.append("name", form.name.value)
        formData.append("name", name)
        formData.append("user_id", user.id)
        formData.append("place_id", placeId)
        formData.append("description", description)
        formData.append("start_date", start_date)
        formData.append("end_date", end_date)
        formData.append("taken", taken)
        for (let i = 0; i < form.attachments.files.length; i++) {
            formData.append('attachments[]', form.attachments.files[i])
        }

        fetch('/trips', {
            method: 'POST',
            body: formData
        }).then(r => r.json())
            .then(data => {
                
                console.log(data)
            })
    }

    const onImageUpload = (e) => {

        setAttachment({
            attachments: [...e.target.files]
        })
    }
    const handlePlaceChange = (e) => {
        setPlaceId(e.target.value)
    }

    return (
        <div className='container-fluid mt-5'>
                 <div className='row'>
            <form className='col-6' onSubmit={submitForm}>
            <label className='form-label'>Place:</label>
                <select name='place' className='form-control border-dark' onChange={handlePlaceChange}>
                    <option value="Select a Place"> -- Select a Place -- </option>
                    {places.map((place) => <option value={place.id}>{place.name}</option>)}
                </select>
                <label className='form-label'>Name:</label>
                <input className='form-control border-dark' name='name' onChange={(e) => setName(e.target.value)} placeholder='Trip Name'></input>
                <label className='form-label'>Start Date:</label>
                <input className='form-control border-dark' type='date' name='start_date' onChange={(e)=>setStart_Date(e.target.value)}></input>
                <label className='form-label'>End Date:</label>
                <input className='form-control border-dark' type='date' name='end_date' onChange={(e)=>setEnd_Date(e.target.value)}></input>
                <label className='form-label'>Trip Description:</label>
                <textarea className='form-control border-dark' name='description' onChange={(e)=>setDescription(e.target.value)}></textarea>
                <label className='form-label'>Check if Trip Taken:</label>
                <input type='checkbox' name='taken' onChange={(e)=>setTaken(e.target.checked)}></input> 
                <br></br>
                {taken? <div><label className='form-label'>Trip Images:</label>
                <input className='form-control border-dark' name='attachments' type='file' accept='image/*' multiple={true} onChange={onImageUpload}></input></div> : null}
                <button type='submit'>Submit</button>
            </form>

        </div>

        </div>
   
    )
}
