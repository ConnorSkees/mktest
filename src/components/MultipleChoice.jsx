import React, { Component } from 'react';
import { Button, Input, Form, Collapse, Icon } from 'antd';
import VariableForm from './VariableForm'
import NameInput from './NameInput'
import ObjectInput from './ObjectInput'
import Disappear from './Disappear'

const Panel = Collapse.Panel;

const TextAreaStyle = {
  width: '80%',
  display: 'inline-block',
  border: 'none',
  fontFamily: "'Sarabun', sans-serif",
  fontSize: '2em',
}

const CollapseStyle = {
  marginBottom: 25
}

class MultipleChoice extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      choices: [],
      isFocused: false,
      isVisible: true,
    };
  }


  toggle = e => this.setState(state => ({ isVisible: !state.isVisible }))

  handleDelete = e => {
    this.toggle()
    this.props.onDelete()
  }

  renderChoice = choice => {

  }

  render() {
    let { choices, isFocused, isVisible } = this.state;
    let key = this.props.uniqueKey;
    // console.log('choices', JSON.stringify(choices));
    let ButtonStyle = {
      float: 'right',
      display: choices.length > 0 ? 'inline-block' : 'none',
    }

    choices = choices.map(c => this.renderChoice(c));
    return (
      <Disappear isVisible={isVisible}>
        <Collapse
          style={ CollapseStyle }
          activeKey={isFocused ? key+'p' : null}
          bordered={false}
          key={ key+'c' }>
          <Panel
            showArrow={ false }
            header={
              <div>
                <Input.TextArea
                    placeholder={ 'Your question here' }
                    autosize={ true }
                    value={ this.state.value }
                    onChange={ event => this.handleChange(event) }
                    key={ key+'i' }
                    style={ TextAreaStyle }
                    onFocus={() => this.setState({ isFocused: choices.length > 0 }) }
                  />
                <Button
                  size='large'
                  style={ ButtonStyle }
                  onClick={() => this.setState({ isFocused: !isFocused }) }>
                  { isFocused ? 'Hide' : 'Show' }
                </Button>
                <Button
                  size='large'
                  type='danger'
                  style={{ ...ButtonStyle, display: 'inline-block' }}
                  onClick={ this.handleDelete }
                  >
                  <Icon type="minus" />
                </Button>
                </div>}

            key={ key+'p' }>
            <Form>
              {choices}
            </Form>
          </Panel>
        </Collapse>
      </Disappear>
    )
  };
}

export default MultipleChoice;
