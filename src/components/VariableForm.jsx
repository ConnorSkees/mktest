import React, { Component } from 'react';
import { Input, InputNumber, Divider } from 'antd';
import VariablePicker from './VariablePicker'

const InputGroup = Input.Group;

const DividerStyle = {
  fontFamily: "'Libre Baskerville', serif",
  fontSize: '2em'
}

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

  render() {//  style={{ width: '50%', marginLeft: '3%' }} //style={{ width: '50%', marginTop: '5%', marginLeft: '3%' }} //style={{ width: '50%', marginTop: '5%', marginLeft: '3%' }}
    return (
      <React.Fragment>
      <InputGroup compact>
        <Divider style={ DividerStyle } orientation="left">{ this.props.name }</Divider>
        <div>
          <div className={ 'variable-label' }>Min:</div>
          <InputNumber
            value={ this.props.min }
            onChange={min => this.props.onMinChange(min, this.props.uniqueKey) }
            size={'small'}
            step={ this.props.step }

          />
        </div>
        <div>
          <div className={ 'variable-label' } >Max:</div>
          <InputNumber
            value={ this.props.max }
            min={ this.props.min }
            onChange={ max => this.props.onMaxChange(max, this.props.uniqueKey) }
            size={ 'small' }
            step={ this.props.step }
             />
         </div>
        <div>
          <div className={ 'variable-label' } >Step:</div>
          <InputNumber
            size={'small'}
            value={ this.props.step }
            onChange={ this.handleStepChange }
             />
         </div>
       </InputGroup>
       <VariablePicker value={ this.props.unit } onChange={value => this.props.onUnitChange(value, this.props.uniqueKey) } />
      </React.Fragment>
    )
  };
}

export default VariableForm;
