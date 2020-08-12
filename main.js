const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor (field) {
        this.field = field
        this.fieldSize = field.length
        this.userPosition = this.startPosition
    }
    print () {
        for (let row = 0; row < this.field.length; row++) {
            console.log(String(this.field[row].join('')))
        }
    }
    
    get startPosition () {
        for (let row =0; row < this.field.length; row++){
            const position = this.field[row].findIndex(position => {return position === '*'})
            if (position !== -1) {
                return [row,position]
            }
        } 
    }
    get userPosition () {
        return this._userPosition
    }
    set userPosition (position) {
        this._userPosition = position
    }

    canMoveUp() {
        return true
    }
    canMoveDown() {
        return true
    }
    canMoveLeft() {
        return true
    }
    canMoveRight() {
        return true
    }

    moveUp() {
        const newPosition = this.userPosition
        newPosition[0]--
        this.field[newPosition[0]][newPosition[1]] = '*'
        return this.userPosition = newPosition    }
    moveDown() {
        const newPosition = this.userPosition
        newPosition[0]++
        this.field[newPosition[0]][newPosition[1]] = '*'
        return this.userPosition = newPosition    }
    moveLeft() {
        const newPosition = this.userPosition
        newPosition[1]--
        this.field[newPosition[0]][newPosition[1]] = '*'
        return this.userPosition = newPosition
    }
    moveRight() {
        const newPosition = this.userPosition
        newPosition[1]++
        this.field[newPosition[0]][newPosition[1]] = '*'
        return this.userPosition = newPosition
    }



}

const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
  ]);

for (let round =1; round <4;round++){
    myField.print()

    const userInput = prompt('Which way would you like to move? ')
    const moveUser = (field, userInput) => {
        const lowerInput = userInput.toLowerCase()
        switch (lowerInput) {
            case ('u'):
                if (field.canMoveUp()) {
                    field.moveUp()
                }
                break
            case ('d'):
                if (field.canMoveDown()) {
                    field.moveDown()             
                }          
                break     
            case ('l'):
                if (field.canMoveLeft()) {
                    field.moveLeft()
                }      
                break      
            case ('r'):
                if (field.canMoveRight()) {
                    field.moveRight()
                }         
                break   
            default:
                console.log('invalid move')
        }
    }

    moveUser(myField, userInput)
}
myField.print()
//console.log(myField.userPosition)
/*
const Array = 
[
    ['*', '░', 'O'],
    ['░', 'O', '░']];

const test = [1,2]
test[1]++
console.log(test)*/