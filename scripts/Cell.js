class Cell
{
    constructor(state)
    {
        this.state = state
    }

    getState = () => this.state
    setState = (newValue) => this.state = newValue
}