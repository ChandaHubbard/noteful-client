import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
// import { getNotesForFolder } from '../notes-helper'
import './NoteListMain.css'

export default function NoteListMain(props) {
  // static defaultProps = {
  //   match: {
  //     params: {}
  //   }
  // }
  // static contextType = ApiContext

  // render() {
  //   const { folderId } = this.props.match.params
  //   const { notes=[] } = this.context
  //   const notesForFolder = getNotesForFolder(notes, folderId)
    return (
      <ApiContext.Consumer>
      {
        props => (
          <section className='NoteListMain'>
        
        <ul>
          {props.notes.map(note =>
            <li key={note.id}>
              <Note
                id={note.id}
                noteLabel={note.note_label}
                // modified={note.modified}
              />
            </li>
          )}
        </ul>
        <div className='NoteListMain__button-container'>
          <CircleButton
            tag={Link}
            to='/add-note'
            type='button'
            className='NoteListMain__add-note-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Note
          </CircleButton>
        </div>
      </section>
        )
      }
      </ApiContext.Consumer>
    )
  }
// }

NoteListMain.defaultProps = {
  notes: [],
}