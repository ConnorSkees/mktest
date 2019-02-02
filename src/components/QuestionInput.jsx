import React, { Component } from 'react';
import { Button, Input, Form, Collapse } from 'antd';
import VariableForm from './VariableForm'
import NameInput from './NameInput'
import ObjectInput from './ObjectInput'

const Panel = Collapse.Panel;

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index+1) + replacement+ this.substr(index + replacement.length);
}
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

const TextAreaStyle = {
  width: '80%',
  display: 'inline-block',
  border: 'none',
  fontFamily: "'Sarabun', sans-serif",
  fontSize: '2em',
}

class QuestionInput extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      variables: [],
      isFocused: false,
    };
  }

  handleChange = event => {
    let { value } = event.target;
    this.setState({ value });
    this.parseVariableNames(value);
  }

  parseVariableNames(value) {
    let variableRegex = /\[[^\[]*?\]/g;
    let matches = value.match(variableRegex);

    if (matches){
      matches = [...new Set(matches)]
      let counter = -1;
      matches = matches.map(m => m.replaceAll(/\[/, "").replaceAll(/\]/, ""));

      let variables = []

      matches.map(m => {
        counter++;
        if (matches.length !== this.state.variables.length){
          // new variable created
          let match = this.state.variables.filter(k => k.name === m)

          if (match.length > 0){
            match[0].key = counter;
            // variable already exists, so we just return it
            variables.push(match[0]);

          } else{
            // new variable, so we must make a new blank version
            variables.push({ key: counter, name: m, step: 1, min: 0, max: 0, unit: [] });
          }

        } else {
          // unrelated update or a rename
          let nameMatch = this.state.variables.filter(k => k.name === m);
          let counterMatch = this.state.variables.filter(k => k.key === counter);

          if (nameMatch.length > 0){
            // name was found, was not renamed
            variables.push(nameMatch[0]);

          } else if (counterMatch.length > 0){
            // name not found, so it must've been renamed
            counterMatch[0].name = m;
            variables.push(counterMatch[0]);
          }
        }
      });
      this.setState({ variables });
    } else {
      this.setState({ variables: [] });
    }
  }

  handleUnitChange = (unit, key) => {
    let variables = this.state.variables.filter(k => k.key === key)[0];
    variables.unit = unit;
    this.setState({ variables: variables&&this.state.variables });
  }

  handleStepChange = (step, key) => {
    let variable = this.state.variables.filter(k => k.key === key)[0];
    variable.step = step;
    this.setState({ variables: variable&&this.state.variables });
  }

  handleMinChange = (min, key) => {
    let variable = this.state.variables.filter(k => k.key === key)[0];
    variable.min = min;
    this.setState({ variables: variable&&this.state.variables });
  }

  handleMaxChange = (max, key) => {
    let variable = this.state.variables.filter(k => k.key === key)[0];
    variable.max = max;
    this.setState({ variables: variable&&this.state.variables });
  }

  handleNameChange = (name, key) => {
    let variable = this.state.variables.filter(k => k.key === key)[0];
    delete variable.min;
    delete variable.max;
    delete variable.step;
    delete variable.unit;
    variable.nameValue = name.replaceAll('undefined', '');
    this.setState({ variables: variable&&this.state.variables });
  }

  renderVariable(item) {
    let { name, key } = item;

    let nameRegex = /^name\s*(\d*)$/gi;
    let match = nameRegex.exec(name);

    if (match){
      return (
        <NameInput
          key={ key }
          number={match[1]}
          name={ name }
          onNameChange={ (name) => this.handleNameChange(name, key) }
        />)
    }

    let { min, max, step, unit } = item;
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

  doNothing = event => {
    console.log('nothing');
  }

  exportAsJSON() {
    let { variables } = this.state;
    return variables;
  }

  render() {
    let { variables, isFocused } = this.state;
    let key = this.props.uniqueKey;
    // console.log('variables', JSON.stringify(variables));
    let ButtonStyle = {
      float: 'right',
      display: variables.length > 0 ? 'inline-block' : 'none',
    }

    variables = variables.map(v => this.renderVariable(v));
    return (
      <Collapse activeKey={isFocused ? key+'p' : null} bordered={false} onChange={event => this.doNothing(event) } key={ key+'c' }>
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
                onClick={ this.props.onDelete }
                >
                -
              </Button>
              </div>}

          key={ key+'p' }>
          <Form>
            {variables}
          </Form>
        </Panel>
      </Collapse>

    )
  };
}

export default QuestionInput;
