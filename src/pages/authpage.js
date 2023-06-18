import React, { useState } from 'react'
import Login from './login';
import Signup from './signup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

function AuthPage(props) {

  const [showError,setShowError] = useState(false);
  const [errorBox,setBoxError] = useState("")

  return (
    <div className='authPageContainer'>
      <div className='authForm'>
        {
            props.isLogIn ? 
            <Login 
              isLogIn={props.isLogIn}
              setIsLogIn={props.setIsLogIn}

              showBack={props.showBack}
              setShowBack={props.setShowBack}

              showSignOut={props.showSignOut}
              setShowSignOut={props.setShowSignOut}
              
              setBoxError={props.setBoxError}
              setShowError={props.setShowError}
            /> 
            :
            <Signup
            setIsLogIn={props.setIsLogIn}
            /> 
        }
      </div>
      <div className='authImg'>
        <img src='./images/auth-bg.jpg' />
      </div>
      <div className={`errorBox ${showError ? "errorShow" : "errorHide"}`}>
        <h2>{errorBox}</h2>
        <FontAwesomeIcon  className='closeIcon' icon={faClose} />
      </div>
    </div>
  )
}

export default AuthPage