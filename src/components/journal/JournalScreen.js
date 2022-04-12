import React from 'react'
import { useSelector } from 'react-redux'
import { NoteScreen } from '../notes/NoteScreen'
import { NothingSelected } from './NothingSelected'
import { Sidebar } from './Sidebar'
export const JournalScreen = () => {
  // el useSelector es para extraer algo del store

  // const state = useSelector( state => state );
  // console.log(state)
  const { active } = useSelector( state => state.notes );
  // console.log(active)

  
  return (
    <div className="journal__main-content animate__animated animate__fadeIn animate_faster">
       <Sidebar/>
       <main>
      {/* vamos a mostrar un componente de manera condicinal */}

      {
        // si hay algo mostramos NoteScreen, si no el otro
        ( active )
          ? (<NoteScreen/>)

          : (<NothingSelected/>)
      }
        
       </main>
    </div>
  )
}
