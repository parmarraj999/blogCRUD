import React, { useState } from 'react'
import '../../utility/style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const Tags = () => {

  const [tagValue,setTagValue] = useState();
  const [tags,setTags] = useState([]);
  const [hide ,setHide] = useState(true);

  const addTags = (e) => {
    if(e.keyCode === 13 && tagValue ){
        setTags([...tags, tagValue])
        console.log(tagValue)
        setTagValue('')
    }
  }
  // const delTags = (index) => {
  //   const remainTags = tags.filter((t)=> t !== index)
  //   setTags(remainTags)
  // }

  if(tags.length === [0]){
    setHide(true)
  }

  return (
    <div className='tagsWrapper'>
       <label htmlFor="tags">Tags</label>
       <div className='tagsContainer'>
       <ul className='tagsContainer'>
           {
               tags.map((tags,index)=>{
                   return(
                       <li key={index} >
                           {tags}
                           <FontAwesomeIcon className='icon' icon={faClose}/>
                           {/* add delete function on click icon  */}
                       </li>
                   )
               })
           }
        </ul>
        {
          hide ?
          ""
          :
          <input
           type='text' 
           className='tagsInput'
           placeholder='enter tags here '
           onChange={(e)=>setTagValue(e.target.value)}
           onKeyDown={addTags}
           value={tagValue}
           />
           
        }
       </div>
    </div>
  )
}

export default Tags
        // <input
        //  type='text' 
        //  className='tagsInput'
        //  placeholder='enter tags here '
        //  onChange={(e)=>setTagValue(e.target.value)}
        //  onKeyDown={addTags}
        //  />
        //  <ul className='tagsContainer'>
        //     {
        //         tags.map((tags,index)=>{
        //             return(
        //                 <li key={index}>
        //                     {tags}
        //                 </li>
        //             )
        //         })
        //     }
        //  </ul>