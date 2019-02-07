import React, { Component } from 'react';
import { Card, Button, Icon } from 'antd';
import QuestionInput from './QuestionInput'
import MultipleChoice from './MultipleChoice'
import Disappear from './Disappear'

// TODO: make multiple choice questions

function sleep(seconds) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, seconds*1000);
  });
}

class TestCreator extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,
      questionInputs: [

       ],
     }

    this.myRef = React.createRef();
  }

  componentWillMount(){
    let { questionInputs } = this.state;
    if (questionInputs.length === 0){
      this.addShortAnswer();
    }
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

 async handleDelete(key) {
   var x = await sleep(2);
   let questionInputs = this.state.questionInputs.filter(k => k.key !== key);
   console.log(questionInputs)
   this.setState({ questionInputs })
 }

 addShortAnswer = () => {
   let { questionInputs } = this.state;
   let key = Math.random(1, 300).toString()
   questionInputs.push(<QuestionInput
                          onDelete={() => this.handleDelete(key)}
                          ref={this.myRef}
                          key={ key }
                          uniqueKey={ key }
                        />)
   this.setState({ questionInputs })
 }

 handleExport = () => {
   const val = this.myRef.current;
   if (val !== null) {
     val.exportAsJSON();
   }
 }

  render() {
    let { questionInputs } = this.state;

    return (
      <Card
        title={ 'Test Test #1' }
        extra={<Button onClick={() => this.handleExport() } type="dashed">Export</Button>}
        style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}
      >
      <div>
        <Card
          title="Short Answer Question"
          extra={<Button type="primary" style={{ float: 'right' }} onClick={ () => this.addShortAnswer() }>
            <Icon type="plus" />
          </Button>}
          style={{ width: '60%', marginLeft: 'auto', marginRight: 'auto' }}
          >
            { questionInputs }
        </Card>
      </div>
    </Card>

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
