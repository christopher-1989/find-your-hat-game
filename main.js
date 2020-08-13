const prompt = require('prompt-sync')({sigint: true});
const shuffle = require("./shuffle.js")

const fieldCharacter = '░';

class Field {
    constructor (field) {
        this.field = field
        this.fieldSize = field.length
        this.userPosition = this.startPosition
        this._hasWon = false
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
        else if (this.field[this.userPosition[0]-1][this.userPosition[1]] === "^") {
            this._hasWon = true
            return true
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
        else if (this.field[this.userPosition[0]+1][this.userPosition[1]] === "^") {
            this._hasWon = true
            return true
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
        else if (this.field[this.userPosition[0]][this.userPosition[1]-1] === "^") {
            this._hasWon = true
            return true
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
        else if (this.field[this.userPosition[0]][this.userPosition[1]+1] === "^") {
            this._hasWon = true
            return true
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

    static generateField(size) {
        let newField = []
        const holes = Math.floor(size*size*0.25)
        const charactersForField = ["^","*"]
        for (let hole = 1; hole <= holes; hole++){
            charactersForField.push("O")
        }
        for (let charactersToGo = size*size - charactersForField.length; charactersToGo > 0; charactersToGo--) {
            charactersForField.push(fieldCharacter)
        }
        shuffle(charactersForField)
        for (let rows = 0; rows < size; rows++){
            newField.push([])
        }
        for (let rows = 0; rows < size; rows++){
            for (let cols = 0; cols < size; cols++) {
                
                newField[rows].push(charactersForField.pop())
            }
        }
        return newField
    }

}

const createdField = Field.generateField(5)
const myField = new Field(createdField)
/*const myField = new Field([
    ['░', '░', 'O'],
    ['░', 'O', '*'],
    ['░', '^', '░'],
  ]);
*/

let gameEnd = false
const loseGame = () => {
    gameEnd = true
    console.log("Game Over, you lost")
    return gameEnd
}
const  winGame = () => {
    gameEnd = true
    console.log("Congratulations you found the hat. Game Over")
}
while (gameEnd === false){
    myField.print()

    const userInput = prompt('Which way would you like to move? ')
    const moveUser = (field, userInput) => {
        const lowerInput = userInput.toLowerCase()
        switch (lowerInput) {
            case ('u'):
                if (field.canMoveUp()) {
                    if (!field._hasWon === true) {
                        field.moveUp() 
                    } else {
                        winGame()
                    }
                }  else {
                    loseGame()
                }   
                break
            case ('d'):
                if (field.canMoveDown()) {
                    if (!field._hasWon === true) {
                        field.moveDown() 
                    } else {
                        winGame()
                    }
                }  else {
                    loseGame()
                }              
                break     
            case ('l'):
                if (field.canMoveLeft()) {
                    if (!field._hasWon === true) {
                        field.moveLeft() 
                    } else {
                        winGame()
                    }
                }  else {
                    loseGame()
                }       
                break      
            case ('r'):
                if (field.canMoveRight()) {
                    if (!field._hasWon === true) {
                        field.moveRight() 
                    } else {
                        winGame()
                    }
                }  else {
                    loseGame()
                }          
                break   
            default:
                console.log('invalid move')
        }
    }

    moveUser(myField, userInput)
}
