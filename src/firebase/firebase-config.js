import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {

    apiKey: "AIzaSyDHH1J-0rNSGy2NqdH1XEITem9YlcjLxDs",
  
    authDomain: "react-curso-redux-3086e.firebaseapp.com",
  
    projectId: "react-curso-redux-3086e",
  
    storageBucket: "react-curso-redux-3086e.appspot.com",
  
    messagingSenderId: "608207801163",
  
    appId: "1:608207801163:web:7d2d5ae9d72bea56b9f6ce"
  
  };
  
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);    

//  esta funcion es la referencia a la base de datos
const db = firebase.firestore();

// esta funcion es para la autenticacion con cualquier red social exact
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export {
    db, 
    firebase,
    googleAuthProvider
}