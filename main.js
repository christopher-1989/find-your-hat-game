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
        if (this.userPosition[0] - 1 <  0) {
            return false
        }
        else if (this.field[this.userPosition[0] -1][this.userPosition[1]] === "O") {
            return false 
        }
        else {
            return true
        }
    }
    canMoveDown() {
        if (this.userPosition[0] + 1 > this.fieldSize -1) {
            return false
        }
        else if (this.field[this.userPosition[0] + 1][this.userPosition[1]] === "O") {
            return false 
        }
        else {
            return true
        }
    }
    canMoveLeft() {
        if (this.userPosition[1] -1 <  0) {
            return false
        }
        else if (this.field[this.userPosition[0]][this.userPosition[1]-1] === "O") {
            return false 
        }
        else {
            return true
        }
    }
    canMoveRight() {
        if (this.userPosition[1] +1> this.fieldSize -1) {
            return false
        }
        else if (this.field[this.userPosition[0]][this.userPosition[1]+1] === "O") {
            return false 
        }
        else {
            return true
        }
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
                } else {
                    return (console.log("Game over"))
                }   
                break
            case ('d'):
                if (field.canMoveDown()) {
                    field.moveDown()             
                } else {
                    return (console.log("Game over"))
                }          
                break     
            case ('l'):
                if (field.canMoveLeft()) {
                    field.moveLeft()
                }  else {
                    return (console.log("Game over"))
                }       
                break      
            case ('r'):
                if (field.canMoveRight()) {
                    field.moveRight()
                }  else {
                    return (console.log("Game over"))
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