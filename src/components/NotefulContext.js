import React from 'react'

const NotefulContext = React.createContext({
    notes: [],
    folders: [],
    addNote: () => {},
    addFolder: () => {},
    deleteNote: () => {},
    deleteFolder: () => {}
})

export default NotefulContext