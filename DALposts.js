import axios from "axios";
const url = 'http://jsonplaceholder.typicode.com/posts'
const getAllPosts = async () => (await axios.get(url)).data
const getPostsByUserID = async (id, postsArr) => {
    const posts = postsArr.filter((post) => post.userId === id)
    return posts
}
export { getAllPosts, getPostsByUserID}

//All the basic function for the posts API.