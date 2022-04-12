import {firebase, googleAuthProvider} from '../firebase/firebase-config';
import Swal from 'sweetalert2';

import { types } from "../types/types"
import { finishLoading, startLoading } from './ui';
import { noteLogout } from './notes';
// todo lo que empiece en firebase, son funciones propias de firebase
// aqui tendremoas las aciiones

// este es un midelware
// esta funcion dispara la funcion login, solo que ahora
// gracias a thunk el callback parametro  dispatch puede ejecutar una tarea asincrona
// recivimos el name y el password del input
export const startLoginEmailPassword = (email, password) => {
    return (dispatch)=> {

   dispatch(startLoading())
        
 // dispatch(login(628, 'Kelly'))
 firebase.auth().signInWithEmailAndPassword(email, password)
 .then(({user}) => {
     // console.log(user)
// NOTA: podemos ejecutar mas de un dispatch 
     dispatch(login(user.uid, user.displayName))
     dispatch(finishLoading())
  }).catch( err => {
      console.log(err)
      dispatch(finishLoading())
    // vamos a pintar ese error por pantalla
      Swal.fire('Error', err.message, 'error');
     })

 }
}


// esta tambien es una funciona asincrona asi que debemos retornanr un calback en el return es una funcion callback
export const startRegisterWithEmailPassword = (email,password,name) => {
    return ( dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async ({user}) => {
// en esta funcion de firebase podemos establecer el displayname y la foto tambien
// si asi lo queremos
//
          await user.updateProfile({displayName: name })
            // console.log(user)
// NOTA: podemos ejecutar mas de un dispatch 
            dispatch(
                login(user.uid, user.displayName)
                
            )
         }).catch( err => {
             console.log(err)
             Swal.fire('Error', err.message, 'error');
         })

    }
}




// esta es la funcion para autenticacion de google
export const startGoogleLogin = () => {
// como en la anterior 
// este return es la funcion asincrona y su parametro es el dispatc
// este dispatch viene de thunk redux
    return ( dispatch )=> {
        // devuelve una promesa
        firebase.auth().signInWithPopup(googleAuthProvider)
// ay que aclaar que el uid viene como un identifidor unico
// de la autenticacion que hace firebase, vamos a extraerlo
// el dispatch es la accion y ejecutaremos la accion del login
            .then(({user}) => {
                console.log(user)
               dispatch(
                login(user.uid, user.displayName)
               )
            })
    }
}




// las llaves () es para evitar escribir return
export const login = (uid, displayName,photoURL) => ({
     type: types.login,  /*este seria el return */
        payload: {
            uid,
            displayName,
            photoURL
            
    }
})



// accion logout
// NOTA: como es asincrono debemnos poner la funcion return como
// un callback, NOta: el dispath viene de thunk redux que es para
// manejar cosas asincronas, promesas
export const startLogout = () => {
    return async (dispatch) => {
       await firebase.auth().signOut();
       dispatch(logout())

    //    el logout
     dispatch(noteLogout())

    }
}

// esta accion borrara el id y el displayName del store
// NOTA: las llaves () es un return, estamos omitiendo escribir
// return
export const logout = () => ({
    type:types.logout
})

