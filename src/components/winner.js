import React, { Component } from 'react';

class Winner extends Component {
  render() {
      return (
        <div className="winner">
          <h5>恭喜!你破關了</h5>
          <button className="button" onClick={this.props.playAgain} >重玩一次</button>
        </div>
      );
  }
}

export default Winner;