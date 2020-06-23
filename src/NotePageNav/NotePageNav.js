import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from "../ApiContext"
import CircleButton from '../CircleButton/CircleButton'
import './NotePageNav.css'

export default class NotePageNav extends Component {
  static contextType= ApiContext

  render() {
    const { notes } = this.context

    const note = notes.find(note => note.id === this.props.match.params.noteId)

    if(!note) {
      return null
    }

    const selectedFolder = this.context.folders.find(folder => folder.id === note.folderId)

    if(!selectedFolder) {
      return null
    }

    return (
      <div className='note-page-nav'>
        <CircleButton
          tag='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='NotePageNav__back-button'
        >
          <FontAwesomeIcon icon='chevron-left' />
          <br />
          Back
        </CircleButton>
        {this.props.folder && (
          <h3 className='NotePageNav__folder-name'>
            {this.props.folder.name}
          </h3>
        )}
        <p>{selectedFolder.folder_name}</p>
      </div>
    )
  }
  }
