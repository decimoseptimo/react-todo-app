/* eslint import/no-webpack-loader-syntax: off */
/* global app */
import 'script-loader!./utils.js';
import 'script-loader!./todoModel.js';

import React from 'react';
import ReactDOM from 'react-dom';
import Todo from './Todo';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

var model = new app.TodoModel('react-todos');

ReactDOM.render(
    <BrowserRouter>
        <Switch>
        <Route exact path="/" render={()=><Todo model={model} shownTodos={Todo.ALL_TODOS} />} />
        <Route exact path="/pending" render={()=><Todo model={model} shownTodos={Todo.PENDING_TODOS} />} />
        <Route exact path="/completed" render={()=><Todo model={model} shownTodos={Todo.COMPLETED_TODOS} />} />
        <Redirect to="/"/>
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();

// Props based on url
// <Route path="/:page" children={(props)=>{
// var page = !props.match ? "/": props.match.params.showTodos;}>