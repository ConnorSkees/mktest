import React, { Component } from 'react';
import { Input, InputNumber, Tooltip, Divider, Form } from 'antd';
import VariableForm from './VariableForm'
import VariablePicker from './VariablePicker'

class QuestionInput extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      variables: [],
    };
  }

  handleChange = event => {
    let { value } = event.target;
    this.setState({ value });
    console.log(value, this.state.value)
      this.parseVariables(value);
  }

  parseVariables(value) {
    let variableRegex = /\{.*?\}/g;
    let matches = value.match(variableRegex);
    if (matches){
      matches = matches.map(m => {
          return (
            {
              key: m
            });
      })
      this.setState({ variables: matches })
    }
  }

  createVariable(item) {
    item = item.replace("{", "");
    item = item.replace("}", "");
    return (
      <VariableForm name={ item } />
    )
  }

  render() {
    let { variables } = this.state;
    variables = variables.map(v => this.createVariable(v.key));
    return (
      <div>
        <Input
          value={ this.state.value }
          onChange={event => this.handleChange(event) }
          onBlur={event => this.handleChange(event) }
          />
        <Form>
          {variables}
        </Form>
      </div>

    )
  };
}

export default QuestionInput;
