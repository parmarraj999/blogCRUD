import './App.css';
import { BrowserRouter ,Routes ,Route } from 'react-router-dom'
import { useEffect, useState } from 'react'; 
import './utility/style.css'
import Home from './pages/home';   
import AuthPage from './pages/authpage';
import Header from './pages/header';
import Create from './pages/create';
import Detail from './pages/detail';
import About from './pages/about'
import { auth } from './pages/firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {

  const [isLogIn,setIsLogIn] = useState(false);
  const [showBack,setShowBack] = useState(false);
  const [showSignOut,setShowSignOut] = useState(false);
  const [user,setUser] = useState(null);
  const [userId,setUserId] = useState(null);


  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        setUser(authUser);
      }else{
        setUser(null)
      }
    })
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserId(uid)
      } else {
        console.log("user is logged out")
      }
    });
  })

  return (
    <div className="App">
      <BrowserRouter>
       <Header
        isLogIn={isLogIn}
        setIsLogIn={setIsLogIn}
        showBack={showBack}
        setShowBack={setShowBack}
        showSignOut={showSignOut}
        setShowSignOut={setShowSignOut}
       />
        <Routes>
          <Route path='/' element={<Home userId={userId}
           showSignOut={showSignOut}
          />}/>

          <Route path='/auth' element={<AuthPage
           isLogIn={isLogIn}
           setIsLogIn={setIsLogIn}
           showBack={showBack}
           setShowBack={setShowBack}
           showSignOut={showSignOut}
           setShowSignOut={setShowSignOut}
          />}/>

          <Route path='/create' element={<Create user={user}/>}/>

          <Route path='/update' element={<Create user={user}/>}/>

          <Route path='/detail' element={<Detail/>}/>

          <Route path='/about' element={<About/>}/>

        </Routes>
      </BrowserRouter>
      </div>
  );
}

export default App;
