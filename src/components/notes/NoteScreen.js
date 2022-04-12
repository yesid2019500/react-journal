import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAddBar } from './NotesAddBar'

// aqui vamos a editar la nota 
export const NoteScreen = () => {

  const dispatch = useDispatch();

// vamos a obtener la referencia a la nota activa
// extaemos la nota activa, active:note es porque lo renombramos
const {active:note} = useSelector( state => state.notes );
// console.log(note)

// recibe los argumentos de los campos del formulario
const [ formValues, handleInputChange, reset] = useForm(note)
// console.log(formValues)
// ahora lo extraeremos
const {body, title, id} = formValues

// useRef nos permite almacenar una variable mutable, que no
// va redibujar todo el componente si cambia y apuntara al note.id
// este activeId es la nota seleccionada actualemente
const activeId = useRef(note.id)

// vamos a hacer una comparacion con la nota que cambio
// activeId.current es para obtener el valor actual
useEffect( ()=>{
// la idea es que solo se dispare si la nota.id cambio
  if (note.id !== activeId.current) {
      // si no es asi entonces resetiamos el formulario con la nueva nota
      reset(note)
      // ahora establecemos el nuevo valor
      activeId.current = note.id
  }

},[note, reset])


// se va disparar cuando algo cambie
useEffect(() => {
// console.log(formValues)
  
// el dispatch es para actualizar la nota activa
dispatch(activeNote(formValues.id, {...formValues}))

}, [formValues, dispatch])


// eliminar
const handleDelete = () => {
  // console.log(id)
  dispatch(startDeleting(id))
}

  return (
    <div className="note_main-content">
        <NotesAddBar/>
        <div className="notes__content">
            <input 
            type="text" 
            placeholder='Some awesome title'
            className="notes__title-input"
            autoComplete='off'
            value={title}
            name="title"
            onChange={handleInputChange}
            />
            <textarea name="body"
            className='note__textarea' 
            placeholder='What happened today? '
            value={body}
            onChange={handleInputChange}
            >
            
            </textarea>

           {
// si existe muestra la imagen
             (note.url) &&
             (
              <div className="notes__images">
              <img src={note.url} alt="imagen" />
            </div>
             )
           }

        </div>

           <button 
           className='btn btn-danger'
           
           onClick={handleDelete}
           >
             Delete
           </button>

    </div>
  )
}
