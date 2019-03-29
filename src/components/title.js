import React, { Component } from 'react';

class Title extends Component {
  constructor() {
    super();
    this.state = {
      inputText: '',
      showName: '',
    }
  }

  udpateInputText = (event) => {
    this.setState({
        inputText: (event.target.value).trim()
    })
  }

  starGame = () => {
    let name = this.state.inputText;
    if(!name) { return }
    this.props.startRandom();
    this.props.setName(name);
    this.setState({
      inputText: '',
      showName: `Hi，${name}`
    })
  }

  render() {
      return (
        <div className="titleWrap">
          <input type="text" placeholder="輸入玩家名字" value={this.state.inputText}  onChange={this.udpateInputText}/>
          <button className="button" onClick={this.starGame} >Start</button>
          <h5 className="name">{this.state.showName}</h5>
        </div>
      );
  }
}

export default Title;