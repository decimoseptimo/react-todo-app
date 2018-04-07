import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import Todo from './Todo';
import registerServiceWorker from './registerServiceWorker';

const reducer = combineReducers({
    whosEditing,
    todos
});

var store = createStore(reducer);

//Reducers
function whosEditing(state=null, action){
    switch (action.type){
        case 'SET_WHOS_EDITING':
            return action.id;
        default:
            return state;
    }
}
function todos(state=[], action){
    switch (action.type){
        case 'ADD_TODO':
            return [...state, {
                id: action.id,
                title: action.title,
                completed: false
            }];
        case 'TOGGLE_TODO':
            return state.map((todo)=>{
                if(todo.id === action.id){
                    return {...todo, completed: !todo.completed}
                }
                return todo;
            });
        case 'UPDATE_TODO':
            return state.map((todo)=>{
                if(todo.id === action.id){
                    return {...todo, title: action.title}
                }
                return todo;
            });
        case 'DELETE_TODO':
            return state.filter((todo)=>{
                return todo.id !== action.id;
            });
        case 'DELETE_SHOWN_TODOS':
            switch (action.matchUrl){
                case '/pending':
                    return state.filter(todo=>todo.completed);
                case '/completed':
                    return state.filter(todo=>!todo.completed);
                default:
                    return [];
            }
        default:
            return state;
    }
}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Route path="/:filter?" component={Todo} />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();