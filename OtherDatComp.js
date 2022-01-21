import { getAddress } from "./Utils";
import { Component } from "react";
import './StyleSheet.css';
export default class OtherData extends Component {
    constructor() {
        super()
        this.state = {
            id: 0,
            address: {},
            street: '',
            city: '',
            zip: '',
            change: false
        }
    }
    async componentDidMount() {                                                            //
        this.setState({ address: await getAddress(this.props.id, this.props.userArray) }) // The address is loading as soon as the component is mounted.
    }                                                                                    //
    async componentDidUpdate() {
        if (this.state.id !== this.props.id) { //If the useId was changed (if a user was deleted) then 'refresh' the page by getting the correct user address.
            this.setState({ address: await getAddress(this.props.id, this.props.userArray) }) 
            this.setState({ street: this.state.address.street, city: this.state.address.city, zip: this.state.address.zipcode, id: this.props.id })
        }
        if (this.state.change) { //If there was a change in either of the inputs then update the address by using a callback function.
            this.props.callBack({ street: this.state.street, city: this.state.city, zipcode: this.state.zip })
            this.setState({ change: false })
        }
    }
    // Handling the inputs from the client. and trigering the update in the function above.
    handleChange = (e) => this.setState({ [e.target.name]: e.target.value, change: true })

    render() {
        return (<div className={this.props.show ? 'otherDataShow' : 'otherDataHide'}>
            Street: <input className="otherDatainput" type='text' name='street' value={this.state.street} onChange={(e) => this.handleChange(e)} /><br />
            City: <input className="otherDatainput" type='text' name='city' value={this.state.city} onChange={(e) => this.handleChange(e)} /><br />
            Zip Code: <input className="otherDatainput" type='text' name='zip' value={this.state.zip} onChange={(e) => this.handleChange(e)} /><br />
        </div>)
    }
}