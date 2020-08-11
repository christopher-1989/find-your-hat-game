const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor (field) {
        this.field = field
        this.startPosition = []
    }
    print () {
        for (let row = 0; row < this.field.length; row++) {
            console.log(String(this.field[row].join('')))
        }
    }
    get findStart () {
        for (let row =0; row < this.field.length; row++){
            const startPosition = this.field[row].findIndex(position => {return position === '*'})
            if (startPosition !== -1) {
                return [row,startPosition]
            }
        }
    }
}

const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
  ]);

myField.print()

//const userInput = prompt('Which way would you like to move? ')
const moveUser = (userInput) => {
    const lowerInput = userInput.toLowerCase()
    switch (lowerInput) {
        case ('u'):
            console.log('moveup')
            break
        case ('d'):
            console.log('movedown')
            break   
        case ('l'):
            console.log('moveleft')
            break
        case ('r'):
            console.log('moveright')
            break
        default:
            console.log('invalid move')
    }
}

//moveUser(userInput)
console.log(myField.findStart)

const Array = 
[
    ['*', '░', 'O'],
    ['░', 'O', '░']];

