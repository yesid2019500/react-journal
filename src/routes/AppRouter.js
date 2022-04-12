import React, { useEffect, useState } from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";

import {firebase} from '../firebase/firebase-config'
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

import {startLoadingNotes } from '../actions/notes';
  // contiene el login y logout
export const AppRouter = () => {

// este ustate es para revisar el estado de 
// firebase, mientras sea true, no mostraremos nada mas de la app
// puesto que no sabemos si esta autenticado o no
// el setCheking es para cambiar ese estado
const [ cheking,  setCheking ] = useState(true);
const [ isLoggedIn , setIsLoggedIn ] = useState(false)

const dispatch = useDispatch();

// si no le pasamos nada al array esto solo se ejecutar una vez
// aunque le estamos pasando el dispath al array si no lo pasamos igual va funciona y solo se ejecutar una vez
useEffect(() => {
  // esto trae un observable que es un tipo de objecto que se puede
  // ejecutar mas de una vez, por ejemplo cuando la autenticacion cambia
  // se va disparar, si se logea tambien
  firebase.auth().onAuthStateChanged( async (user)=>{
      // console.log(user)
      // si esiste, significa que estoy autenticado
    // el signo ? pregunta si el user tiene algo pregunta si esta el uid
    // si entra a esta condion esta logeado de manera correcta
    // aqui estamos trayendo la imagen tambien photoURL
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName, user.photoURL))
        setIsLoggedIn(true)

          // esta funcion carga las notas de la db firebase
          dispatch(startLoadingNotes(user.uid))

      }else{

        setIsLoggedIn(false)

      }
      setCheking(false)
  })

}, [dispatch, setCheking, setIsLoggedIn])

// si es true
if (cheking) {
  return ( 
    <h1>Please Wait...</h1>
  )
}


  return (
       <Router>
         <div>
          <Switch>
                <PublicRoute path='/auth'
                 component={AuthRouter}
                 isAuthenticated={isLoggedIn}
                  />

                <PrivateRoute
                 exact
                 isAuthenticated={isLoggedIn}
                 path='/'
                 component={JournalScreen} />
                <Redirect to='auth/login' />
            </Switch>
         </div>
      </Router>
  )
}
