import React, { Component } from 'react';
import { Card, Button, Collapse } from 'antd';
import QuestionInput from './QuestionInput'

class TestCreator extends Component {
  state = {
    visible: false,
    questionInputs: [],
   }

   showModal = () => {
     this.setState({
       visible: true,
     });
   }

   handleOk = (e) => {
     console.log(e);
     this.setState({
       visible: false,
     });
   }

   handleCancel = (e) => {
     console.log(e);
     this.setState({
       visible: false,
     });
   }

 addShortAnswer = () => {
   console.log('clicked!')
   let { questionInputs } = this.state;
   questionInputs.push(<QuestionInput key={Math.random(1, 300)} />)
   this.setState({ questionInputs })
 }

  render() {
    let { questionInputs } = this.state;
    console.log(questionInputs);
    return (
      <div>
        <Button type="primary" style={{ float: 'right' }} onClick={ () => this.addShortAnswer() }>
          +
        </Button>

        <Card
          title="Short Answer Question"
          extra={<a href="#">Actions</a>}
          style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}
          >
            { this.state.questionInputs }
        </Card>
      </div>

    )
  };
}

// <Button type="primary" onClick={this.showModal}>
//   Open Modal
// </Button>
// <Modal
//   title="Basic Modal"
//   visible={this.state.visible}
//   onOk={this.handleOk}
//   onCancel={this.handleCancel}
// >
//   <p>Some contents...</p>
//   <p>Some contents...</p>
//   <p>Some contents...</p>
// </Modal>


export default TestCreator;
