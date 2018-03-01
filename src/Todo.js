import React from 'react';
// import logo from './logo.svg';
import './Todo.css';
import TodoItem from './TodoItem';
import {Link} from 'react-router-dom';

const ENTER = 13;
const ESCAPE = 27;

export default class Todo extends React.Component {

    model = this.props.model;
    static ALL_TODOS = "all todos";
    static COMPLETED_TODOS = "completed todos";
    static PENDING_TODOS ="pending todos";

    constructor(props){
        super(props);
        this.state = {todos: this.model.todos, whosEditing: null};
    }

    //Handlers
    handleKeyDownInput(e){
        switch (e.keyCode){
            case ENTER:
                this.model.addTodo(e.target.value);
                this.setState({todos: this.model.todos});
                e.target.value='';
                break;
            case ESCAPE:
                e.target.value='';
                break;
            default:
                break;
        }
    }
    handleChangeCheckbox(todo){
        this.model.toggle(todo);
        this.setState({todos: this.model.todos});
    }
    handleDoubleClickView(todo){
        this.setState({whosEditing: todo});
    }
    handleClickDelete(todo){
        this.model.destroy(todo);
        this.setState({todos: this.model.todos});
    }
    handleTodoUpdate(todo, title){
        this.model.save(todo, title);
        this.setState({todos: this.model.todos});
    }
    handleClickDeleteShown(shownTodosModel, e){
        e.preventDefault();
        shownTodosModel.forEach((todo)=>{
            this.model.destroy(todo);
        });
        this.setState({todos: this.model.todos});
    }

    //Custom
    getCompletedTodos(){
        return this.state.todos.filter(todo=>todo.completed);
    }
    getPendingTodos(){
        return this.state.todos.filter(todo=>!todo.completed);
    }
    isShown(shownTodos){
        return this.props.shownTodos === shownTodos;
    }

    render() {
        var todos = this.state.todos;
        var shownTodosModel;

        switch (this.props.shownTodos){
            case Todo.PENDING_TODOS:
                shownTodosModel = this.getPendingTodos();
                break;
            case Todo.COMPLETED_TODOS:
                shownTodosModel = this.getCompletedTodos();
                break;
            default:
                shownTodosModel = todos;
        }
        return (
            <div className="todo">
                <h2 className="todo-title">TODO APP<img src="/" alt="" />{/* img is a fix for a background-color bug: https://github.com/facebook/create-react-app/issues/4032 */}</h2>
                <div className="todo-wrapper">
                    <input className="todo-input input-create" type="text" placeholder="Add Todo Here" onKeyDown={this.handleKeyDownInput.bind(this)}/>
                    <ul className="todo-list">
                        {shownTodosModel.map((todo) => {
                            return <TodoItem key={todo.id} todo={todo} onClickDelete={this.handleClickDelete.bind(this, todo)} onDoubleClickView={this.handleDoubleClickView.bind(this)} onChangeCheckbox={this.handleChangeCheckbox.bind(this, todo)} onTodoUpdate={this.handleTodoUpdate.bind(this, todo)} isEditing={this.state.whosEditing === todo} />
                        })}
                    </ul>
                    <div className="todo-menu">
                        <button className={`simple-button ${this.isShown(Todo.ALL_TODOS) ? 'active':''}`}><Link to="/">All ({todos.length})</Link></button>
                        <button className={`simple-button ${this.isShown(Todo.PENDING_TODOS) ? 'active':''}`}><Link to="/pending">Pending ({this.getPendingTodos().length})</Link></button>
                        <button className={`simple-button ${this.isShown(Todo.COMPLETED_TODOS) ? 'active':''}`}><Link to="/completed">Completed ({this.getCompletedTodos().length})</Link></button>
                        <a href="" className="link1" onClick={this.handleClickDeleteShown.bind(this, shownTodosModel)} >delete<br/>shown</a>
                    </div>
                </div>
                <div className="todo-legend">Instructions: [Double-click] to edit, [Enter] to submit, [Esc] to cancel. [Click ×] to delete.</div>
            </div>
        );
    }
}

// export default App;