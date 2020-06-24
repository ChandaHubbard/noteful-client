import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from '../ApiContext'
import config from '../config'
import './Note.css'

export default function Note (props) {
// fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
//       method: 'DELETE',
//       headers: {
//         'content-type': 'application/json'
//       },
//     }).then(res => {
//         if (!res.ok) {
//           return res.json().then(e => {
//             throw error
//           })
//         }
//       })
//       .then(() => {
//         this.context.deleteNote(noteId)
//         // allow parent to perform extra behaviour
//         this.props.onDeleteNote(noteId)
//       })
//       .catch(error => {
//         console.error({ error })
//       });
  
// render() {
    return (
      // <ApiContext.Consumer>
      // {context => (
        <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/notes/${props.id}`}>
            <p>{props.name}</p>
          </Link>
        </h2>
        <button
          className='Note__delete'
          type='button'>
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
          remove
        </button>
        <div className='Note__dates'>
          {/* <div className='Note__dates-modified'>
            Modified
            {' '}
            <span className='Date'>
              {format(props.modified, 'Do MMM YYYY')}
            </span>
          </div> */}
        </div>
      </div>
      )
    // }
     // </ApiContext.Consumer>
    // )
// }
}
