import React, { Component } from 'react';

class Cell extends Component {

  render() {
      return (
        <>
          <div className="cell" data-hidden={this.props.cell.hidden} data-row={this.props.cell.row} 
            data-column={this.props.cell.column} onClick={this.props.slidingCell} >{this.props.cell.value}
          </div>
        </>
      );
  }
}

export default Cell;