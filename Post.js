import { Component } from "react";
import './StyleSheet.css';

export default class Post extends Component {
    render() {//Rendering all the seperate posts
        return (<div className="seperatePost">
            <div className="postTitle">Title: {this.props.post.title}</div> 
            <div className="PostBody">Body: {this.props.post.body}</div>
        </div>)
    }
}