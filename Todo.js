import { Component } from "react";
import './StyleSheet.css';

export default class Todo extends Component {
    render() {//Rendering all the seperate todos.
        return (<div className="seperateTodo">
            <div className="todoTitle"> Title: {this.props.todo.title}</div>
            <div className="todoComp"> Completed: {this.props.todo.completed ? 'true' : 'false'}<input className="MarkCompBtn" onClick={() => this.props.completeTodo(this.props.todo.id)} style={{ visibility: this.props.todo.completed ? 'hidden' : 'visible' }} type='button' value='Mark Completed' /></div>
        </div>)
    }
}