import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth';
import { startNewNotes } from '../../actions/notes';
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout())
  } 

// nos devuelve informacion del stado
// vamos a extraer de auth, lo que necvesitamos
const {name, photo} = useSelector( state => state.auth );
// console.log(state)
console.log(name, photo)

// funcion de las entradas
// haremos el dispatch de una accion dentro de esta funcion
const handleAddNew = () => {
  dispatch(startNewNotes() )
}

  return (
    <aside className='journal__sidebar'>
        <div className="journal__sidebar-navbar">
            <h3 className="mt-5">
            <div className="photo">
             {
                (!photo)
                ? (<img className="true" src={'https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg'} alt="" />)

                : (<img className="true" src={photo} alt="" />)
             }
             
            </div>
               <i className="far fa-moon"></i>
               <span>{name}</span>
            </h3>
            <button className="btn"
            onClick={ handleLogout }

            >
              Logout
            </button>
        </div>
        <div className="journal__new-entry" 
        onClick={ handleAddNew }>
          <i className="far fa-calendar-plus fa-5x"></i>
          <p className="mt-5">New Entry</p>
        </div>
        <JournalEntries/>
    </aside>
  )
}
