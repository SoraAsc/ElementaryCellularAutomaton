// ======================== Game State Variables ==========================\\

// =========================== Grid Variables =============================\\
let grid;
const canvasSizeX = 450, canvasSizeY = 450, cellSize = 5
const ruleNumber = 90 //0 to 255
let binaryArray = []
// ============================== Functions ================================\\
function setup() 
{
	createCanvas(canvasSizeX, canvasSizeY)
	frameRate(10)
	const gridSizeX = int(canvasSizeX / cellSize)
	const gridSizeY = int(canvasSizeY / cellSize)
	let cells = []
	for(let i = 0; i < gridSizeY; i++)
	{
		cells.push([])
		for(let j = 0; j < gridSizeX; j++)
		{
			// if(i == gridSizeY-1) cells[i].push(new Cell(int(random(0, 2))))
			// else cells[i].push(new Cell(0))
			cells[i].push(new Cell(0))
		}
	}
	cells[gridSizeY-1][int(gridSizeX / 2)].setState(1)
	binaryArray = ("00000000"+ruleNumber.toString(2)).slice(-8).split('').reverse()
	grid = new Grid(cells, cellSize, gridSizeX, gridSizeY, binaryArray)
}

function draw() {
	background('#168aad')
	grid.paint()
	grid.automaton()
}