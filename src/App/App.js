import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoteListNav from "../NoteListNav/NoteListNav";
import NotePageNav from "../NotePageNav/NotePageNav";
import NoteListMain from "../NoteListMain/NoteListMain";
import NotePageMain from "../NotePageMain/NotePageMain";
import AddFolder from "../AddFolder/AddFolder";
import AddNote from "../AddNote/AddNote";

import ApiContext from "../ApiContext";
import { getNotesForFolder, findNote, findFolder } from "../notes-helper";
import "./App.css";

class App extends Component {
  state = {
    notes: [],
    folders: [],
    addNote: this.addNote,
    addFolder: this.addFolder,
    updateNote: this.updateNote,
    updateFolder: this.updateFolder,
    deleteNote: this.deleteNote,
    deleteFolder: this.deleteFolder,
  };

  setNotes(notes) {
    //working
    this.setState((previousState) => ({ notes }));
  }

  setFolders(folders) {
    //working
    this.setState((previousState) => ({ folders }));
  }

  addNote = (note) => {
    //in progress
    this.setState({
      notes: [...this.state.notes, note],
    });
  };

  addFolder = folder => {
    //in progress
    this.setState({
      folders: [...this.state.folder, folder],
    });
  };

  updateNote = updateNote => {
    //in progress
    this.setState({
      notes: this.state.notes.map(note => (note.id !== updateNote.id) 
      ? note 
      : updateNote
      ),
    });
  };

  updateFolder = updateFolder => {
  
  };

  deleteNote = noteId => {
    //in progress
    const createNotes = this.state.notes.filter(note => note.id !== noteId)
    this.setState({ notes: createNotes })
  };

  deleteFolder = folderId => {
    //in progress, might delete
    const createFolders = this.state.folders.filter(folder => folder.id !== folderId)
    this.setState({ folders: createFolders})
    this.setState({
      folders: this.state.folders.filter((folder) => folder.id !== folderId),
    });
  };

  getNoteById = () => {
    fetch(`https://immense-anchorage-15806.herokuapp.com/notes/1`)
    .then(res => res.json()).then(data => {
      return data
    }).catch(error => {
      console.log(error, "error")
    })

  }

  componentDidMount() {
    this.getNoteById()
    const baseUrl = "https://immense-anchorage-15806.herokuapp.com";
    const notesEndPoint = "/notes";
    const foldersEndPoint = "/folders";

    Promise.all([
      fetch(baseUrl + notesEndPoint),
      fetch(baseUrl + foldersEndPoint),
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok) return notesRes.json().then((e) => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then((e) => Promise.reject(e));

        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        console.log(notes, "app.js notes")
        console.log(folders, "app.js folders")
        this.setState({ notes, folders });
      })
      .catch((error) => {
        //promise does not tell you where the exact error is coming from
        console.error({ error });
      });
  }

  renderNavRoutes() {
    const { notes, folders } = this.state;
    return (
      <>
        {["/", "/folder/:folderId"].map((path) => (
          <Route
            exact
            key={path}
            path={path}
            render={(routeProps) => <NoteListNav {...routeProps} />}
          />
        ))}
        <Route
          path="/note/:noteId"
          render={(routeProps) => {
            const { noteId } = routeProps.match.params;
            const note = findNote(notes, noteId) || {};
            const folder = findFolder(folders, note.folderId);
            return <NotePageNav 
            // {...routeProps} 
            folder={folder} />;
          }}
        />
        <Route path="/add-folder" component={AddFolder} />
        
      </>
    );
  }

  renderMainRoutes() {
    const notes = this.state;
    return (
      <>
        {["/", "/folder/:folderId"].map((path) => (
          <Route
            exact
            key={path}
            path={path}
            render={(routeProps) => {
              const { folderId } = routeProps.match.params;
              const notesForFolder = getNotesForFolder(notes, folderId);
              return <NoteListMain {...routeProps} notes={notesForFolder} />;
            }}
          />
        ))}
        <Route path="/add-note" component={AddNote} />
        
        <Route
          path="/notes/:noteId"
          render={(routeProps) => {
            const { noteId } = routeProps.match.params;
            const note = findNote(notes, noteId);
            console.log(this.state.notes, "routeprops")
            return <NotePageMain {...routeProps} note={note} />;
          }}
        />
       
        
      </>
    );
  }

  render() {
    const { notes, folders } = this.state;
    const { setNotes, setFolders } = this;
    return (
      <ApiContext.Provider value={{ notes, folders, setNotes, setFolders }}>
        <div className="App">
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
          <header className="App__header">
            <h1>
              <Link to="/">Noteful</Link>{" "}
              <FontAwesomeIcon icon="check-double" />
            </h1>
          </header>
          <main className="App__main">{this.renderMainRoutes()}</main>
        </div>
      </ApiContext.Provider>
    );
  }
}

export default App;
