import React from "react";
import CircleButton from '../CircleButton/CircleButton'
import "./NotePageMain.css";


export default function NotePageMain(props) {   
  return (
    <div className="note-page-main">
      <section className="NotePageMain">
        <h5>{props.note.note_label}</h5>
        <div className="NotePageMain__content">
          <p>{props.note.content}</p>
        </div>
        
      </section>
      <CircleButton
      tag='button'
      role='link'
      onClick={() => props.history.goBack()}
      >
      Go Back
      </CircleButton>
      </div>
    )
  }


// NotePageMain.defaultProps = {
//   note: {
//     content: '',
//   }
// }