import React from 'react'
import { useSelector } from 'react-redux';
import { JournalEntry } from './JournalEntry';

export const JournalEntries = () => {

// const entries = [1,2,3,4,5];
// estraeremos las notes del stado
const { notes } = useSelector( state => state.notes );
// console.log(notes)
// vamos a recorrer los entries y devolvemos lo que tenga el componente 
// JournalEntry por cada recorrido

// le estamos pasando las notas por medio de las props a JounalEntry
  return (
    <div className='journal__entries '>
        {
            notes.map( note => (
                <JournalEntry 
                key={note.id}
                {...note}
                
                />
            ))
        }
    </div>
  )
}
