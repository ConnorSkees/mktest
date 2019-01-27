import React, { Component } from 'react';
import { Select, Divider } from 'antd';


function randomChoice(arr) {
   return arr[Math.floor(Math.random() * arr.length)];
}

const Option = Select.Option;
let options = [
  {
    firstName: 'Alex',
    lastName: 'Jones',
    gender: 'male',
  }
]

// <span style={{ float: 'right' }}>
//   {o.graduationYear}
// </span>

class NameInput extends Component {
  state = {
  };
  render() {
    let key = this.props.key || `${Math.random(1, 300).toString()}n`;
    options.unshift({firstName: 'Random'});

    let renderedOptions = options.map(o => {
      return (
        <Option
          value={`${o.firstName}${o.lastName}${o.graduationYear}`}
          key={ key }
        >
          {o.firstName} {o.lastName}

        </Option>)
    })

    return (
      <div>
        <Divider orientation="right">Name { this.props.number }</Divider>
        <div className={ 'variable-label' } style={{ width: 50 }} >Name:</div>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a person"
            optionFilterProp="children"
            filterOption={(input, option) => {
              let { children } = option.props;
              children = children.filter(x => x !== undefined)
              children = children.reduce((a, b) => a+b).toLowerCase();
              return children.indexOf(input.toLowerCase().trim()) > -1;
            }}
          >
            {renderedOptions}
          </Select>
      </div>
    )
  };
}

export default NameInput;
