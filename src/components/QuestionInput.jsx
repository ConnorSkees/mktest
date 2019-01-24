import React, { Component } from 'react';
import { Input, InputNumber, Tooltip, Divider, Form } from 'antd';
import VariableForm from './VariableForm'
import VariablePicker from './VariablePicker'
import NameInput from './NameInput'
import ObjectInput from './ObjectInput'

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index+1) + replacement+ this.substr(index + replacement.length);
}
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};


class QuestionInput extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      variables: [],
    };
  }

  handleChange = event => {
    let { value, selectionStart, selectionEnd } = event.target;
    this.setState({ value });
    this.parseVariableNames(value);
  }

  handleKeyUp = event => {
    // let { selectionStart, selectionEnd, value } = event.target;
    // console.log(event.key)
    // if (event.key === '['){
    //   event.preventDefault();
    //   if (selectionStart < selectionEnd){
    //
    //   } else {
    //     value = value.replaceAt(selectionStart-1, '}')
    //   }
    // }
    // console.log('keydown', value)
    // event.target.setSelectionRange(selectionStart, selectionStart)
    // this.setState({ value })
    // event.target.setSelectionRange(selectionStart, selectionStart)
  }

  parseVariableNames(value) {
    let variableRegex = /\{[^\{]*?\}/g;
    let matches = value.match(variableRegex);

    if (matches){
      matches = [...new Set(matches)]
      let counter = -1;
      matches = matches.map(m => m.replaceAll("{", "").replaceAll("}", ""));

      let variables = []

      matches.map(m => {
        counter++;
        if (matches.length != this.state.variables.length){
          // new variable created
          let match = this.state.variables.filter(k => k.name == m)

          if (match.length > 0){
            console.log('same', match[0])
            match[0].key = counter;
            // variable already exists, so we just return it
            variables.push(match[0])

          } else{
            console.log('new', counter, m)
            // new variable, so we must make a new blank version
            variables.push({ key: counter, name: m, step: 1, min: 0, max: 0, unit: [] })
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

  handleUnitChange = (unit, key) => {
    let variables = this.state.variables.filter(k => k.key == key)[0];
    variables.unit = unit;
    this.setState({ variables: variables&&this.state.variables })
  }

  handleStepChange = (step, key) => {
    let variable = this.state.variables.filter(k => k.key == key)[0];
    variable.step = step;
    this.setState({ variables: variable&&this.state.variables })
  }

  handleMinChange = (min, key) => {
    let variable = this.state.variables.filter(k => k.key == key)[0];
    variable.min = min;
    this.setState({ variables: variable&&this.state.variables })
  }

  handleMaxChange = (max, key) => {
    let variable = this.state.variables.filter(k => k.key == key)[0];
    variable.max = max;
    this.setState({ variables: variable&&this.state.variables })
  }

  renderVariable(item) {
    let { name, min, max, step, key, unit } = item;

    let nameRegex = /^name\s*(\d*)$/gi;
    let match = nameRegex.exec(name);

    if (match){
      return <NameInput number={match[1]} />
    }

    return (
      <VariableForm
        onUnitChange={(unit, key) => this.handleUnitChange(unit, key) }
        onStepChange={(step, key) => this.handleStepChange(step, key) }
        onMinChange={(min, key) => this.handleMinChange(min, key) }
        onMaxChange={(max, key) => this.handleMaxChange(max, key) }
        uniqueKey={ key }
        unit={ unit }
        min={ min }
        max={ max }
        step={ step }
        name={ name }
      />
    )
  }

  render() {
    let { variables } = this.state;
    // console.log('variables', variables)
    variables = variables.map(v => this.renderVariable(v));
    return (
      <div>
        <Input.TextArea
          autosize={ true }
          value={ this.state.value }
          onChange={event => this.handleChange(event) }
          onKeyUp={event => this.handleKeyUp(event)}
          />
        <Form>
          {variables}
        </Form>
      </div>

    )
  };
}

export default QuestionInput;
