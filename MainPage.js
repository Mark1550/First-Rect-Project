import { AddNewUser, AddPost, AddTodo, CompleteTodo, DeleteUser, GetAllUsers, Search, UpdateUser } from "./Utils";
import { Component } from "react";
import { getAllTodos } from "./DALtodos";
import { getAllPosts } from "./DALposts";
import UserComp from "./userComp";
import AddUser from "./AddUserComp";
import MainTodos from "./MainTodos";
import MainPosts from "./MainPosts";
import './StyleSheet.css';

export default class Users extends Component {
    constructor() {
        super()
        this.state = {
            users: [],
            todos: [],
            posts: [],
            userSearch: [],
            usersAfterDelete: [],
            todosAndPostsVis: false,
            AddUserDisplay: false,
            todosAndPostsId: '',
            searchInput: '',
            pressed: ''
        }
    }

    async componentDidMount() {
        const users = await GetAllUsers()                                                            //
        const todos = await getAllTodos()                                                           //
        const posts = await getAllPosts()                                                          // When the main page loads('mounting') it will get all
        this.setState({ users: users, userSearch: users, todos: todos, posts: posts, search: '' })//  the API's data and save in to state.
    }                                                                                            //

    handleChange = async (e) => {                                  //
        const { value } = e.target;                               //
        const users = await Search(value, this.state.users)      // Handleing the input from the client in the search box and using the Search 
        this.setState({ userSearch: users, searchInput: value })//  function from the utils to find the corresponding users and presents them.
    }                                                          //

    handleDelete = (id) => {
        const newArray = DeleteUser(id, this.state.userSearch)   //
        this.setState({ userSearch: newArray, users: newArray })// the function getting the userId of the user that the client want to delete, 
        if (id === this.state.todosAndPostsId)                 //  deletes it with a function from the utils, and if the user's todos & posts
            this.setState({ todosAndPostsVis: false })        //   where open then it will close it.
    }                                                        //   

    handleUpdate = (obj) => {
        const UpdatedUsers = UpdateUser(this.state.userSearch, obj)      //
        this.setState({ userSearch: UpdatedUsers, users: UpdatedUsers })// This function updates a user in the local Array using a function from the utils.
    }                                                                  //

    addUser = async (obj) => {                                                //
        let newusersArr = AddNewUser(obj, this.state.users)                  //
        const userSearch = await Search(this.state.searchInput, newusersArr)// This function adding a user to the local array by using a function from the utils,
        this.setState({ users: newusersArr, userSearch: userSearch })      //  and using the search function again to prevent problems if you adding a user while searching.
    }                                                                     //

    showTDandPsts = (id) => {
        this.hideAddUser()                     //
        this.setState({ todosAndPostsId: id })// This function hides "add User" componnent and show the todos & posts component
    }                                        //

    completeTodo = (id) => {
        const todos = CompleteTodo(id, this.state.todos) //
        this.setState({ todos: todos })                 // This function changing the value of a individual todo from false to true by using a function from the utils.
    }                                                  //

    pressHendler = (id) => {           //
        this.setState({ pressed: id })// This funciton saves the id of the pressed user so only the corresponding user component will be colored orange.
    }                                //

    addTodo = (title, userId) => {                              //
        const newArr = AddTodo(title, userId, this.state.todos)// This function is adding todo to the local array by using a function from the utils.
        this.setState({ todos: newArr })                      //
    }

    addPost = (title, body, userId) => {                              //
        const newArr = AddPost(title, body, userId, this.state.posts)// This function is adding post to the local array by using a function from the utils.
        this.setState({ posts: newArr })                            //
    }

    changeDisplay = () => this.setState((prevState) => ({ AddUserDisplay: !prevState.AddUserDisplay, todosAndPostsVis: false, pressed: '' }))// This function is toggling betwing true & false for the button add at the top of the screen so in will show or hide the "add user" component.
    showTodosAndPosts = () => this.setState({ todosAndPostsVis: true }) // This function is changing the state of the todos & posts component to visible and it's trigered by pressing on the id label in the user component.
    hideAddUser = () => this.setState({ AddUserDisplay: false })// This function hides the "add user" component
    render() {
        const usersComps = this.state.userSearch.map((user, index) => { // This map function renders all the 'user' components with their data.
            return (<UserComp show={this.showTodosAndPosts} pressed={this.state.pressed} todosArr={this.state.todos} deleteFunc={this.handleDelete} callBack={this.handleUpdate} callback2={this.showTDandPsts} key={index} user={user} usersArray={this.state.userSearch} />)
        })
        return (<div className="mainDiv"><br />
            Search: <input className="searchBox" type='text' onChange={this.handleChange} /><button className="addbtn" onClick={this.changeDisplay}>Add</button><br /><br />
            {usersComps}
            <AddUser show={this.state.AddUserDisplay ? 'showAddUser' : 'hideAddUser'} callback1={this.addUser} callback2={this.hideAddUser} />
            <MainTodos addTodo={this.addTodo} visibility={this.state.todosAndPostsVis} pressedFunc={this.pressHendler} callback={this.completeTodo} id={this.state.todosAndPostsId} todos={this.state.todos} />
            <MainPosts addPost={this.addPost} visibility={this.state.todosAndPostsVis} pressedFunc={this.pressHendler} id={this.state.todosAndPostsId} posts={this.state.posts} />
        </div>)
    }
}