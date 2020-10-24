const height = 720;
const width = 1280;

function setup() {
    // put setup code here
    createCanvas(windowWidth, windowHeight).mousePressed(createFloor);
    drawGameGrid();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    drawGameGrid()
}

const floors = [];

function draw() {
    // background(220)
    // put drawing code here


    // if (mouseIsPressed) {
    //     fill(0);
    // } else {
    //     fill(255);
    // }
    // // ellipse(mouseX,mouseY,80,80)

    for (let f of floors) {
        f.display();
    }


}


class Floor {
    constructor() {
        this.width = 50;
        this.height = 50;
        this.x = mouseX;
        this.y = mouseY;
    }

    display() {
        quad(this.x, this.y, this.x + this.width, this.y, this.x + this.width, this.y + this.height, this.x, this.y + this.height);

    }

}


function createFloor() {
    floors.push(new Floor())
}

function drawGameGrid() {
    let gameGridSize = 20;
    let largestWindowDimension = Math.max(windowWidth, windowHeight);
    let smallestWindowDimension = Math.min(windowWidth, windowHeight);
    let adjustedGameWindowSize = smallestWindowDimension - (smallestWindowDimension % gameGridSize);
    let centeringOffset = ((largestWindowDimension - adjustedGameWindowSize) / 2);
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

    for (let i = xStart; i <= xMax; i += gridStep) {
        line(i, yStart, i, yMax); // vertical grid
    }
    for (let j = yStart; j <= yMax; j += gridStep) {
        line(xStart, j, xMax, j); // horizontal grid
    }
}
