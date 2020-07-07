import React  from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'

export default function Note (props) {
const deleteNote = (id) => {
  fetch(`https://immense-anchorage-15806.herokuapp.com/notes/${id}`, {
    method: "DELETE",
    headers: { 'content-type': 'application/json' }
  })
  .then(res => res.json()).then(data => {
    return data
  }).catch(error => {
    console.log(error, "error")
  })
} 
    return (

        <div className='Note'>
        <h5 className='Note__title'>
          <Link to={`/notes/${props.id}`}>
            <h5>{props.name}</h5>
          </Link>
          </h5>
        <button
          className='Note__delete'
          type='button'>
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
          remove
        </button>
      </div>
      )

}
