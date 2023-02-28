import axios from "axios";
import { UserMessage } from "../interfaces/UserMessage";

const api =process.env.REACT_APP_API || "";

//contact us
export const addUserMessage = (userMessage:UserMessage): Promise<any> =>{
return axios.post(`${api}MessagesFromUsers`, userMessage)}

//get all message
export const getAllUsersMessages = (): Promise<any> => {
    return axios.get(`${api}MessagesFromUsers`, {
      headers: { Authorization:`${localStorage.getItem("token")}` },
    });
  };

  //change if user message already been read
export const changeIfUserMessageAlreadyBeenRead = (_id:string): Promise<any> => {
    return axios.put(`${api}MessagesFromUsers/${_id}`,{}, {
      headers: { Authorization:`${localStorage.getItem("token")}` },
    });
  };
  


