const FLOOR = 1;
const WALL = 2;
const BREAKABLE = 3;

let tileColorMap;

class Tile {
    get tileType() {
        return this._tileType;
    }

    set tileType(value) {
        this._tileType = value;
    }

    constructor(row, column, tileType) {
        this.row = row;
        this.column = column;
        this.color = tileColorMap[tileType];
        this._tileType = tileType;
    }


    display(xOffset, yOffset, scale) {
        // noStroke()
        let xCord = xOffset + this.column * scale;
        let yCord = yOffset + this.row * scale;

        fill(tileColorMap[this._tileType]);
        rect(xCord, yCord, scale, scale);
    }

}


const height = 720;
const width = 1280;
const gameGridSize = 21;
let gameMap;

function setup() {
    tileColorMap = {
        [FLOOR]: color(20, 100, 20),
        [WALL]: color(100, 100, 100),
        [BREAKABLE]: color(165, 42, 42)
    };
    // put setup code here
    // setupGameMap();
    createCanvas(windowWidth, windowHeight); //     .mousePressed(createFloor);
    gameMap = setupGameMap(gameGridSize);
    buildWalls(gameMap);
    drawGameGrid();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    drawGameGrid()
}


function draw() {
    gameMap.forEach(mapRow => {
        mapRow.forEach(tile => tile.display())
    });
}

function setupGameMap(gameGridSize) {
    let returnArray = new Array(gameGridSize);
    for (let mapRow = 0; mapRow < gameGridSize; mapRow++) {
        returnArray[mapRow] = new Array(gameGridSize);
    }

    for (let i = 0; i < gameGridSize; i++) {
        for (let j = 0; j < gameGridSize; j++) {
            returnArray[i][j] = new Tile(i, j, FLOOR);
        }
    }
    return returnArray;
}

function buildWalls(gameMap) {
    for (let i = 0; i < gameMap.length; i++) {
        // top and bottom
        gameMap[0][i].tileType = WALL;
        gameMap[gameMap.length - 1][i].tileType = WALL;
    }
    for (let i = 0; i < gameMap.length; i++) {
        // top and bottom
        gameMap[i][0].tileType = WALL;
        gameMap[i][gameMap.length - 1].tileType = WALL;
    }
    for (let i = 2; i < gameMap.length - 1; i += 2) {
        for (let j = 2; j < gameMap.length - 1; j += 2) {
            gameMap[i][j].tileType = WALL;
        }
    }
    for (let i = 1; i < gameMap.length - 1; i++) {
        for (let j = 1; j < gameMap.length - 1; j++) {
            if (gameMap[i][j].tileType !== WALL){
                if(getRandomInt(0,100) < 10) { //todo extract the 10 into a tunable value
                    gameMap[i][j].tileType = BREAKABLE;
                }
            }
        }

    }
}

function drawGameGrid() {

    let largestWindowDimension = Math.max(windowWidth, windowHeight);
    let smallestWindowDimension = Math.min(windowWidth, windowHeight);
    let adjustedGameWindowSize = smallestWindowDimension - (smallestWindowDimension % gameGridSize);
    let centeringOffset = ((largestWindowDimension - adjustedGameWindowSize) / 2); //todo chase divide by 0 bug
    let isWider = windowWidth > windowHeight;
    let isHigher = !isWider;
    let width = adjustedGameWindowSize;
    let height = adjustedGameWindowSize;

    let mod = adjustedGameWindowSize % gameGridSize;
    let modifiedConstrainingDimension = adjustedGameWindowSize - mod;
    let gridStep = (modifiedConstrainingDimension - mod) / gameGridSize;


    let xStart = 0;
    let yStart = 0;
    let xMax = 0;
    let yMax = 0;
    if (isWider) {
        xStart = centeringOffset;
        xMax = xStart + adjustedGameWindowSize;
        yStart = 0;
        yMax = adjustedGameWindowSize
    } else {
        xStart = 0;
        xMax = adjustedGameWindowSize;
        yStart = centeringOffset;
        yMax = yStart + adjustedGameWindowSize
    }

    for (let i = 0; i < gameGridSize; i++) {
        for (let j = 0; j < gameGridSize; j++) {
            gameMap[i][j].display(xStart, yStart, gridStep);
        }
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}