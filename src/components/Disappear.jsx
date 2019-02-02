import React, { Component } from 'react';
import { Card, Button } from 'antd';
import QuestionInput from './QuestionInput'
import { Transition, animated } from 'react-spring'


function sleep(seconds) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, seconds*1000);
  });
}

class Disappear extends Component {
  constructor(props){
    super(props);
    this.state = {
       show: true,
     }
  }

 toggle = e => this.setState(state => ({ show: !state.show }))

  render() {
    return (
      <div style={{ height: '100%' }} onClick={this.toggle}>
        <Transition
          native
          items={this.state.show}
          from={{ overflow: 'hidden', height: 0 }}
          enter={[{ height: 100 }]}
          leave={{ height: 0 }}>
          {show =>
            show && (props => <animated.div style={props}>{this.props.children}</animated.div>)
          }
        </Transition>
      </div>
    )
  };
}

export default Disappear;
