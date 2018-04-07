import React from 'react';
// import logo from './logo.svg';
import './Todo.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import TodoItem from './TodoItem';
import uuidv4 from 'uuid/v4';

const ENTER = 13;
const ESCAPE = 27;

class Todo extends React.Component {

    constructor(props){
        super(props);
    }

    //Handlers
    handleKeyDownInput(e) {
        switch (e.keyCode) {
            case ENTER:
                this.props.dispatch({
                    type: 'ADD_TODO',
                    id: uuidv4(),
                    title: e.target.value,
                });
                e.target.value = '';
                break;
            case ESCAPE:
                e.target.value = '';
                break;
            default:
                break;
        }
    }
    handleClickDeleteShown(shownTodos, e){
        e.preventDefault();
        this.props.dispatch({
            type: 'DELETE_SHOWN_TODOS',
            matchUrl: this.props.match.url
        });
    }

    //Custom
    getPendingTodos(){
        return this.props.todos.filter(todo=>!todo.completed);
    }
    getCompletedTodos(){
        return this.props.todos.filter(todo=>todo.completed);
    }
    getShownTodos(matchUrl){
        switch (matchUrl){
            case '/':
                return this.props.todos;
            case '/pending':
                return this.getPendingTodos();
            case '/completed':
                return this.getCompletedTodos();
            default:
                throw new Error(`Unknown filter: ${this.props.match.params.filter}`);
        }
    }
    isRoute(matchUrl){
        return matchUrl === this.props.match.url;
    }

    render() {
        var todos = this.props.todos;
        var shownTodos = this.getShownTodos(this.props.match.url);

        return (
            <div className="todo">
                <h2 className="todo-title">TODO APP<img src="/" alt="" />{/* img is a fix for a background-color bug: https://github.com/facebook/create-react-app/issues/4032 */}</h2>
                <div className="todo-wrapper">
                    <input className="todo-input input-create" type="text" placeholder="Add Todo Here" onKeyDown={this.handleKeyDownInput.bind(this)}/>
                    <ul className="todo-list">
                        {shownTodos.map((todo) => {
                            return <TodoItem key={todo.id} todo={todo} />
                        })}
                    </ul>
                    <div className="todo-menu">
                        <button className={`simple-button ${this.isRoute('/') ? 'active':''}`}><Link to="/">All ({todos.length})</Link></button>
                        <button className={`simple-button ${this.isRoute('/pending') ? 'active':''}`}><Link to="/pending">Pending ({this.getPendingTodos().length})</Link></button>
                        <button className={`simple-button ${this.isRoute('/completed') ? 'active':''}`}><Link to="/completed">Completed ({this.getCompletedTodos().length})</Link></button>
                        <a href="" className="link1" onClick={this.handleClickDeleteShown.bind(this, shownTodos)} >delete<br/>shown</a>
                    </div>
                </div>
                <div className="todo-legend">Instructions: [Double-click] to edit, [Enter] to submit, [Esc] to cancel. [Click ×] to delete.</div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return { todos: state.todos };
}

// function mapDispatchToProps(dispatch){
//     return {dispatch};
// }

export default connect(mapStateToProps, /*mapDispatchToProps*/)(Todo);