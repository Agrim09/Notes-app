const fs = require('fs')
const chalk = require('chalk')
const { title } = require('process')
const getNotes = () => 'Your notes ...'

const addNote = (title,body) => {
    const notes = loadNotes()
    const DuplicateNotes = notes.filter((note) => note.title === title)
    if(DuplicateNotes.length === 0){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    }else{
        console.log(chalk.red.inverse('Note title taken!'))
    }
}
const removeNotes = (title) => {
    const note = loadNotes()
    // console.log(note)
    const keepNote = note.filter((note) => note.title !== title)
    // console.log(keepNote)
    if(keepNote.length < note.length){
        console.log(chalk.bgGreen(`Title: ${title} has been removed`))
    saveNotes(keepNote)
    }else{
        console.log(chalk.bgRed('No such note with this title exist'))
    }
}
const list = () => {
    const note = loadNotes()
    note.forEach((note) => console.log(note.title))
}
const read = (title) =>{
    const note = loadNotes()
    const fin = note.find((n) => n.title === title)
    if(fin){
        console.log(chalk.bold.white('Note title: ' + fin.title))
        console.log(chalk.italic.cyan('Body: '+ fin.body))
    }else{
        console.log(chalk.red('No Note found?'))
    }
}
const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch(e){
        return []
    }  
}
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}
module.exports = {getNotes: getNotes,
    addNote: addNote,
    removeNotes: removeNotes,
    list: list,
    read: read
}