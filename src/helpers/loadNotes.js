// este seria un helper
// VAMOS A CARGAR LAS NOTAS DE LA DB FIREBASE
import { db } from "../firebase/firebase-config"

// vamos a necesitar el uid para cargar ciertas notas
// en nuestra colecion notes tiene los usuarios
// esa ruta es la referencia que necesitamos para obtener la informacion en nuestra base de datos firebase
export const loadNotes = async (uid) => {
// si esta promesa no tiene nada devolvera el arreglo vacio
 const notesSnap =  await db.collection(`${uid}/journal/notes`).get();
 const notes = [];
//  console.log(notesSnap)
// esto es para taernos el id, metemos el id y lo demas
notesSnap.forEach(snapHijo => {
    // console.log(snapHijo.data())
    notes.push({
      id: snapHijo.id,
      ...snapHijo.data()
    })
})

console.log(notes)

 return notes;
}