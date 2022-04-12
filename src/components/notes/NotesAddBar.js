import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAddBar = () => {

  const dispatch = useDispatch();

  // extraeremos la nota con useSelector
  const { active } = useSelector( state => state.notes );

// funcion para guardar
const handleSave = () => {
  // console.log(active)
  dispatch(startSaveNote(active))

}

// funcion cargar imagenes
const handlePictureClick = () => {
  document.querySelector('#fileSelector').click();
}

// funcion cuando cambie el input
const handleFileChange = (e) => {
  // console.log(e.target.files)
  const file =  e.target.files[0];
  // si tenemos una imagen
  // entonces dispararemos una accion
  if (file) {
      dispatch(startUploading(file))
  }
 
}

  return (
    <div className="notes__appbar">
        <span>28 Marzo 2022</span>

      <input type="file" 
        id='fileSelector'
        name='file'
        style={{display: 'none'}}
        onChange={handleFileChange}
      />

        <div className="">
            <button 
            className="btn"
            onClick={handlePictureClick}

            >Picture</button>
            <button 
            className="btn"
            onClick={handleSave}
            >
            Save</button>
        </div>
           
    </div>
  )
}
