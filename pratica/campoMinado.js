const prompt = require('prompt-sync')()

//preparando campo minado com o tamanho desejado e com espacos vazios
function fieldGen(size){
    const field = []

    for(x = 0; x < size; x++){
        field[x] = []
        for(y = 0; y < size; y++){
            field[x][y] = {hit: false, bomb: false}
        }
    }
    return field
}

//gerando bombas aleatoriamente no CM
function bombGen(size, field){
    let bombQuant = Math.floor((size * size) / 3)
    
    while(bombQuant > 0){
        let x = Number(Math.floor(Math.random() * size))
        let y = Number(Math.floor(Math.random() * size))

        if(field[x][y].bomb == false){
            field[x][y].bomb = true
            bombQuant--
        }
    }
    return field
}

//criando campo visual
function visualFieldGen(size){
    const field = []

    for(x = 0; x < size; x++){
        field[x] = []
        for(y = 0; y < size; y++){
            field[x][y] = 'O'
        }
    }
    return field
}

//procurando bombas
function bombSearch (x, y, field, size){
let bombCount = 0

    if(x-1 >= 0 && y-1 >= 0){
        if(field[x-1][y-1].bomb == true){
            bombCount += 1
        }
    }

    if(y-1 >= 0){
        if(field[x][y-1].bomb == true){
            bombCount +=1
        }
    }

    if(x+1 <= size-1 && y-1 >= 0){
        if(field[x+1][y-1].bomb == true){
            bombCount +=1
        }
    }

    if(x-1 >= 0){
        if(field[x-1][y].bomb == true){
            bombCount +=1
        }
    }

    if(x+1 <= size-1){
        if(field[x+1][y].bomb == true){
            bombCount +=1
        }
    }

    if(x-1 >= 0 && y+1 <= size-1){
        if(field[x-1][y+1].bomb == true){
            bombCount +=1
        }
    }

    if(y+1 <= size-1){
        if(field[x][y+1].bomb == true){
            bombCount +=1
        }
    }

    if(x+1 <= size-1 && y+1 <= size-1){
        if(field[x+1][y+1].bomb == true){
            bombCount +=1
        }
    }

return bombCount
}

//pedindo o tamanho do CM para o usuario
let mineFieldSize = Number(prompt('entre com o tamanho para seu campo minado: '))

//alocando o CM gerado a uma variavel
const emptyField = fieldGen(mineFieldSize)

//alocando o CM com minas a uma variavel
const minedField = bombGen(mineFieldSize, emptyField)

//criando uma tabela visual para que o jogador
const visualField = visualFieldGen(mineFieldSize)

let gameInProg = true

while(gameInProg == true){

    console.clear()

    //impressão teste do campo (para testes de program)
    //console.table(minedField)

    //impressão visual do campo
    console.table(visualField)

    let currentPlayX = Number(prompt('Entre com a coordenadas do local que deseja descobrir: entre com a coordenada x: '))
    let currentPlayY = Number(prompt('Agora entre com a coordenada y: '))


    //checando se o local ja foi descoberto
    if(minedField[currentPlayX][currentPlayY].hit == false){
        minedField[currentPlayX][currentPlayY].hit = true

        let bombQuant = bombSearch(currentPlayX, currentPlayY, minedField, mineFieldSize)

        visualField[currentPlayX][currentPlayY] = bombQuant

        if(currentPlayX-1 >= 0 && currentPlayY-1 >= 0){
            if(minedField[currentPlayX-1][currentPlayY-1].bomb == false){
                let bombQuant1 = bombSearch((currentPlayX-1), (currentPlayY-1), minedField, mineFieldSize)
                visualField[currentPlayX-1][currentPlayY-1] = bombQuant1
                minedField[currentPlayX-1][currentPlayY-1].hit = true
            }
        }
    
        if(currentPlayY-1 >= 0){
            if(minedField[currentPlayX][y-1].bomb == false){
                let bombQuant2 = bombSearch(currentPlayX, (currentPlayY-1), minedField, mineFieldSize)
                visualField[currentPlayX][y-1] = bombQuant2
                minedField[currentPlayX][y-1].hit = true
            }
        }
    
        if(currentPlayX+1 <= mineFieldSize-1 && currentPlayY-1 >= 0){
            if(minedField[currentPlayX+1][currentPlayY-1].bomb == false){
                let bombQuant3 = bombSearch((currentPlayX+1), (currentPlayY-1), minedField, mineFieldSize)
                visualField[currentPlayX+1][currentPlayY-1] = bombQuant3
                minedField[currentPlayX+1][currentPlayY-1].hit = true
            }
        }
    
        if(currentPlayX-1 >= 0){
            if(minedField[currentPlayX-1][currentPlayY].bomb == false){
                let bombQuant4 = bombSearch((currentPlayX-1), currentPlayY, minedField, mineFieldSize)
                visualField[currentPlayX-1][currentPlayY] = bombQuant4
                minedField[currentPlayX-1][currentPlayY].hit = true
            }
        }
    
        if(currentPlayX+1 <= mineFieldSize-1){
            if(minedField[currentPlayX+1][currentPlayY].bomb == false){
                let bombQuant5 = bombSearch((currentPlayX+1), currentPlayY, minedField, mineFieldSize)
                visualField[currentPlayX+1][currentPlayY] = bombQuant5
                minedField[currentPlayX+1][currentPlayY].hit = true
            }
        }
    
        if(currentPlayX-1 >= 0 && currentPlayY+1 <= mineFieldSize-1){
            if(minedField[currentPlayX-1][currentPlayY+1].bomb == false){
                let bombQuant6 = bombSearch((currentPlayX-1), (currentPlayY+1), minedField, mineFieldSize)
                visualField[currentPlayX-1][currentPlayY+1] = bombQuant6
                minedField[currentPlayX-1][currentPlayY+1].hit = true
            }
        }
    
        if(currentPlayY+1 <= mineFieldSize-1){
            if(minedField[currentPlayX][currentPlayY+1].bomb == false){
                let bombQuant7 = bombSearch(currentPlayX, (currentPlayY+1), minedField, mineFieldSize)
                visualField[currentPlayX][currentPlayY+1] = bombQuant7
                minedField[currentPlayX][currentPlayY+1].hit = true
            }
        }
    
        if(currentPlayX+1 <= mineFieldSize-1 && currentPlayY+1 <= mineFieldSize-1){
            if(minedField[currentPlayX+1][currentPlayY+1].bomb == false){
                let bombQuant8 = bombSearch((currentPlayX+1), (currentPlayY+1), minedField, mineFieldSize)
                visualField[currentPlayX+1][currentPlayY+1] = bombQuant8
                minedField[currentPlayX+1][currentPlayY+1].hit = true
            }
        }

        if(minedField[currentPlayX][currentPlayY].bomb == true){
            gameInProg = false
        }
    }
    else{
        console.log('Esse local já foi descoberto')
    }

}

console.log('Game Over')