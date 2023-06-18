import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faPlus } from '@fortawesome/free-solid-svg-icons'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from './firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
// import Tags from './smallComponent/tags'

function Create({ user }) {

  const catogoryOptions = [
    "Fashion",
    "Technology",
    "Food",
    "Politics",
    "Sports",
    "Bussiness"
  ]
  const initialState = {
    title: '',
    tags: [],
    category: "",
    description: ""
  }

  const [showCard, setShowCard] = useState(false);
  const [form, setForm] = useState(initialState);
  const [image, setImage] = useState('');
  const [percent, setPercent] = useState(0);

  const { title, category, description } = form;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const onCatogoryChange = (e) => {
    setForm({ ...form, category: e.target.value })
  }

  useEffect(() => {
    console.log(form)
  })

  const navigate = useNavigate();
  if(percent === 100){
    navigate("/")
  }
  function handleUpload(e) {
    setImage(e.target.files[0]);
  }
  function imageUpload() {
    if (!image) {
      alert('please select image')
    }
    const storageRef = ref(storage, `/files/${image.name}`)
    const uploadTask = uploadBytesResumable(storageRef, image)
    uploadTask.on("state_changed",
      (snapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url)
        })
      }
    )
  }
  // ---------- tags system --- 
  const [tagValue, setTagValue] = useState();
  const [tags, setTags] = useState([]);

  const addTags = (e) => {
    if (e.keyCode === 13 && tagValue) {
      setTags([...tags, tagValue])
      console.log(tagValue)
      setTagValue('')
      setForm({ ...form, tagValue })
    }
  }

  // -------- main submit function ------ 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && description && image && category) {
      try {
        await addDoc(collection(db, "blogs"), {
          ...form,
          timestamp: serverTimestamp(),
          userId: user.uid,
          author: user.displayName
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className='createPageContainer'>
      <div className="createBtn" onClick={() => setShowCard(true)}>
        <FontAwesomeIcon icon={faPlus} />
      </div>
      <form onSubmit={handleSubmit}  className={`createFormContainer ${showCard ? 's1' : 's0'}`}>
        <div className="cardHeader">
          <h1>Create Blog</h1>
          <FontAwesomeIcon className='icon' icon={faClose} onClick={() => setShowCard(false)} />
        </div>
        <div className="inputBox">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name='title'
            placeholder='title'
            onChange={handleChange}
            value={title}
          />
        </div>
        {/* ------ add tags system here ----  */}

        <div className='tagsWrapper'>
          <label htmlFor="tags">Tags</label>
          <div className='tagsContainer'>
            <ul className='tagsContainer'>
              {
                tags.map((tags, index) => {
                  return (
                    <li key={index} >
                      {tags}
                      <FontAwesomeIcon className='icon' icon={faClose} />
                      {/* add delete function on click icon  */}
                    </li>
                  )
                })
              }
            </ul>
            <input
              type='text'
              className='tagsInput'
              placeholder='enter tags here '
              onChange={(e) => setTagValue(e.target.value)}
              onKeyDown={addTags}
              value={tagValue}
            />
          </div>
        </div>

        {/* ------ add tags system here ----  */}
        <select
          className='trendingBox'
          value={category}
          onChange={onCatogoryChange}
        >
          <option>Please select option</option>
          {
            catogoryOptions.map((options, index) => {
              return (
                <option value={options} key={index}>
                  {options}
                </option>
              )
            })
          }
        </select>

        <div className='textAreaContainer'>
          <label htmlFor="textarea">Description</label>
          <textarea
            name='description'
            type="text"
            onChange={handleChange}
            value={description}

          />
        </div>

        <div className="imgUploadSection">
          <input
            type="file"
            className='file'
            onChange={handleUpload}
            accept='/image/*'
          />
        </div>

        <div className='progress_box'>
          <h2>Progress</h2>
          <p>{percent}</p>
        </div>
        <div className='uploadBtn'>
          <button className='create-btn btn' onClick={imageUpload}>Create</button>
        </div>
        <div>

        </div>
      </form>
    </div>
  )
}

export default Create