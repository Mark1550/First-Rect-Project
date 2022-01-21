import { Component } from "react";
import './StyleSheet.css';

export default class AddTodo extends Component {
    constructor() {
        super()
        this.state = {
            title: ''
        }
    }
    addTodo = () => {
        this.props.addTodo(this.state.title)//This function sends the new todo's data to the mainTodos component.
    }
    
    handleChange = (e) => this.setState({ [e.target.name]: e.target.value })//handling the input from the client
    render() {
        return (<div className="AddTodoOuterDiv" style={{ display: this.props.showAddTodo ? 'block' : 'none' }}>
            <div className="AddTodoTitle" style={{ display: this.props.showAddTodo ? 'block' : 'none' }}>New Todo - User: {this.props.id}</div>
            <div className="AddTodoInnerDiv">
                Title:<input type='text' name="title" onChange={this.handleChange} /><br />
                <input className="addTodoBtns" type='button' onClick={this.props.hide} value='Cancel' />
                <input className="addTodoBtns" type='button' onClick={this.addTodo} value='Add' />
            </div>
        </div>)
    }
}