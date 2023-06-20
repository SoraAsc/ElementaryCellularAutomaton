// ======================== Game State Variables ==========================\\

// =========================== Grid Variables =============================\\
let grid;
let canvasSizeX = 450, canvasSizeY = 450, cellSize = 25
let ruleNumber = 0 //0 to 255
let binaryArray = []
// =========================== GUI Variables =============================\\
let ruleNumbersSelect, initializationSMSelect, mirrorGridCheckbox, clearSimulationBtn
let canvasXI, canvasYI, cellSizeI, frameRateI
// ============================== Functions ================================\\
function setup() 
{
	createCanvas(canvasSizeX, canvasSizeY)
	frameRate(10)
	initializeConfigurationsBtns()
	const gridSizeX = int(canvasSizeX / cellSize)
	const gridSizeY = int(canvasSizeY / cellSize)
	let cells = []
	for(let i = 0; i < gridSizeY; i++)
	{
		cells.push([])
		for(let j = 0; j < gridSizeX; j++)
		{
			cells[i].push(new Cell(0))
		}
	}
	cells[gridSizeY-1][int(gridSizeX / 2)].setState(1)
	binaryArray = ("00000000"+ruleNumber.toString(2)).slice(-8).split('').reverse()
	grid = new Grid(cells, cellSize, gridSizeX, gridSizeY, binaryArray, true)
}

function initializeConfigurationsBtns()
{
	// Configure Div Size
	select("#container_btns").size(canvasSizeX, 20)
	select("#grid_options_container").size(canvasSizeX, 20)

	
	// In the future declare this on html
	// Create the buttons and inputs
	ruleNumbersSelect = createSelect()	
	initializationSMSelect = createSelect()	
	mirrorGridCheckbox = createCheckbox("Mirror", true)	
	clearSimulationBtn = createButton("Clear")

	canvasXI = createInput(450)
	canvasYI = createInput(450)
	cellSizeI = createInput(25)
	frameRateI = createInput(10)

	// Set the parent of each
	ruleNumbersSelect.parent("container_btns")
	initializationSMSelect.parent("container_btns")
	mirrorGridCheckbox.parent("container_btns")
	clearSimulationBtn.parent("container_btns")
	canvasXI.parent("grid_options_container")
	canvasYI.parent("grid_options_container")
	cellSizeI.parent("grid_options_container")
	frameRateI.parent("grid_options_container")

	// Set the default attributes
	canvasXI.attribute('type', 'number'); canvasYI.attribute('type', 'number'); 
	cellSizeI.attribute('type', 'number'); frameRateI.attribute('type', 'number');
	canvasXI.attribute('placeholder', 'Canvas X Size'); canvasYI.attribute('placeholder', 'Canvas Y Size'); 
	cellSizeI.attribute('placeholder', 'Cell Size'); frameRateI.attribute('placeholder', 'Frame Rate');
	
	canvasXI.attribute('min', 200); canvasXI.attribute('max', 1000);
	canvasYI.attribute('min', 200); canvasYI.attribute('max', 1000);
	cellSizeI.attribute('min', 200); cellSizeI.attribute('max', 1000);
	frameRateI.attribute('min', 1); frameRateI.attribute('max', 100);

	// Initialize the values
	for(let i = 0; i < 256; i++)	
		ruleNumbersSelect.option(i)
	initializationSMSelect.option("Single Active")
	initializationSMSelect.option("Don't Change")
	initializationSMSelect.option("Random")
	initializationSMSelect.option("Fixed")
	initializationSMSelect.disable("Fixed")

	ruleNumbersSelect.changed(changeRule)
	mirrorGridCheckbox.changed(changeMirror)
	clearSimulationBtn.mousePressed(clearGrid)
}

function clearGrid()
{
	let cells = []
	canvasSizeX = canvasXI.value()
	canvasSizeY = canvasYI.value()
	cellSize = cellSizeI.value()
	createCanvas(canvasSizeX, canvasSizeY)
	frameRate(int(frameRateI.value()))
	const gridSizeX = int(canvasSizeX / cellSize)
	const gridSizeY = int(canvasSizeY / cellSize)
	for(let i = 0; i < gridSizeY; i++)
	{
		cells.push([])
		for(let j = 0; j < gridSizeX; j++)
		{
			cells[i].push(new Cell(0))
		}
	}
	cells[gridSizeY-1][int(gridSizeX / 2)].setState(1)
	binaryArray = ("00000000"+ruleNumber.toString(2)).slice(-8).split('').reverse()
	grid = new Grid(cells, cellSize, gridSizeX, gridSizeY, binaryArray, mirrorGridCheckbox.checked())
}

function changeMirror()
{
	grid.setMirror(mirrorGridCheckbox.checked())
}


function changeRule()
{
	const gridSizeX = int(canvasSizeX / cellSize)
	const gridSizeY = int(canvasSizeY / cellSize)
	ruleNumber = int(ruleNumbersSelect.value())
	switch (initializationSMSelect.value()) {
		case "Single Active":
			for(let j = 0; j < gridSizeX; j++)			
				grid.getCell()[gridSizeY-1][j].setState(0)
			grid.getCell()[gridSizeY-1][int(gridSizeX / 2)].setState(1)
			break
		case "Random":
			for(let j = 0; j < gridSizeX; j++)			
				grid.getCell()[gridSizeY-1][j].setState(int(random(0, 2)))
			break
		default:
			break
	}

	binaryArray = ("00000000"+ruleNumber.toString(2)).slice(-8).split('').reverse()
	grid = new Grid(grid.getCell(), cellSize, gridSizeX, gridSizeY, binaryArray, mirrorGridCheckbox.checked())
}

function draw() {
	background('#168aad')
	if(grid)
	{
		grid.paint()
		grid.automaton()
	}
}