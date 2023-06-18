import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {signOut} from 'firebase/auth'
import { auth } from './firebase';

function Header(props) {

    // const [logedIn ,setLogedIn] = useState(false)

    const navigate = useNavigate();
    const handleSignOut=(e)=>{     
        props.setShowSignOut(false)
        props.setShowBack(true)
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/auth");
            console.log("Signed out successfully")
        }).catch((error) => {
            // An error happened.
        });
    }

    function logClick(){
        props.setIsLogIn(true); 
        props.setShowBack(true)
    }
    function backLogClick(){
        props.setIsLogIn(false); 
        props.setShowBack(false)
    }

  return (
    <div className='headerContainer'>
        <Link to='/' className='logo'>
            <h1>Blog<span>CRUD</span></h1>
        </Link>
        <div className='nav-buttons'>
            {
                props.isLogIn ? '' : 
                <Link to='/auth' className='login-btn' onClick={logClick}>login</Link>
            }
            {
                props.showBack ? 
                <Link to='/' className='btn' onClick={backLogClick}>Back</Link>
                : ''
            }
            {
                props.showSignOut ?
                <button className='btn signOutBtn' onClick={handleSignOut}>Sign Out</button>
                :
                ''
            }
        </div>
    </div>
  )
}

export default Header

