import { getPostsByUserID } from "./DALposts";
import { getTodosByUserID } from "./DALtodos";
import { getAllUsers, getUserByID } from "./DALusers";

const GetAllUsers = () => getAllUsers()//getting all users.
const GetUserByID = (id, UserArr) => getUserByID(id, UserArr)//get user by id.
const GetUsersTodos = (id, todosArr) => getTodosByUserID(id, todosArr)//get user's todos by it's ID.
const GetUsersPosts = (id, postsArr) => getPostsByUserID(id, postsArr)//get user's posts by it's ID.
const CheckIfCompleted = async (user, todosArr) => { //This function checks if all of the todos of the user are completed.
    const todos = await GetUsersTodos(user.id, todosArr)
    let check = true
    if (todos.length === 0)
        return false
    todos.forEach(todo => {
        if (!todo.completed)
            check = false
    });
    return check
}
const Search = async (str, users) => {// This function is searching for the clients input in all the names and email in the users data.
    const string = str.toUpperCase()
    return users.filter((user) => ((user.name.toUpperCase().includes(string)) || (user.email.toUpperCase().includes(string))));
}
const getAddress = async (id, usersArray) => { //This function gets the user's address.
    const user = await GetUserByID(id, usersArray);
    return user.address;
}
const UpdateUser = (usersArr, NewUser) => { //This function updates the user in the local array.
    const index = usersArr.findIndex((user) => user.id === NewUser.id)
    usersArr.splice(index, 1, NewUser)
    return usersArr
}
const AddNewUser = (newUser, usersArr) => {//This function adding the new user to the local array and generates for it a new id.
    const lastId = usersArr[usersArr.length - 1].id
    const user = { id: lastId + 1, ...newUser, address: { street: '', city: '', zipcode: '' } }
    const newArray = [...usersArr, user]
    return newArray
}
const DeleteUser = (id, usersArr) => {// This function deletes a user from the local array.
    const userIndex = usersArr.findIndex((user) => user.id === id);
    usersArr.splice(userIndex, 1);
    return usersArr;
}
const GetTodosById = async (id, todosArr) => { //This function gets the todos of a specific user.
    const todos = await GetUsersTodos(id, todosArr)
    return todos
}
const GetPostsById = async (id, postsArr) => { //This function gets the posts of a specific user.
    const posts = await GetUsersPosts(id, postsArr)
    return posts
}
const CompleteTodo = (id, todosArr) => { // This function completes a todo and updates it in the local array.
    const todo = todosArr.filter((todo) => todo.id === id)
    const index = todosArr.findIndex((todo) => todo.id === id)
    let Finaltodo = todo[0]
    Finaltodo.completed = true
    todosArr.splice(index, 1, Finaltodo)
    return todosArr;
}
const AddPost = (title, body, userId, postsArr) => { // This function adding a post to the local array and generates for it an ID
    let arr = postsArr.filter((post) => post.userId === userId)
    let finalIndex = arr[arr.length - 1].id + 1;
    const newPost = { title: title, body: body, userId: userId }
    postsArr.splice(finalIndex, 0, newPost)
    return postsArr;
}
const AddTodo = (title, userId, todosArr) => { // This function adding a todo to the local array and generates for it an ID
    let arr = todosArr.filter((todo) => todo.userId === userId)
    let finalIndex = arr[arr.length - 1].id;
    console.log(finalIndex);
    const newTodo = { userId: userId, id: finalIndex+1, title: title, completed: false }
    todosArr.splice(finalIndex, 0, newTodo)
    console.log(todosArr);
    return todosArr;
}

export {
    GetAllUsers,
    GetUserByID,
    CheckIfCompleted,
    Search,
    getAddress,
    UpdateUser,
    AddNewUser,
    DeleteUser,
    GetTodosById,
    GetPostsById,
    CompleteTodo,
    AddPost,
    AddTodo
} 