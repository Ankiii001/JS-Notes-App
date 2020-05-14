// Read existing notes from localStorage
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes')

    if (notesJSON) {
        return JSON.parse(notesJSON)
    } else {
        return []
    }
}

// Save notes to localStorage
const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

// Remove a nite from the list
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note)=>{
        return note.id === id
    })

    if(noteIndex > -1){
        notes.splice(noteIndex, 1)
    }
}

// Generate the DOM structure for a note
const generateNoteDOM = (note) => {
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')
    // const button = document.createElement('button')
    
    // Setup the remove note button
    // button.textContent = 'X'
    // noteEl.appendChild(button)
    // button.addEventListener('click', ()=>{
    //     removeNote(note.id)
    //     saveNotes(notes)
    //     renderNotes(notes, filters)
    // })


    // Setup the note title text
    if (note.title) {
        textEl.textContent = note.title
    } else {
        textEl.textContent = 'Unnamed note'
    }
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl)

    // Setup the link
    noteEl.setAttribute('href', `/edit.html#${note.id}`)
    noteEl.classList.add('list-item')

    // Setup the status message
    statusEl.textContent = generateLastEdited(note.updatedAt)
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl)
    
    return noteEl
}

// Sort your notes by one of the three ways
const sortNotes = (notes, sortBy)=>{
    switch(sortBy){
        case 'byEdited':
            return notes.sort((note1, note2)=>{
                if(note1.updatedAt > note2.updatedAt){
                    return -1
                }else if(note1.updatedAt < note2.updatedAt){
                    return +1
                }else{
                    return 0
                }
            })
        case 'byCreated':
            return notes.sort((note1, note2)=>{
                if(note1.createdAt > note2.createdAt){
                    return -1
                }else if(note1.createdAt < note2.createdAt){
                    return +1
                }else{
                    return 0
                }
            })
        case 'alphabetical':
            return notes.sort((note1, note2)=>{
                if(note1.title.toLowerCase() > note2.title.toLowerCase()){
                    return +1
                }else if(note1.title.toLowerCase() < note2.title.toLowerCase()){
                    return -1
                }else{
                    return 0
                }
            })
        default:
            return notes
    }
}

// Render applications notes
const renderNotes = function (notes, filters) {
    const notesEl = document.querySelector('#notes')
    notes = sortNotes(notes, filters.sortBy)
    const filteredNotes = notes.filter(function (note) {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    notesEl.innerHTML = ''

    if(filteredNotes.length > 0){
        filteredNotes.forEach(function (note) {
            const noteEl = generateNoteDOM(note)
            notesEl.appendChild(noteEl)
        })
    }else{
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No notes to show'
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)
    }
    
}

// Generate the last edited message
const generateLastEdited = (timestamp)=>{
    return `Last edited ${moment(timestamp).fromNow()}`
}