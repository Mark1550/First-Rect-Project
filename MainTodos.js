import { GetTodosById } from "./Utils";
import { Component } from "react";
import AddTodo from "./addTodo";
import Todo from "./Todo";
import './StyleSheet.css';

export default class MainTodos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: [],
            title: '',
            id: '',
            add: false,
            showAddTodo: false,
        }
    }
    async componentDidUpdate() {
        if ((this.props.id !== this.state.id) || this.state.add) {                         //
            const todos = await GetTodosById(this.props.id, this.props.todos)             // If the userId was changed (by choosing a different user or by adding a todo) then update the component with the correct todos.
            this.setState({ id: this.props.id, todos: todos, add: false })               //
            this.props.pressedFunc(this.props.id)                                       //
        }
    }
    addTodo = (title) => {
        this.props.addTodo(title, this.props.id)            //
        this.showAddTodo()                                 // This function is trigered by pressing the add button and it sends a new todo to the main page so it can handle it to the local array
        this.setState({ add: true })                      //  And hiding the add todo div
    }
    handleChange = (e) => this.setState({ [e.target.name]: e.target.value })//handling the input from the client
    showAddTodo = () => this.setState((prevState) => ({ showAddTodo: !prevState.showAddTodo }))//toggling the visibility of the todos divs
    render() {
        const todosMapper = this.state.todos.map((todo, index) => <Todo key={index} todo={todo} completeTodo={this.props.callback} />)
        return (<div style={{ display: this.props.visibility ? 'block' : 'none' }} className='MainTodosDiv' >
            <div style={{ display: this.state.showAddTodo ? 'none' : 'block' }} className="todosTitle">Todos: User {this.props.id}<input value='Add' className='addTodo' onClick={this.showAddTodo} type='button' /></div>
            <div style={{ display: this.state.showAddTodo ? 'none' : 'block' }} className='todosDiv' >{todosMapper}</div>
            <AddTodo id={this.props.id} showAddTodo={this.state.showAddTodo} hide={this.showAddTodo} addTodo={this.addTodo}/>
        </div>)
    }
}