import axios from "axios";
export const loginApi = async (userData) => {

    const res = await axios.post('http://localhost:5000/api/login', userData);

    return res;

}