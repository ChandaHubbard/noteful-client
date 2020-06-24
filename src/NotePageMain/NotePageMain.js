import React from "react";
import Note from "../Note/Note";
import CircleButton from '../CircleButton/CircleButton'
// import ApiContext from "../ApiContext";
// import { findNote } from "../notes-helper";
import "./NotePageMain.css";


export default function NotePageMain(props) {


  // static contextType = ApiContext;

  // handleDeleteNote = noteId => {
  //   this.props.history.push(`/`);
  // };
  // render() {
  //   const { notes = [] } = this.context;
  //   const { noteId } = this.props.match.params;
  //   const note = findNote(notes, noteId) || { content: "" };
  //   
  return (
    <div className="note-page-main">
      <section className="NotePageMain">
        <h5>{props.note.note_label}</h5>
        <div className="NotePageMain__content">
          
          <p>{props.note.content}</p>
          
        {/* <Note
          id={props.note.id}
          name={props.note.name}
          
          // onDeleteNote={this.handleDeleteNote}
        /> */}
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


NotePageMain.defaultProps = {
  note: {
    content: '',
  }
}