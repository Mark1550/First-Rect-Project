import { Component } from "react";
import './StyleSheet.css';

export default class AddUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            show: ''
        }
    }

    Add = () => {                                                          //Adding new user Func.
        const newUser = { name: this.state.name, email: this.state.email }//Creating new object to sent to main page.
        this.props.callback2()                                           //Clossing the "add user" componnent.
        this.props.callback1(newUser)                                   //Sending the new object to main page.
    }                                                                  //

    componentDidUpdate() {
        if (this.state.show !== this.props.show)
            this.setState({ show: this.props.show })          // Changing the fisibility of the component.
    }

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value })//Handling the inputs from the client.
    Cancel = () => this.props.callback2()//Clossin the "add user" component when cancel button is pressed.

    render() {
        return (<div className={this.state.show}><br />
            Name: <input className="nameinput" name='name' onChange={this.handleChange} type='text' /><br /><br />
            Email: <input className="nameinput" name='email' onChange={this.handleChange} type='text' /><br /><br />
            <button className="addUserBtns" onClick={this.Cancel}>Cancel</button>
            <button className="addUserBtns" onClick={this.Add}>Add</button>
        </div>)
    }
}