import React from 'react';

const ENTER = 13;
const ESCAPE = 27;

export default class TodoItem extends React.Component {

    todo = this.props.todo;

    constructor(props){
        super(props);
        this.state = {title: this.todo.title};
    }

    //Handlers
    handleChangeCheckbox(e){
        this.props.onChangeCheckbox(this.todo);

    }
    handleClickDelete(e){
        this.props.onClickDelete(this.todo);
    }
    handleDoubleClickView(e){
        this.props.onDoubleClickView(this.todo);
    }
    handleChangeInput(e){
        this.setState({title: e.target.value});
    }
    handleBlurInput(){
        this.cancelSumbit();
    }
    handleKeyDownInput(e){
        switch (e.keyCode) {
            case ENTER:
                this.props.onTodoUpdate(this.todo, this.state.title);
                this.props.onDoubleClickView(null);
                break;
            case ESCAPE:
                this.cancelSumbit();
                break;
            default:
                break;
        }
    }

    //Lifecycle
    componentDidUpdate(){
        if(this.props.isEditing){
            var index = this.textInput.value.length;
            this.textInput.focus();
            this.textInput.setSelectionRange(index, index);
        }
    }
    componentWillReceiveProps(){
        // this.todo = this.props.todo;
    }

    //Custom
    cancelSumbit(){
        this.setState({title: this.todo.title});
        this.props.onDoubleClickView(null);
    }

    render(){
        this.todo = this.props.todo;
        return (
            <li className={"li " + (this.todo.completed ? "completed":"")}>
                <div className="li-item checkbox"><label className="fill" htmlFor={this.todo.id}><input type="checkbox" id={this.todo.id} value="on" checked={this.todo.completed}  onChange={this.handleChangeCheckbox.bind(this)}/></label></div>
                {this.props.isEditing?
                    <div className="li-item view"><input ref={(input) => { this.textInput = input; }} className="fill todo-input input-update" type="text" value={this.state.title} onKeyDown={this.handleKeyDownInput.bind(this)} onChange={this.handleChangeInput.bind(this)} onBlur={this.handleBlurInput.bind(this)} /></div>:
                    <div className="li-item view"><label className="fill" onDoubleClick={this.handleDoubleClickView.bind(this)}>{this.state.title}</label></div>
                }
                <div className="li-item delete"><button className="fill list-button" onClick={this.handleClickDelete.bind(this)}>×</button></div>
            </li>
        );
    }
}