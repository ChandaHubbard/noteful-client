import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
// import { getNotesForFolder } from '../notes-helper'
import './NoteListMain.css'

export default function NoteListMain(props) {
    return (
      <ApiContext.Consumer>
      {
        value => (
          <section className='NoteListMain'>
        <ul>
          {value.notes.map((note) =>
            <li key={note.id}>
              <Note
                id={note.id}
                name={note.note_label}
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
