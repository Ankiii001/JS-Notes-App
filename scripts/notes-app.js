let notes = getSavedNotes()

const filters = {
    searchText: '',
    sortBy: ''
}

renderNotes(notes, filters)

document.querySelector('#create-note').addEventListener('click', function (e) {
    const timestamp = moment().valueOf()
    const note = {
        id: uuidv4(),
        title: '',
        body: '',
        createdAt: timestamp,
        updatedAt: timestamp
    }
    notes.push(note)
    saveNotes(notes)
    location.assign(`/edit.html#${note.id}`)
})

document.querySelector('#search-text').addEventListener('input', function (e) {
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})

document.querySelector('#filter-by').addEventListener('change', function (e) {
    filters.sortBy = e.target.value
    renderNotes(notes, filters)
})

window.addEventListener('storage', (e)=>{
    if(e.key === 'notes'){
        notes = JSON.parse(e.newValue)
        renderNotes(notes, filters)
    }
})