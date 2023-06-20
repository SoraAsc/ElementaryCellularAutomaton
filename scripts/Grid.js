class Grid 
{
	constructor(cell, cellSize, gridSizeX, gridSizeY, rule) 
	{
		this.cell = cell
		this.cellSize = cellSize
		this.gridSizeX = gridSizeX
		this.gridSizeY = gridSizeY
		this.rule = rule
	}

	automaton()
	{
		// console.log(this.cell)
		for(let i = 0; i < this.gridSizeY; i++)
		{
			this.cell[i] = this.cell[i+1]
		}
		this.cell[this.gridSizeY-1] = this.cell[this.gridSizeY-2]
		const nextCell = new Array(this.gridSizeX).fill().map(() => new Cell(0))
		for(let j = 0; j < this.gridSizeX; j++)
		{
			const v = this.mapRule([
				(this.cell[this.gridSizeY-1][this.mod(j-1,this.gridSizeX)]).getState(),
				(this.cell[this.gridSizeY-1][j]).getState(),
				(this.cell[this.gridSizeY-1][this.mod(j+1,this.gridSizeX)]).getState()])
			nextCell[j].setState(v)
		}
		this.cell[this.gridSizeY-1] = nextCell	
	}
	paint()
	{
		for(let i = 0; i < this.gridSizeY; i++)
		{
			for(let j = 0; j < this.gridSizeX; j++)
			{
				const v = this.cell[i][j].getState()
					
				if(v == 1) fill(0, 0, 0, 255)
				else fill(255, 255, 255, 255)
				rect(j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize)
			}
		}

	}

	mapRule(ruleArray)
	{
		let index = ruleArray.reduce((r, a) => (r << 1) | a)
		return this.rule[index]
	}

	mod(n, m) {
		return ((n % m) + m) % m
	}
}