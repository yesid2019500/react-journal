
import Swal from 'sweetalert2'

import { db } from "../firebase/firebase-config"
import { fileUpload } from '../helpers/fileUpload'
import { loadNotes } from "../helpers/loadNotes"
import { types} from '../types/types'

// nombre claudinay imagenes react-journal

// esta es una funcion asincrona, recordar que esto es gracias al think que viene de redux, que este seria el dispatch, gracias a getState podemos obtener el id del usuario, es parecido al useSelector de redux
export const startNewNotes = () => {
    return async (dispatch, getState) => {
        // vamos a grabar en la base de datos de firebase faistore
        // nos traera todo el state del la aplicacion
        // const state = getState()
        // console.log(state)
        const {uid} = getState().auth
    
        // console.log(uid)
        // ahora vamos a crear la nota que queremos grabar
        const newNotes = {
            title: '',
            body: '',
            date: new Date().getTime()
        }
 // le enviaremos esto a firestore
//  estamos guardando en la base de datos que creamos
// journal/notes es la ruta la collecion que creamos en firebase database
 const doc = await db.collection(`${uid}/journal/notes`).add(newNotes)
//  console.log(doc)
// ya que tenemos la informacion del documento podemos activar esa nota
// los parametros que recibe
    dispatch(activeNote(doc.id, newNotes))

    dispatch(addNewNotes(doc.id, newNotes))
       
    }
}

// ...note es para que tenga toda la estructura
// que definimos en la nota, todo el objecto
export const activeNote = (id , note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

// agregar otra nota
export const addNewNotes  = (id, note) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }
})



export const startLoadingNotes = (uid) => {
    return async (dispatch)=> {
        const notes = await loadNotes(uid)
        dispatch(setNotes(notes))
    }
}


// otra accion// vamos a recibir las nmotas quw vienen de la base de datos
// el payload son todas las notas que estamos recibiendo como argumento
export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
})


// esta es la accion para grabar en la base de datos el cambio de las notas

export const startSaveNote = (note) => {
    return async (dispatch, getState)=> {
        const { uid } = getState().auth

        // validacion. si no viene el url
            if (!note.url) {
                delete note.url
            }

        const noteToFirestore = {...note}
        // eliminaremos el id
        delete noteToFirestore.id

        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore)

       dispatch( refreshNote(note.id, noteToFirestore))
       Swal.fire('Save Note', note.title, 'success')
    }       
}

// esta accion es para que cuando editemos la nota se actualice solo en la nota 
// que hemos realizado el cambio

export const refreshNote = (id, note) =>({
    type: types.notesAddUpdate,
    payload: {
        id, note:{
            id,
            ...note
        }
    }
})

// NOTA LAS FUNCIONES QUE EMPIEZAN CON STAR SON ASINCRONAS

// accion para cargar imagenes
// el argumento es la imagene que queremos ubir
// return => este return es thunk para tareas asincronas de redux
export const  startUploading = (file) => {
// el dispatch lo utilizaremos para actualizar la nota actual y otras cosas, el getState es para saber la nota actual
// active:activeNote: esto es solo para renonbrar
    return async (dispatch, getState) => {
        const {active:activeNote} = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            onBeforeOpen:()=> {
                Swal.showLoading()
            }
        })

        // console.log(file)
        // console.log(activeNote)
        // vamos a cargar la imagen

        const fileUrl = await fileUpload(file)
        // console.log(fileUrl)
        activeNote.url = fileUrl

        dispatch(startSaveNote( activeNote))

        Swal.close();
    }   
}

// accion de borrar 

export const startDeleting = (id) => {
// el getState es para el url que necesito borrar
    return async (dispatch, getState) => {
        const uid = getState().auth.uid;

        // console.log(`${uid}/journal/notes/${id}`)
        await db.doc(`${uid}/journal/notes/${id}`).delete();

        dispatch(deleteNotes(id))
    }
}


export const deleteNotes = (id) => ({
    type: types.notesDelete,
    payload: id
})


// esto es para purgar la informacion cuando nos salimos de la app

export const noteLogout = () => ({
    type: types.notesLogoutCleaning
})