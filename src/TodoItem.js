import React from 'react';
import {connect} from 'react-redux';

const ENTER = 13;
const ESCAPE = 27;

class TodoItem extends React.Component {

    todo = this.props.todo;

    constructor(props){
        super(props);
        this.state = {title: this.todo.title};
    }

    //Handlers
    handleChangeCheckbox(e){
        this.props.dispatch({
            type: 'TOGGLE_TODO',
            id: this.todo.id
        });
    }
    handleClickDelete(e){
        this.props.dispatch({
            type: 'DELETE_TODO',
            id: this.todo.id
        });
    }
    handleDoubleClickView(e){
        this.props.dispatch({
            type: 'SET_WHOS_EDITING',
            id: this.todo.id
        });
    }
    handleChangeInput(e){
        this.setState({title: e.target.value});
    }
    handleBlurInput(e){
        this.cancelSumbit();
    }
    handleKeyDownInput(e){
        switch (e.keyCode) {
            case ENTER:
                this.props.dispatch({
                    type: 'UPDATE_TODO',
                    id: this.todo.id,
                    title: this.state.title
                });
                this.props.dispatch({
                    type: 'SET_WHOS_EDITING',
                    id: null
                });
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
        if(this.isEditing()){
            var index = this.textInput.value.length;
            this.textInput.focus();
            this.textInput.setSelectionRange(index, index);
        }
    }

    //Custom
    cancelSumbit(){
        this.setState({title: this.todo.title});
        this.props.dispatch({
            type: 'SET_WHOS_EDITING',
            id: null
        });
    }
    isEditing(){
        return this.props.whosEditing === this.todo.id;
    }

    render(){
        const isEditing = this.isEditing();
        const todo = this.props.todo;

        return (
            <li className={"li " + (todo.completed ? "completed":"")}>
                <div className="li-item checkbox"><label className="fill" htmlFor={todo.id}><input type="checkbox" id={todo.id} value="on" checked={todo.completed}  onChange={this.handleChangeCheckbox.bind(this)}/></label></div>
                {isEditing?
                    <div className="li-item view"><input ref={(input) => { this.textInput = input; }} className="fill todo-input input-update" type="text" value={this.state.title} onKeyDown={this.handleKeyDownInput.bind(this)} onChange={this.handleChangeInput.bind(this)} onBlur={this.handleBlurInput.bind(this)} /></div>:
                    <div className="li-item view"><label className="fill" onDoubleClick={this.handleDoubleClickView.bind(this)}>{this.state.title}</label></div>
                }
                <div className="li-item delete"><button className="fill list-button" onClick={this.handleClickDelete.bind(this)}>×</button></div>
            </li>
        );
    }
}

function mapStateToProps(state){
    return {
        whosEditing: state.whosEditing
    };
}

export default connect(mapStateToProps)(TodoItem);