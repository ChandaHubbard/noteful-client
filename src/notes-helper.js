export const findFolder = (folders=[], folderId) =>
  folders.find(folder => folder.id === folderId)

export const findNote = (notes=[], noteId) => {
  console.log(notes, noteId)
  return notes.find(note => note.id === parseInt(noteId))
}

export const getNotesForFolder = (notes=[], folderId) => {
  return (!folderId)
    ? notes
    : notes.filter(note => note.folder_id === folderId)
}

export const countNotesForFolder = ((notes=[], folderId) => {
  return notes.filter(note => {
    return note.folder_id === folderId
  }).length
})