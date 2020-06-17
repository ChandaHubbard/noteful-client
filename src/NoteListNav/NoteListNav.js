import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import { countNotesForFolder } from '../notes-helper'
import './NoteListNav.css'

export default function NoteListNav() {
  // static contextType = ApiContext;

  // render() {
  //   const { folders=[], notes=[] } = this.context
    return (
      <ApiContext.Consumer>
      {  props => (
        <div className='NoteListNav'>
        <ul className='NoteListNav__list'>
          {props.folders.slice(0, 5).map(folder =>
            <li key={folder.id}>
              <NavLink
                className='NoteListNav__folder-link'
                to={`/folder/${folder.id}`}
              >
                <span className='NoteListNav__num-notes'>
                  {countNotesForFolder(props.notes, folder.id)}
                </span>
                {folder.folder}
              </NavLink>
            </li>
          )}
        </ul>
        <div className='NoteListNav__button-wrapper'>
          <CircleButton
            tag={Link}
            to='/add-folder'
            type='button'
            className='NoteListNav__add-folder-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Folder
          </CircleButton>
        </div>
      </div>
      )
          }
      </ApiContext.Consumer>
    )
  }
// }

NoteListNav.defaultProps = {
  folders: []
}