import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TestCreator from './components/TestCreator';
import * as serviceWorker from './serviceWorker';
import { Button, Card } from 'antd';

import 'antd/dist/antd.css';

// TODO: name+object(s) input that draw from a list of names+objects. can be specific or random

const mountNode = document.getElementById('root');

ReactDOM.render(
  (
    <TestCreator />
  ), mountNode);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
