import axios from "axios";
import { User } from "../interfaces/User";
import jwt_decode from "jwt-decode"

const api: string =process.env.REACT_APP_API || "";
//add new user
export const addUser = (newUser: User): Promise<any> =>
  axios.post(`${api}register`, newUser);
  //check user-login
export const checkUser = (user: User): Promise<any> =>
  axios.post(`${api}login`, user);

//get all users
export const getAllUsers = (): Promise<any> => {
  return axios.get(`${api}UserManagement`, {
    headers: { Authorization:`${localStorage.getItem("token")}` },
  });
};

//change is user admin
export const changeIsUserAdmin = (_id:string): Promise<any> => {
  return axios.put(`${api}UserManagement/${_id}`,{}, {
    headers: { Authorization:`${localStorage.getItem("token")}` },
  });
};

//check user num
export const checkUserNum = (): Promise<any> => {
  return axios.get(`${api}UserManagement/userNum`, {
    headers: { Authorization:`${localStorage.getItem("token")}` },
  });
};

//deleteUser
export const deleteUser = (_id:string): Promise<any> =>{
  return  axios.delete(`${api}UserManagement/${_id}`, {
    headers: { Authorization: `${localStorage.getItem("token")}` },
  })};


  //get payload from token
  export const getIsAdmin=()=>{
    if (localStorage.getItem("token")) {
       return (jwt_decode(localStorage.getItem('token') as string) as any).isAdmin;
    } else {
      return false
    }
   
  }