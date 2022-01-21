import axios from "axios";
const url = 'http://jsonplaceholder.typicode.com/todos'
const getAllTodos = async () => (await axios.get(url)).data
const getTodosByUserID = async (id, todosArr) => {
    const todos = todosArr.filter((todo) => todo.userId === id)
    return todos
}
export { getAllTodos, getTodosByUserID}

//All the basic function for the todos API.