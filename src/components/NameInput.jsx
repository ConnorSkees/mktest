import React, { Component } from 'react';
import { Select, Divider } from 'antd';


function randomChoice(arr) {
   return arr[Math.floor(Math.random() * arr.length)];
}
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

const DividerStyle = {
  fontFamily: "'Libre Baskerville', serif",
  fontSize: '2em'
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
    if (options[0].firstName !== "Random") {
      options.unshift({firstName: 'Random'});
    }

    let renderedOptions = options.map(o => {
      return (
        <Option
          value={`${o.firstName} ${o.lastName}${o.graduationYear}`}
          key={ key }
        >
          {o.firstName} {o.lastName}

        </Option>)
    })

    return (
      <div>
        <Divider style={ DividerStyle } orientation="right">Name { this.props.number }</Divider>
        <div className={ 'variable-label' } style={{ width: 50 }} >Name:</div>
          <Select
            showSearch
            style={{ width: 200 }}
            onChange={value => this.props.onNameChange(value) }
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
