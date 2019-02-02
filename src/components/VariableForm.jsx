import React, { Component } from 'react';
import { Input, InputNumber, Divider } from 'antd';
import UnitPicker from './UnitPicker'

const InputGroup = Input.Group;

const DividerStyle = {
  fontFamily: "'Libre Baskerville', serif",
  fontSize: '2em'
}

const InputStyle = {
  fontSize: '1.25em',
  width: '80%'
}

const LabelStyle = {
  width: '2.5em',
  fontSize: '1.5em',
  display: 'inline-block'
}

class VariableForm extends Component {
  state = {
    name: this.props.name || '',
    min: this.props.min || 0,
    max: this.props.max || 0,
    step: this.props.step || 1,
  };

  handleStepChange = step => {
    this.props.onStepChange(step, this.props.uniqueKey);
  }

  render() {
    const InputSize = 'large';
    return (
      <React.Fragment>
      <InputGroup style={{ textAlign: 'center' }}>
        <Divider style={ DividerStyle } orientation="left">{ this.props.name }</Divider>
        <div>
          <span style={ LabelStyle }>Min: </span>
          <InputNumber
            value={ this.props.min }
            onChange={min => this.props.onMinChange(min, this.props.uniqueKey) }
            size={ InputSize }
            step={ this.props.step }
            style={ InputStyle }
            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/(,*)/g, '')}
          />
        </div>
        <div>
          <span style={ LabelStyle } >Max: </span>
          <InputNumber
            value={ this.props.max }
            min={ this.props.min }
            onChange={ max => this.props.onMaxChange(max, this.props.uniqueKey) }
            size={ InputSize }
            step={ this.props.step }
            style={ InputStyle }
            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/(,*)/g, '')}
             />
         </div>
        <div>
          <span style={ LabelStyle }>Step: </span>
          <InputNumber
            size={ InputSize }
            value={ this.props.step }
            onChange={ this.handleStepChange }
            style={ InputStyle }
            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/(,*)/g, '')}
             />
         </div>
         <UnitPicker value={ this.props.unit } onChange={value => this.props.onUnitChange(value, this.props.uniqueKey) } />
       </InputGroup>
      </React.Fragment>
    )
  };
}

export default VariableForm;
