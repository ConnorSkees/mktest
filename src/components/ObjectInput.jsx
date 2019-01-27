import React, { Component } from 'react';
import { Switch, Select, Divider } from 'antd';

const Option = Select.Option;
const options = [
  {
    singular: 'Pony',
    lastName: 'Ponies',
  }
]

class ObjectInput extends Component {
  state = {

  };
  render() {

    let renderedOptions = options.map(o => {
      return (
        <Option value={ o.singular } >
          {o.singular}
        </Option>)
    })
    return (
      <div>
        <Divider orientation="right">Name</Divider>
        <div className={ 'variable-label' } style={{ width: 50 }} >Name:</div>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a person"
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {renderedOptions}
          </Select>
      </div>
    )
  };
}

export default ObjectInput;
