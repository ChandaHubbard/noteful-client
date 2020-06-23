import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
// import ErrorBoundary from '../ErrorBoundary'
// import ValidationError from "../ValidationError"
import config from '../config'
import './AddFolder.css'

export default class AddFolder extends Component {
    static contextType = ApiContext;

    constructor(props) {
      super(props) 
        this.state = {
          folder: {
            value: '',
            touched: false
          },
          error: null,
          formValid: false,
          errors: {
            folder: 'You must enter a folder title'
          }
        }
    }

    updateFolderName(folder) {
      this.setState({ folder: { value: folder, touched: true} })
    }

    // validateFolderName() {
    //   const folderName = this.state.folder.value.trim()
    //   if (folderName.length < 3) {
    //     return 'Folder folder must be at least 3 characters long'
    //   } else if (folderName.length === 0) {
    //     return 'Folder folder is required'
    //   } else if (folderName === 'folder') {
    //     return folderName
    //   }
    // }

    // handleChange = event => {
    //   const { folder, value } = event.target
    //   this.setState({ [folder] : value })
    //   this.validateFolderName(folder, value)
    // }


  handleSubmit = (event) => {
    event.preventDefault()
    const { folder } = {
       folder: event.target['folder-name'].value
    }

    this.setState({ error: null })
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(folder),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(folder => {
        this.context.addFolder(folder, "folder")
        console.log(folder)
        this.props.history.push(`/folder/${folder.id}`)
      })
      .catch(error => {
        console.error({ error })
        this.setState({ error })
      })
  }

  handleClickCancel = () => {
    this.props.history.push('/')
  }

  render() {
    const error = this.state
    return (
      // <ErrorBoundary>
        <div className='add-folder'>
          <h2>Create a folder</h2>
          <NotefulForm onSubmit={event => this.handleSubmit(event)}>
            <div className="AddFolder__error">
              {error && <p>{error.message}</p>}
            </div>
        <div className='field'>
          <label htmlFor='folder-name-input'>
              Folder Name
          </label>
          <input 
          type='text' 
          id='folder-name-input' 
          name='folder-name' 
          placeholder="super unique folder name"
          onChange={event => this.updateFolderName(event.target.value)}
          />
        </div>
        {/* {this.state.title.touched && <ValidationError message={folderError} />} */}
        <div className='buttons'>
          <button 
          type="button" 
          onClick={this.handleClickCancel}>
            Cancel</button>{' '}
            <button 
          type='submit'
          id="submit-button"
          // disabled={this.validateFolderName}
          >
            + Add folder
          </button>
        </div>
          </NotefulForm>
      <br />
      <br />
      <CircleButton
      tag='button'
      role='link'
      onClick={() => this.props.history.goBack()}
      >
      Go Back
      </CircleButton>
      </div>
      // </ErrorBoundary>       
    )
  }
}

AddFolder.defaultProps = {
  folder: '',
  history: {
    goBack: () => {}
  }
}

// AddFolder.propTypes = {
//   folders: PropTypes.array,
//   folder: PropTypes.string.isRequired,
//   id: PropTypes.string,
//   content: PropTypes.string,
//   // modified: PropTypes.string,
// }