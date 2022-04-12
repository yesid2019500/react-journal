
import React from 'react';
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({ id, date, title, body, url }) => {

  const noteDate = moment(date);
  // console.log(noteDate)
  const dispatch = useDispatch();

  // evento de las etradas
  const handleEntryClicks = () => {
      dispatch(activeNote(id,{
          date, title, body,url
      }))
  }

  // console.log(id,date,title,body,url)
  return (
    <div className="journal__entry cursor"
    
    onClick={handleEntryClicks}
    
    >
      {/* si el url es existe muestra esto */}

       {
         url &&
          <div className="journal_entry-pictures" style={{
            backgroundSize:'cover',
            backgroundImage: `url(${url})`
        }}>
        </div>
       }

        <div className="journal__entry-body">
            <p className="journal__entry-title">{title}</p>
            <p className="journal__entry-content">{body}</p>
        </div>
        <div className="journal__entry-date-box">
            <span>{noteDate.format('dddd')}</span>
            <h4>{noteDate.format('Do')}</h4>
        </div>
    </div>
  )
}
