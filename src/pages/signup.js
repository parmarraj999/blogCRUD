import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebase';

function Signup(props) {

    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [conPass, setConPass] = useState();
    const [user ,setUser] = useState();

    const [error,setError] = useState();

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== conPass) {
            setError("password not matching")
        } else {
            await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setUser(user)
                console.log(user);
                navigate("/home")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                setError(errorMessage);
            });
        }
    }

    return (
        <div className='loginPageContainer'>
            <div>
                <h1>Join BlogCRUD </h1>
            </div>
            <div className='form-input'>
                {/* <input type='text' placeholder='name' value={name} onChange={(e)=>setName(e.target.value)} /> */}
                <input type='text' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type='password' placeholder='confirm password' value={conPass} onChange={(e) => setConPass(e.target.value)} />
            </div>
            <div className='formBtnContainer'>
                <button onClick={onSubmit}>Create</button>
                <p>already have an account ? <span style={{ color: 'blue' }} onClick={(e) => props.setIsLogIn(true)}>Login</span></p>
                <p style={{color:'red',fontWeight:'600'}}>{error}</p>
            </div>
        </div>
    )
}

export default Signup  