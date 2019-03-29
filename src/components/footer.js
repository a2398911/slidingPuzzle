import React, { Component } from 'react';

class Footer extends Component {

  render() {
      return (
        <h5 className="StepCount">目前已走: {this.props.stepCount} 步</h5>
      );
  }
}

export default Footer;