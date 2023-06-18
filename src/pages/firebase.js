import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore'

// const firebaseConfig = {
//   apiKey: "AIzaSyA0TJzZu3OntnRh9Hkx0XA_ZWWYf2zm4_w",
//   authDomain: "auth-app-72755.firebaseapp.com",
//   projectId: "auth-app-72755",
//   storageBucket: "auth-app-72755.appspot.com",
//   messagingSenderId: "583836048340",
//   appId: "1:583836048340:web:57abfed48993d6122a9441"
// };

const firebaseConfig = {
  apiKey: "AIzaSyA_QGvdhDjLu4WcsNXUdsXm6gDL9gncU_4",
  authDomain: "blog-app-react-f8c15.firebaseapp.com",
  projectId: "blog-app-react-f8c15",
  storageBucket: "blog-app-react-f8c15.appspot.com",
  messagingSenderId: "942744215003",
  appId: "1:942744215003:web:819f723cb7cd2add895bfe"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)