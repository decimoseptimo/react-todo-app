/* eslint import/no-webpack-loader-syntax: off */
/* global app */
import 'script-loader!./utils.js';
import 'script-loader!./todoModel.js';

import React from 'react';
import ReactDOM from 'react-dom';
import Todo from './Todo';
import registerServiceWorker from './registerServiceWorker';

var model = new app.TodoModel('react-todos');
// console.log(model);

ReactDOM.render(<Todo model={model} />, document.getElementById('root'));
registerServiceWorker();
