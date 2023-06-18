import React from 'react'
import '../utility/style.css'
import excerpt from './excerpt'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

const Blogsection = ({ blogs, user }) => {
    return (
        <div className='blogCardContainer'>
            {
                blogs.map((data, key) => {
                    return (
                        <div className='blogCard'>
                            <div className='blogImgContainer'>
                                <img src='./images/auth-bg.jpg' />
                            </div>
                            <div className='blogDetails'>
                                <h1>{excerpt(`${data.title}`, 70)}</h1>
                                <p>{excerpt(`${data.description}`, 95)}</p>

                            </div>
                            <div className='blogData'>
                                <div className='dateBox'>
                                    <FontAwesomeIcon icon={faCalendar} />
                                    <h3>{data.timestamp.toDate().toDateString()}</h3>
                                </div>
                                <div className='categoryBox'>
                                    <h3>{data.category}</h3>
                                </div>
                            </div>
                            <div className='blogCardBtn'>
                                <button>Read More ....</button>
                            </div>
                        </div>

                    )
                })
            }
        </div>
    )
}

export default Blogsection
