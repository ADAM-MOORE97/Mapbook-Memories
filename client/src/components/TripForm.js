import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function TripForm({ user }) {

    const params = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [start_date, setStart_Date] = useState('')
    const [end_date, setEnd_Date] = useState('')
    const [description, setDescription] = useState('')
    const [placeId, setPlaceId] = useState('')
    const [taken, setTaken] = useState('')
    const [attachment, setAttachment] = useState({ attachments: [] })
    const [places, setPlaces] = useState([])
console.log(params.id)

    useEffect(() => {
        if (params.id) {
            fetch(`/trips/${params.id}`)
                .then(r => r.json())
                .then(data => {
                    setName(data.name)
                    setStart_Date(data.start_date)
                    setEnd_Date(data.end_date)
                    setDescription(data.description)
                    setTaken(data.taken)
                    // setAttachment({ attachments: data.attachment_urls })
                    console.log(data.attachment_urls)
                    console.log(data)
                    console.log(data.place_id)

                    fetch(`/places/${data.place_id}`)
                        .then(r => r.json())
                        .then(data => {
                            console.log(data)
                            setPlaces(data)
                        

                               
                        })
                })
        }
        else {
            fetch('/places')
                .then(r => r.json())
                .then(data => {
                    console.log(data)
                    setPlaces(data)
                })
        }
    }, [])


    const submitForm = (e) => {
        e.preventDefault();
        console.log(attachment)
        const form = e.target
        console.log(name)
        console.log(start_date)
        console.log(taken)
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
       
        fetch(params.id? `/trips/${params.id}` : '/trips' , {
            method: params.id? 'PATCH' : 'POST',
            body: formData
        }).then(r => r.json())
            .then(data => {

                navigate(`/trips/${data.id}`)
            })
    }

    const onImageUpload = (e) => {

        setAttachment({
            attachments: [...e.target.files]
        })
    }
    const handlePlaceChange = (e) => {
        // console.log(e.target.value)
        setPlaceId(e.target.value)
    }

    console.log(attachment)
    if (params.id) {
        return (
            <div className='container-fluid mt-5'>
                <div className='row'>
                    <form className='col-6' onSubmit={submitForm}>
                        <label className='form-label'>Place:</label>
                        <select name='place' className='form-control border-dark' onChange={handlePlaceChange}>
                            <option value="Select a Place"> -- Select a Place -- </option>
                            <option value={places.id}>{places.name}</option>
                        </select>
                        <label className='form-label'>Name:</label>
                        <input className='form-control border-dark' name='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='Trip Name'></input>
                        <label className='form-label'>Start Date:</label>
                        <input className='form-control border-dark' type='date' value={start_date} name='start_date' onChange={(e) => setStart_Date(e.target.value)}></input>
                        <label className='form-label'>End Date:</label>
                        <input className='form-control border-dark' type='date' value={end_date} name='end_date' onChange={(e) => setEnd_Date(e.target.value)}></input>
                        <label className='form-label'>Trip Description:</label>
                        <textarea className='form-control border-dark' name='description' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        <label className='form-label'>Check if Trip Taken:</label>
                        <input type='checkbox' name='taken' checked={taken} onChange={(e) => setTaken(e.target.checked)}></input>
                        <br></br>
                        {taken ? <div><label className='form-label'>Trip Images:</label>
                            <input className='form-control border-dark' name='attachments' type='file' accept='image/*' multiple={true} onChange={onImageUpload}></input>
                            </div> : null}
                        <button type='submit'>Submit</button>
                    </form>

                </div>

            </div>

        )
    }
    else {
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
                        <input className='form-control border-dark' name='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='Trip Name'></input>
                        <label className='form-label'>Start Date:</label>
                        <input className='form-control border-dark' type='date' value={start_date} name='start_date' onChange={(e) => setStart_Date(e.target.value)}></input>
                        <label className='form-label'>End Date:</label>
                        <input className='form-control border-dark' type='date' value={end_date} name='end_date' onChange={(e) => setEnd_Date(e.target.value)}></input>
                        <label className='form-label'>Trip Description:</label>
                        <textarea className='form-control border-dark' name='description' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        <label className='form-label'>Check if Trip Taken:</label>
                        <input type='checkbox' name='taken' checked={taken} onChange={(e) => setTaken(e.target.checked)}></input>
                        <br></br>
                        {taken ? <div><label className='form-label'>Trip Images:</label>
                            <input className='form-control border-dark' name='attachments' type='file' accept='image/*' multiple={true} onChange={onImageUpload}></input></div> : null}
                        <button type='submit'>Submit</button>
                    </form>

                </div>

            </div>

        )
    }

}
// {attachment.attachments.map(image=><img src={image}/>)}