import { CheckIfCompleted } from "./Utils";
import { Component } from "react";
import OtherData from "./OtherDatComp";
import './StyleSheet.css';

export default class UserComp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            id: '',
            completed: false,
            showOther: false,
            pressed: false,
            address: {},
            user:{}
        }
    }

    componentDidMount() {
        const user = { ...this.props.user }                                            //
        this.setState({ user: user, id: user.id, name: user.name, email: user.email })// The component is loading the data of the user when it mounts.
    }                                                                                //

    async componentDidUpdate() {
        const tempBool = await CheckIfCompleted(this.state.user, this.props.todosArr)
        if (this.state.completed !== tempBool)// Checking if all the task are completed to color the border of the user div.
            this.setState({ completed: tempBool })
        if ((this.state.id !== this.props.user.id))// Refreshing the data if the userId was changed.
            this.setState({ name: this.props.user.name, email: this.props.user.email, id: this.props.user.id })
        if ((this.props.pressed === this.state.user.id) && !this.state.pressed) //Checking if the ID label was pressed so it will color the user div in orange.
            this.setState({ pressed: true })
        else if ((this.props.pressed !== this.state.user.id) && this.state.pressed) //Checking if the ID label isn't pressed so it will color the user div back to light blue.
            this.setState({ pressed: false })
    }

    handleUpdate = () => {
        const user = { ...this.state.user, address: this.state.address, name: this.state.name, email: this.state.email }
        this.props.callBack(user)// Sending a user to update in the main page.
    }                   

    showTodosAndPosts = () => {
        this.props.callback2(this.state.id)//Sending the ID to the main page so the correct todos & posts will be shown.
        this.props.show()                  //triggering the function in the main page that showing the todos & posts.
    }

    getOtherData = (obj) => this.setState({ address: obj }) // This function gets the address from the otherData component and saves it to the state.
    handleDelete = () => this.props.deleteFunc(this.props.user.id)// This function sending the id of the user that the client want to delete.
    handleChange = (e) => this.setState({ [e.target.name]: e.target.value, mountOrDelete: false })// Handling clients inputs.
    showOther = () => this.setState({ showOther: true })//Showing other data
    hideOther = () => this.setState({ showOther: false })//Hiding other data

    render() {
        return (<div className={this.state.completed ? "userComplitedDiv" : "userUnComplitedDiv"} style={{ backgroundColor: this.state.pressed ? '#f9b494' : null }}>
            <h2 className="IdTitle" onClick={this.showTodosAndPosts}>ID:{this.props.user.id}</h2>
            Name: <input className="nameinput" type='text' name='name' value={this.state.name} onChange={this.handleChange} /><br />
            Email: <input className="emailinput" type='text' name='email' value={this.state.email} onChange={this.handleChange} /><br />
            <button className="otherDataBtn" onMouseOver={this.showOther} onClick={this.hideOther}>Other Data</button>
            <OtherData id={this.props.user.id} show={this.state.showOther} callBack={this.getOtherData} userArray={this.props.usersArray} />
            <button className="updateAndDelteBtn" onClick={this.handleUpdate}>Update</button>
            <button className="updateAndDelteBtn" onClick={this.handleDelete}>Delete</button>
        </div>)
    }
}
