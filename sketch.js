// ======================== Game State Variables ==========================\\

// =========================== Grid Variables =============================\\
let grid;
const canvasSizeX = 450, canvasSizeY = 450, cellSize = 50
const ruleNumber = 2 //0 to 256

// ============================== Functions ================================\\
function setup() 
{
	createCanvas(canvasSizeX, canvasSizeY)
	let binaryString = ("00000000"+ruleNumber.toString(2)).slice(-8)
	let binaryArray = binaryString.split('')
	console.log(binaryArray)
}

function draw() {
	background('#168aad')
	
	//grid.place()
}