import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from './firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import Blogsection from '../component/blogsection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


function Home(props) {

  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    const onSubmit = onSnapshot(
      collection(db, "blogs"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() })
          setBlogData(list)
        })
      }, (err) => {
        console.log(err)
      }
    )
  })

  return (
    <div className="mainHomeContainer">
      <div className='heroSection'>
        <h1><span>Stay</span> Updated !</h1>
        {
          props.showSignOut ?
            <Link className='homeCreateBtn' to='/create'>
              <FontAwesomeIcon className='createIcon' icon={faPlus} />
            </Link>

            :
            <Link to='/auth' className='login-btn btn'>login</Link>
        }
      </div>
      <div className='blogsHeader'>
        <h1>Daily Blogs</h1>
      </div>
      <div className='blogSEction'>
      <Blogsection blogs={blogData} />
      </div>
    </div>
  )
}

export default Home