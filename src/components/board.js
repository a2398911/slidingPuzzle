import React, { Component } from 'react';
import Cell from '../components/cell'

class Board extends Component {

  render() {
      const { initCells } = this.props;
      return (
        <div className="wrap">
          {initCells.map((cell, index) => {
            return <Cell key={cell.id} cell={cell} slidingCell={this.props.slidingCell}/>
          })}
        </div>
      );
  }
}

export default Board;