import axios from "axios";
const url = 'http://jsonplaceholder.typicode.com/users'
const getAllUsers = async () => (await axios.get(url)).data
const getUserByID = async (id, UserArr) => {
    const user = UserArr.filter((user) => user.id === id)
    return user[0]
}
export { getAllUsers, getUserByID }

//All the basic function for the users API.