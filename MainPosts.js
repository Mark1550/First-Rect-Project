import { GetPostsById } from "./Utils";
import { Component } from "react";
import AddPost from "./addPost";
import Post from "./Post";
import './StyleSheet.css';

export default class MainPosts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            PostTitle: '',
            body: '',
            id: '',
            add: false,
            showAddPost: false
        }
    }
    async componentDidUpdate() {
        if ((this.props.id !== this.state.id) || this.state.add) {                         //
            const posts = await GetPostsById(this.props.id, this.props.posts)             // If the userId was changed (by choosing a different user or by adding a post) then update the component with the correct posts.
            this.setState({ id: this.props.id, posts: posts, add: false })               //
            this.props.pressedFunc(this.props.id)                                       //
        }
    }
    addPost = (title, body) => {
        this.props.addPost(title, body, this.props.id)                            //
        this.setState({ add: true })                                             // This function is trigered by pressing the add button and it sends a new post to the main page so it can handle it to the local array
        this.showAddPost()                                                      //  And hidding the add post div
    }
    showAddPost = () => this.setState((prevState) => ({ showAddPost: !prevState.showAddPost }))//toggling the visibility of the post divs
    handleChange = (e) => this.setState({ [e.target.name]: e.target.value })//handling the input from the client
    render() {
        const postsMapper = this.state.posts.map((post, index) => <Post key={index} post={post} />)
        return (<div style={{ display: this.props.visibility ? 'block' : 'none' }} className='MainPostsDiv' >
            <div style={{ display: !this.state.showAddPost ? 'block' : 'none' }} className="PostsTitle">Posts: User {this.props.id} <input value='Add' className='addTodo' onClick={this.showAddPost} type='button' /></div>
            <div style={{ display: this.state.showAddPost ? 'none' : 'block' }} className='postsDiv' >{postsMapper}  </div>
            <AddPost id={this.props.id} showAddPost={this.state.showAddPost} hide={this.showAddPost} addPost={this.addPost} />
        </div>)
    }
}