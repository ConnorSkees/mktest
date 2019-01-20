import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import QuestionInput from './components/QuestionInput';
import * as serviceWorker from './serviceWorker';
import { Card } from 'antd';

import 'antd/dist/antd.css';

// TODO: name+object(s) input that draw from a list of names+objects. can be specific or random

const mountNode = document.getElementById('root');

ReactDOM.render(
  (
    <Card
      title="Questions"
      extra={<a href="#">Actions</a>}
      style={{ width: 300, marginLeft: 'auto', marginRight: 'auto' }}
    >
      <QuestionInput />
    </Card>

  ), mountNode);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
