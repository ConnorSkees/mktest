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

class QuestionInput extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      variables: [],
      isFocused: false,
      isVisible: true,
    };
  }


  toggle = e => this.setState(state => ({ isVisible: !state.isVisible }))

  handleDelete = e => {
    this.toggle()
    this.props.onDelete()
  }

  render() {
    let { variables, isFocused, isVisible } = this.state;
    let key = this.props.uniqueKey;
    // console.log('variables', JSON.stringify(variables));
    let ButtonStyle = {
      float: 'right',
      display: variables.length > 0 ? 'inline-block' : 'none',
    }

    variables = variables.map(v => this.renderVariable(v));
    return (
      <Disappear isVisible={isVisible}>
        <Collapse
          style={ CollapseStyle }
          activeKey={isFocused ? key+'p' : null}
          bordered={false}
          onChange={event => this.doNothing(event) }
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
                    onFocus={() => this.setState({ isFocused: variables.length > 0 }) }
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
              {variables}
            </Form>
          </Panel>
        </Collapse>
      </Disappear>
    )
  };
}

export default QuestionInput;
