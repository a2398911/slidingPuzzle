import React, { Component } from 'react';
import Board from './components/board';
import Title from './components/title';
import Footer from './components/footer';
import Winner from './components/winner';

class App extends Component {
  constructor() {
    super();
    let id = +(new Date());
    let initCells = [
      {"row":0 , "column":0 , "value":1, "hidden":false, "id": id+'0'},
      {"row":0 , "column":1 , "value":2, "hidden":false, "id": id+'1'},
      {"row":0 , "column":2 , "value":3, "hidden":false, "id": id+'2'},
      {"row":1 , "column":0 , "value":4, "hidden":false, "id": id+'3'},
      {"row":1 , "column":1 , "value":5, "hidden":false, "id": id+'4'},
      {"row":1 , "column":2 , "value":6, "hidden":false, "id": id+'5'},
      {"row":2 , "column":0 , "value":7, "hidden":false, "id": id+'6'},
      {"row":2 , "column":1 , "value":8, "hidden":false, "id": id+'7'},
      {"row":2 , "column":2 , "value":'', "hidden":true, "id": id+'8'}
    ]

    this.state = {
      initCells,
      stepCount: 0,
      starGame: false,
      winnerCells: JSON.stringify(initCells),
      winner: false,
      name: '',
      userWinner: JSON.parse(localStorage.getItem('userWinner')) || []
    }
  }

  randomsort = () => {
    return Math.random()>.5 ? -1 : 1;
    //用Math.random()函式生成0~1之間的隨機數與0.5比較，返回-1或1
  }

  setName = (name) => {
    this.setState({
      name
    })
  }

  startRandom = () => {
    let randomCells = this.state.initCells

    // let randomCells = this.state.initCells.sort(this.randomsort);
    randomCells.forEach((item, index) => {
      if(index < 3) {
        item.row = 0;
      } else if (2<index && index<6) {
        item.row = 1;
      } else if (5<index && index<9) {
        item.row = 2;
      }
      item.column = index % 3;
    })
    this.setState({
      initCells: randomCells,
      starGame: true,
      stepCount: 0,
      winner: false,
    })
  }

  slidingCellEvent = (e) => {
    if(!this.state.starGame) { return };
    let newStepCount = this.state.stepCount;
    let hiddenCell;
    let hiddenCellIndex;
    const cells = document.querySelectorAll('.cell');
    cells.forEach((item, index) => {
      if(item.dataset.hidden === 'true') {
        hiddenCell = item
        hiddenCellIndex = index;
      }
    })

    let targetCellX = e.target.offsetLeft - e.target.scrollLeft + e.target.clientLeft;
    let targetCellY = e.target.offsetTop - e.target.scrollLeft + e.target.clientTop;
    let hiddenCellX = hiddenCell.offsetLeft - hiddenCell.scrollLeft + hiddenCell.clientLeft;
    let hiddenCellY = hiddenCell.offsetTop - hiddenCell.scrollLeft + hiddenCell.clientTop;

    if(e.target.dataset.row === hiddenCell.dataset.row & Math.abs(targetCellX-hiddenCellX) === 100 ||
        e.target.dataset.column === hiddenCell.dataset.column & Math.abs(targetCellY-hiddenCellY)=== 100 )
      {
        let indnexCell;
        this.state.initCells.forEach((item, index) => {
          if(item.value === +(e.target.textContent)){ indnexCell = index }
        })
        


        let newCells = this.state.initCells;
        newCells[indnexCell].hidden = true;  
        newCells[hiddenCellIndex].hidden = false; 
        newCells[hiddenCellIndex].value = newCells[indnexCell].value;
        newCells[indnexCell].value = '';

        this.setState({
          initCells: newCells,
          stepCount: newStepCount+1
        })

        this.checkGame();
      }
}
  checkGame = () => {
    let currentCells = JSON.stringify(this.state.initCells);
    if (currentCells === this.state.winnerCells) {
      const { stepCount } = this.state;
      const { name } = this.state;
      let winner = [{stepCount, name}]
      
      this.setState({
        winner: true,
        starGame: false,
        userWinner: [ ...this.state.userWinner, winner]
      }, this.saveWinner)
    } 
  }

  saveWinner = () => {
    localStorage.setItem('userWinner', JSON.stringify(this.state.userWinner));
  }

  playAgain = () => {
    this.startRandom();
    this.setState({
      stepCount: 0,
      winner: false,
    })
  }

  render() {
    const { winner } = this.state
    return (
      <>
        <Title startRandom={this.startRandom} setName={this.setName} />
        <Board initCells={this.state.initCells} slidingCell={this.slidingCellEvent} />
        <Footer stepCount={this.state.stepCount} />
        { winner ? <Winner playAgain={this.playAgain} /> : null }
      </>
    );
  }
}

export default App;
