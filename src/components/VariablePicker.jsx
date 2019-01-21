import React, { Component } from 'react';
import { Switch, Cascader } from 'antd';

function toTitleCase(str) {
        return str.replace(
            /\w\S*/g,
            function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }

function convertToDict(arr){
  arr = arr.map(l => {
        return ({
          value: l,
          label: toTitleCase(l),
          isParent: false,
        })
      });
  return arr
}

const metricUnits = convertToDict(['meter', 'gram', 'second', 'ampere', 'kelvin', 'mole', 'candela', 'liter'].sort());
const derivedUnits = convertToDict(['radian', 'newton', 'pascal', 'joule',
                                    'watt', 'coulomb', 'volt', 'farad', 'ohm',
                                    'tesla', 'celsius', 'hour', 'minute'].sort());

const customaryLength = convertToDict(['inch', 'foot', 'yard', 'mile'].sort())
const customaryArea = convertToDict(['acre'].sort())
const customaryMass = convertToDict(['ounce', 'pound', 'ton',].sort())
const customaryVolume = convertToDict(['teaspoon', 'tablespoon', 'fluid ounce',
                                       'cup', 'pint', 'quart', 'gallon', ].sort())

const options = [
  {
    value: 'none',
    label: 'None',
    isParent: false,
  },
  {
    value: 'metricUnits',
    label: 'Metric Units',
    isParent: true,
    children: [
      ...metricUnits
    ],
  },
  {
    value: 'derivedUnits',
    label: 'Derived SI Units',
    isParent: true,
    children: [
      ...derivedUnits
    ],
  },
  {
    value: 'customaryUnits',
    label: 'Customary Units',
    isParent: true,
    children: [
      {
        value: 'customaryArea',
        label: 'Area',
        isParent: true,
        children: [
          ...customaryArea
        ],
      },
      {
        value: 'customaryMass',
        label: 'Mass',
        isParent: true,
        children: [
          ...customaryMass
        ],
      },
      {
        value: 'customaryLength',
        label: 'Length',
        isParent: true,
        children: [
          ...customaryLength
        ],
      },
      {
        value: 'customaryVolume',
        label: 'Volume',
        isParent: true,
        children: [
          ...customaryVolume
        ],
      },
    ],
  },
];

const displayRender = (labels, selectedOptions) => labels.map((label, i) => {
  const option = selectedOptions[i];
  if (! option.isParent){
      return <span key={option.value}>{label}</span>;
    }
});

class VariablePicker extends Component {
  state = {
    isMetric: true
  };
  render() {
    return (
      <div>
        <div className={ 'variable-label' } >Unit:</div>
        <Cascader
          size={'small'}
          options={options}
          placeholder="Please select"
          displayRender={displayRender}
          onChange={value => this.props.onChange(value) }
          style={{ width: '50%', marginTop: '5%', marginLeft: '3%' }} />
        <br />
        <div className={ 'variable-label' } style={{ width: '135px' }}>Metric Prefixes:</div>
        <Switch size="small" checked={this.state.isMetric} />
      </div>
    )
  };
}

export default VariablePicker;
