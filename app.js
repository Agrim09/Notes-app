const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes')
//customize yargs version
yargs.version('1.1.0')
//Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder:{
        title: {
            describe: 'Note title',
            demandOption: true,
            type:'string'
        },
        body: {
            describe: 'Body of Note',
            demandOption: true,
            type: 'string' 
        }
    },
    handler(argv){
        notes.addNote(argv.title,argv.body)
    }
})
//Create Remove Command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder:{
        title: {
            describe: 'Note title',
            demandOption: true,
            type:'string'
        }
    }, 
    handler(argv) {
        notes.removeNotes(argv.title)
    }
})
//List Command
yargs.command({
    command: 'list',
    describe: 'List the note',
    handler(argv){
        console.log(chalk.red.inverse('Your Notes'))
        notes.list(argv)
    }
})
//Read Command
yargs.command({
    command: 'read',
    describe: 'Read the note',
    builder:{
        title:{
            describe: 'Read the title and the body',
            demandOption: true,
            type:'string'
        }
    },
    handler(argv){
        console.log('Reading The notes')
        notes.read(argv.title)
    }
})
yargs.parse()
//console.log(yargs.argv)