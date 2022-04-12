import { types } from "../types/types";

// el state estara vacio cuando no este autenticado
// cuando esten autenticados los usuarios tendran un id, nombre



/*
{
    uid: 'jdjsdse',
    name: 'Yessi'
}
*/
export const authReducer = (state={}, action) => {
    switch (action.type) {
        case types.login: 
// este id lo devolvera firbase
           return {
                uid:action.payload.uid,
                name: action.payload.displayName,
                photo: action.payload.photoURL,
              }
// cuando salgan de la app sera un objecto vacio
        case types.logout: 
           return {}

         
        default:
            return state;
    }
}