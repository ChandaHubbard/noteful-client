import React, { Component } from 'react'
// import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
// import ValidationError from '../ValidationError'
import config from '../config'
import './AddNote.css'

export default class AddNote extends Component {
  // static defaultProps = {
  //   history: {
  //     push: () => { }
  //   },
  // }
  static contextType = ApiContext;

  constructor(props) {
    super(props);
    this.state = {
      note_label: {
        value: "",
        touched: false
      },
      content: {
        value: "",
        touched: false
      },
      folderId: {
        value: 1,
        touched: false
      }
      // modified: {
      //   value: "",
      //   touched: false
      // } 
    }
  }

updateLabel(note_label) {
  console.log({note_label});
  this.setState({
    note_label: {
      value: note_label,
      touched: true
    }
  });
}

updateContent(content) {
  console.log({content});
  this.setState({
    content: {
      value: content,
      touched: true
    }
  });
}

updateFolder = (folderId) => {
  console.log(folderId);
  this.setState({
    folderId: {
      value: folderId,
      touched: true
    }
  });
}
  handleSubmit = e => {
    console.log("handlesubmit")
    e.preventDefault()
    const newNote = {
      note_label: this.state.note_label.value,
      content: this.state.content.value,
      folderId: this.state.folderId.value,
      // modified: new Date(),
    };

    console.log(newNote);
    const baseUrl = `${config.API_ENDPOINT}/notes`
    fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newNote),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then((data) => {
        this.context.addNote(data)
        //?
        this.props.history.push(`/folders/${data.folderId}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  //validateNoteLabel() {}

  //validateContent() {}

  render() {
    // const nameError = this.validateName();
    // const contentError = this.validateCOntent();
    const options = this.context.folders.map((folder) => {
      return (
        <option key={folder.id} value={folder.id}>
          {folder.folder_name}
        </option>
      )
    })
    return (
      <form className="AddNoteForm"
      onSubmit= { e => this.handleSubmit(e)}
      >
        <div className="notelabelinput">
          <label>Name</label>
          <input
          required
          type="text"
          id="name"
          placeholder="name"
          onChange={e => this.updateLabel(e.target.value)}
          />
          {this.state.note_label.touched 
          // && <ValidationError message={nameError} />
          }
        </div>
<div className="contentInput">
  <label>Content</label>
  <input
          required
          type="text"
          id="content"
          placeholder="content"
          onChange={e => this.updateContent(e.target.value)}
          />
          {this.state.content.touched 
          // && <ValidationError message={contentError} />
          }    
</div>
<div className="folderInput">
  <label>Folder:</label>
  <select className="folderId"
  onChange={e => this.updateFolder(e.target.value)}>
    {options}
  </select>
</div>
<input type="submit"
className="submit">

</input>
      </form>
          );
        }
      }
      // <section className='AddNote'>
      //   <h2>Create a note</h2>
      //   <NotefulForm onSubmit={this.handleSubmit}>
      //     <div className='field'>
      //       <label htmlFor='note-name-input'>
      //         Name
      //       </label>
      //       <input type='text' id='note-name-input' name='note-name' />
      //     </div>
      //     <div className='field'>
      //       <label htmlFor='note-content-input'>
      //         Content
      //       </label>
      //       <textarea id='note-content-input' name='note-content' />
      //     </div>
      //     <div className='field'>
      //       <label htmlFor='note-folder-select'>
      //         Folder
      //       </label>
      //       <select id='note-folder-select' name='note-folder-id'>
      //         <option value={null}>...</option>
      //         {folders.map(folder =>
      //           <option key={folder.id} value={folder.id}>
      //             {folder.name}
      //           </option>
      //         )}
      //       </select>
      //     </div>
      //     <div className='buttons'>
      //       <button type='submit'>
      //         Add note
      //       </button>
      //     </div>
      //   </NotefulForm>
      // </section>
