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
    this.parseVariableNames(value);
  }

  parseVariableNames(value) {
    let variableRegex = /\{.*?\}/g;
    let matches = value.match(variableRegex);
    if (matches){
      matches = [...new Set(matches)]
      let counter = -1;
      matches = matches.map(m => m.replace("{", "").replace("}", "")).filter(x => x.indexOf("{") === -1);

      let variables = []

      matches.map(m => {
        counter++;
        if (matches.length != this.state.variables.length){
          // new variable created
          let match = this.state.variables.filter(k => k.name == m)

          if (match.length > 0){
            // variable already exists, so we just return it
            variables.push(match[0])

          } else{
            // new variable, so we must make a new blank version
            variables.push({ key: counter, name: m })
          }

        } else {
          // unrelated update or a rename
          let nameMatch = this.state.variables.filter(k => k.name == m);
          let counterMatch = this.state.variables.filter(k => k.key == counter);

          if (nameMatch.length > 0){
            // name was found, was not renamed
            variables.push(nameMatch[0])

          } else if (counterMatch.length > 0){
            // name not found, so it must've been renamed
            counterMatch[0].name = m;
            variables.push(counterMatch[0])
          }
        }
      });
      this.setState({ variables })
    } else {
      this.setState({ variables: [] })
    }
  }

  createVariable(item) {
    let { name, min, max, step } = item;

    return (
      <VariableForm
        min={ min }
        max={ max }
        step={ step }
        name={ name } />
    )
  }

  render() {
    let { variables } = this.state;
    // console.log('variables', variables)
    variables = variables.map(v => this.createVariable(v));
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
