import { types } from "../types/types";
// NOTA: explicacion del state
// vamos a definir como queremos que este este state
// tendremos un arreglo que seran las notas y un ocjecto con 
// las notas activas, pero si esta en null eso quiere decil 
// que no hay ninguna nota seleccionada y aparece la pantalla morada
// si esta activa va tener un id, title, body, imagen y fecha



/* 
{
    notes: [],
    active: null,
    active: {
        id: lkkerrrf123,
        title: '',
        body: '',
        imageUrl: '',
        date: 12334
    }
}
*/

const inicitialState ={
    notes: [],
    active: null,
}

export const notesReducer = (state=inicitialState, action) => {
    switch (action.type) {
       
          case types.notesActive:  
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }
           

        case types.notesAddNew:
            return {
                ...state,
                notes: [action.payload,...state.notes]
            }

        case types.notesLoad:
        // podemos ver que estamos recibiendo
        // console.log(action.payload)
            return {
                ...state,
                notes: [...action.payload],
            }

        case types.notesAddUpdate:
    // solo vamos a mutar la nota que nos interesa
            return {
                ...state, 
                notes: state.notes.map(
                    note => note.id === action.payload.id
                    ? action.payload.note
                    : note

                )
            }

        case types.notesDelete:
            // console.log(action.payload)
            return {
                ...state,
                active: null,
                notes: state.notes.filter( note => note.id !== action.payload )
            }

        case types.notesLogoutCleaning:
            return {
                ...state,
                active: null,
                notes: []
            }
    
        default:
            return state;
    }
}
