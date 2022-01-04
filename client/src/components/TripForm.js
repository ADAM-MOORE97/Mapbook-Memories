import React, {useState} from 'react'

export default function TripForm({user}) {
    const [name, setName] = useState(''
  )
  const [attachment, setAttachment] = useState({attachments:[]})
    // const [showImgForm, setShowImgForm] = useState(false)
    // const [image, setImage] = useState()

 const submitForm = (e)=>{
e.preventDefault();
console.log(attachment)
const form = e.target
const formData = new FormData();
  formData.append("name", form.name.value);
  formData.append("user_id", user.id)
  formData.append("place_id", 1)
//   formData.append("attachment", attachment);
// console.log(form.attachments.files)
for(let i=0; i< form.attachments.files.length; i++ ){
    formData.append('attachments[]', form.attachments.files[i])
}

  fetch('/trips',{
      method: 'POST',
      body: formData
  }).then(r=>r.json())
  .then(data=>console.log(data))
 }

 const onImageUpload = (e) => {
setAttachment({
    attachments: e.target.files
})
 }

    return (
        <div>
            <form onSubmit={submitForm}>
                <input  name='name' onChange={(e)=>setName(e.target.value)}></input>
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
