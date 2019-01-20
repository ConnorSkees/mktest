import React, { Component } from 'react';
import { Input, InputNumber, Tooltip, Divider, Form, Switch } from 'antd';
import VariablePicker from './VariablePicker'


class VariableForm extends Component {
  state = {
    name: this.props.name,
    min: this.props.min || 0,
    max: this.props.max || 0,
    step: this.props.step || 1,
    unit: '',
  };

  handleStepChange = step => {
    this.setState({ step })
  }

  handleChange = value => {
    let unit = value.slice(-1)[0]
    this.setState({ unit })
    console.log(unit)
  }

  render() {
    return (
      <React.Fragment>
        <Divider orientation="left">{ this.props.name }</Divider>
        <div>
          <div className={ 'variable-label' } style={{  }}>Min:</div>
          <InputNumber
            addonBefore={ 'Min:' }
            size={'small'}
            step={ this.state.step }
            style={{ width: '50%', marginLeft: '3%' }} />
        </div>
        <div>
          <div className={ 'variable-label' } >Max:</div>
          <InputNumber
            size={'small'}
            step={ this.state.step }
            style={{ width: '50%', marginTop: '5%', marginLeft: '3%' }} />
        </div>
        <div>
          <div className={ 'variable-label' } >Step:</div>
          <InputNumber
            size={'small'}
            onChange={ this.handleStepChange }
            style={{ width: '50%', marginTop: '5%', marginLeft: '3%' }} />
        </div>
        <VariablePicker onChange={value => this.handleChange(value) } />
      </React.Fragment>
    )
  };
}

export default VariableForm;
