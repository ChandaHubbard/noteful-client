import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NoteListNav from '../NoteListNav/NoteListNav'
import NotePageNav from '../NotePageNav/NotePageNav'
import NoteListMain from '../NoteListMain/NoteListMain'
import NotePageMain from '../NotePageMain/NotePageMain'
import AddFolder from '../AddFolder/AddFolder'
import AddNote from '../AddNote/AddNote'
import dummyStore from '../dummy-store'
// import NotefulContext from '../components/NotefulContext'
// import ApiContext from '../ApiContext'
// import config from '../config'
import { getNotesForFolder, findNote, findFolder } from '../notes-helper'
import './App.css'

class App extends Component {
  state = {
    notes: [],
    folders: [],
    addNote: this.addNote,
    addFolder: this.addFolder,
    // deleteNote: this.deleteNote,
    // deleteFolder: this.deleteFolder,
  };

  componentDidMount() {
    // setTimeout(() => this.setState(dummyStore), 600)
    const baseUrl = 'http://localhost:8000';
    const notesEndPoint = '/notes';
    const foldersEndPoint = '/folders';
    
    Promise.all([
      fetch(baseUrl + notesEndPoint),
      fetch(baseUrl + foldersEndPoint)
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e))
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e))

        return Promise.all([
          notesRes.json(),
          foldersRes.json(),
        ])
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders })
      })
      .catch(error => {
        console.error({ error })
      })
  }

  addNote = note => {
    this.setState({
      notes: [...this.state.notes, note]
      // addNote = (note_label, content, folder_id) => {
  //   console.log(note_label, content);
  //   const newNote = {
  //     name: note_label,
  //     content: content,
  //     folder_id,
  //   };
  //   console.log(newNote);
  //   fetch(`${config.API_ENDPOINT}api/notes`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newNote),
  //   }).then((res) => {
  //     return res.json();
  //   }).then((data) => {
  //     console.log("Request success: ", data);

  //     this.setState({
  //       notes: [...this.state.notes, data],
  //       note_id: Response.note_id,
  //       folder_id: Response.folder_id,
  //     });
  //   }).catch((error) => {
  //     console.log("Request failure: ", error);
  //   });

  //   console.log(newNote)
  //   console.log(this.state.notes)
  // };
    });
  }

  addFolder = folder => {
    this.setState({
      folders: [...this.state.folders, folder]
    })
  }

  // deleteNote = noteId => {
  //   this.setState({
  //     notes: this.state.notes.filter(note => note.id !== noteId)
  //   });
  // }

  // deleteFolder = folderId => {
  //   this.setState({
  //     folders: this.state.folders.filter(folder => folder.id !== folderId)
  //   })
  // }


renderNavRoutes() {
  const { notes, folders } = this.state;
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => (
              <NoteListNav
              folders = {folders}
              notes={notes}
              {...routeProps}
              />
              )}
          />
        ))}
        <Route 
        path='/note/:noteId' 
        render={routeProps => {
          const {noteId} = routeProps.match.params;
          const note = findNote(notes, noteId) || {};
          const folder = findFolder(folders, note.folderId);
          return <NotePageNav {...routeProps} folder={folder} />;
        }}
        />
        <Route
          path='/add-folder'
          component={NotePageNav}
        />
        <Route
          path='/add-note'
          component={NotePageNav}
        />
      </>
    );
  }

  renderMainRoutes() {
    const {notes, folders} = this.state;
    return (
        <>
            {['/', '/folder/:folderId'].map(path => (
                <Route
                    exact
                    key={path}
                    path={path}
                    render={routeProps => {
                        const {folderId} = routeProps.match.params;
                        const notesForFolder = getNotesForFolder(
                            notes,
                            folderId
                        );
                        return (
                            <NoteListMain
                                {...routeProps}
                                notes={notesForFolder}
                            />
                        );
                    }}
                />
            ))}
            <Route
            path="/notes/:noteId"
            render={
              routeProps => {
                const {noteId} = routeProps.match.params;
                const note = findNote(notes, noteId);
                return <NotePageMain {...routeProps} note={note} />;
              }}
            />
</>

);
}
render() {
  return (
    <div className="App">
      <nav className="App__nav">{this.renderNavRoutes()}</nav>
      <header className="App__header">
        <h1>
          <Link to="/">Noteful</Link>{' '}
          <FontAwesomeIcon icon="check-double" />
        </h1>
      </header>
      <main className="App__main">{this.renderMainRoutes()}</main>
    </div>
  );
}
}
// render() {
//   const contextValue = {
//     notes: this.state.notes,
//     folders: this.state.folders,
//     addNote: this.addNote,
//     addFolder: this.addFolder,
//     deleteNote: this.deleteNote,
//     deleteFolder: this.deleteFolder
//   };
//   return (
//     <Router>
//     <div className="App">
//     <NotefulContext.Provider value={contextValue}>
//     <NoteListMain/>
//     <NotePageMain/>
//     <Switch>
//     <Route path='/note/:noteId' component={NotePageMain}/>
//  <Route path='/add-folder' component={AddFolder}/>
//   <Route path='/add-note'component={AddNote}/>
//     </Switch>
//     </NotefulContext.Provider>
//     </div>
//     </Router>
//   );
// }
  

  // handleAddFolder = folder => {
  //   this.setState({
  //     folders: [
  //       ...this.state.folders,
  //       folder
  //     ]
  //   })
  // }

  // handleAddNote = note => {
  //   this.setState({
  //     notes: [
  //       ...this.state.notes,
  //       note
  //     ]
  //   })
  // }

  // handleDeleteNote = noteId => {
  //   this.setState({
  //     notes: this.state.notes.filter(note => note.id !== noteId)
  //   })
  // }

  


//   render() {
//     const value = {
//       notes: this.state.notes,
//       folders: this.state.folders,
//       addFolder: this.handleAddFolder,
//       addNote: this.handleAddNote,
//       deleteNote: this.handleDeleteNote,
//     }
//     return (
//       <ApiContext.Provider value={value}>
//         <div className='App'>
//           <nav className='App__nav'>
//             {this.renderNavRoutes()}
//           </nav>
//           <header className='App__header'>
//             <h1>
//               <Link to='/'>Noteful</Link>
//               {' '}
//               <FontAwesomeIcon icon='check-double' />
//             </h1>
//           </header>
//           <main className='App__main'>
//             {this.renderMainRoutes()}
//           </main>
//         </div>
//       </ApiContext.Provider>
//     )
//   }


export default App;