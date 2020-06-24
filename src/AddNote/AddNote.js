import React, { Component } from "react";
// import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from "../ApiContext";
import config from "../config";
import "./AddNote.css";

export default class AddNote extends Component {
  static contextType = ApiContext;

  constructor(props) {
    super(props);
    this.state = {
      note_label: "",
      content: "",
      folder_id: "",
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  setFolderId = (folder_id) => {
    this.setState({
      folder_id
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const baseUrl = `${config.API_ENDPOINT}/notes`;
    fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then((data) => {
        // this.context.addNote(data)
        console.log(data)
        this.props.history.push(`/folders/${data.id}`)
      })
      .catch(error => {
        console.error({ error })
      })
  };

  render() {
    const options = (folders) => {
      return folders.map((folder) => {
        return (
          <option 
          key={folder.id} 
          value={folder.id} 
          onClick={() => {this.setFolderId(folder.id)}}>
            {folder.folder}
          </option>
        );
      });
    }

    return (
      <ApiContext.Consumer>
        {
          value => (
            <form className="AddNoteForm" onSubmit={(e) => this.handleSubmit(e)}>
        <div className="notelabelinput">
          <label>Name</label>
          <input
            required
            type="text"
            name="note_label"
            id="name"
            placeholder="name"
            onChange={(e) => this.onChange(e)}
          />
        </div>
        <div className="contentInput">
          <label>Content</label>
          <input
            required
            type="text"
            name="content"
            id="content"
            placeholder="content"
            onChange={(e) => this.onChange(e)}
          />
        </div>
        <div className="folderInput">
          <label>Folder:</label>
          <select
            className="folderId"
            name="folder_id"
            onChange={(e) => this.onChange(e)}
          >
            {options(value.folders)}
          </select>
        </div>
        <input type="submit" className="submit"></input>
      </form>
          )
        }
      </ApiContext.Consumer>
    );
  }
}

