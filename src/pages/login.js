import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

function Login(props) {

    const navigate = useNavigate();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [error,setError] = useState();

    function onLogin(e){
        e.preventDefault();
        props.setShowBack(false);
        if(password===''){
          alert('lsdjf')
        }else{
          props.setShowSignOut(true)
        }
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/")
            console.log(user);
            props.setShowSignOut(true)
            props.setShowBack(false)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            setError(errorMessage);
        });
    }

    if(error){
      props.setShowError(true)
    }

    if(error === "Firebase: Error (auth/network-request-failed)."){
      props.setBoxError("hello")
    }

  return (
    <div className='loginPageContainer' >
        <div>
          <h1>Welcome to BlogCRUD </h1>
        </div>
        <div className='form-input'>
            <input type= 'text' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type='password' placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <div className='formBtnContainer'>
          <button className='' onClick={onLogin}>login</button>
          <p>don't have any account ? <span style={{color:'blue'}} onClick={(e)=>props.setIsLogIn(false)} >signUp</span></p>
          <p style={{color:'red',fontWeight:"600"}}>{error}</p>
        </div>
    </div>
  )
}

export default Login
