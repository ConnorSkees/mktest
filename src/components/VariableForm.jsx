import React, { Component } from 'react';
import { Input, InputNumber, Tooltip, Divider, Form, Switch } from 'antd';
import VariablePicker from './VariablePicker'


class VariableForm extends Component {
  state = {
    name: this.props.name,
    min: this.props.min || 0,
    max: this.props.max || 0,
    step: this.props.step || 1,
  };

  handleStepChange = step => {
    this.props.onStepChange(step, this.props.uniqueKey)
  }

  render() {
    return (
      <React.Fragment>
        <Divider orientation="left">{ this.props.name }</Divider>
        <div>
          <div className={ 'variable-label' } style={{  }}>Min:</div>
          <InputNumber
            value={ this.props.min }
            onChange={min => this.props.onMinChange(min, this.props.uniqueKey) }
            size={'small'}
            step={ this.props.step }
            style={{ width: '50%', marginLeft: '3%' }} />
        </div>
        <div>
          <div className={ 'variable-label' } >Max:</div>
          <InputNumber
            value={ this.props.max }
            onChange={ this.props.onMaxChange }
            size={'small'}
            step={ this.props.step }
            style={{ width: '50%', marginTop: '5%', marginLeft: '3%' }} />
        </div>
        <div>
          <div className={ 'variable-label' } >Step:</div>
          <InputNumber
            size={'small'}
            value={ this.props.step }
            onChange={ this.handleStepChange }
            style={{ width: '50%', marginTop: '5%', marginLeft: '3%' }} />
        </div>
        <VariablePicker value={ this.props.unit } onChange={value => this.props.onUnitChange(value, this.props.uniqueKey) } />
      </React.Fragment>
    )
  };
}

export default VariableForm;
