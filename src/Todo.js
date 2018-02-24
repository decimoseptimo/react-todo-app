import React from 'react';
// import logo from './logo.svg';
import './Todo.css';
import TodoItem from './TodoItem';

const ENTER =13 ;
const ESCAPE = 27;

export default class Todo extends React.Component {

    model = this.props.model;

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

    //Custom
    getCompletedTodos(){
        return this.state.todos.filter(todo=>todo.completed);
    }

    Lifecycle
    componentDidUpdate(){
        // console.log('up!');
    }

    render() {
        var todos = this.state.todos;
        return (
            <div className="todo">
                <h2 className="todo-title">TODO APP<img src="/" alt="" /></h2>
                <div className="todo-wrapper">
                    <input className="todo-input input-create" type="text" placeholder="Add Todo Here" onKeyDown={this.handleKeyDownInput.bind(this)}/>
                    <ul className="todo-list">
                        {todos.map((todo) => {
                            return <TodoItem key={todo.id} todo={todo} onClickDelete={this.handleClickDelete.bind(this)} onDoubleClickView={this.handleDoubleClickView.bind(this)} onChangeCheckbox={this.handleChangeCheckbox.bind(this)} onTodoUpdate={this.handleTodoUpdate.bind(this)} isEditing={this.state.whosEditing === todo} />
                        })}
                    </ul>
                    <div className="todo-menu">
                        <button className="simple-button active">All ({todos.length})</button>
                        <button className="simple-button">Pending ({todos.length - this.getCompletedTodos().length})</button>
                        <button className="simple-button">Completed ({this.getCompletedTodos().length})</button>
                    </div>
                </div>
                <div className="todo-legend">Instructions: [Double-click] to edit, [Enter] to submit, [Esc] to cancel. [Click ×] to delete.</div>
            </div>
        );
    }
}

// export default App;