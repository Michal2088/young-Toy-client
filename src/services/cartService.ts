import axios from "axios";
import { Product } from "../interfaces/Product";
const api: string = process.env.REACT_APP_API || "";
const _ = require("lodash")

//add product to cart
export const addProductToCart = (product: Product): Promise<any> =>{
  let body=_.omit(product,["_id","__v",])
   return axios.post(`${api}cart`, body ,{
    headers: { Authorization: `${localStorage.getItem("token")}` },
  });
}


//delete product from cart
export const deleteProductFromCart = (index:number): Promise<any> =>{
  return axios.delete(`${api}cart/${index}`, {
   headers: { Authorization: `${localStorage.getItem("token")}` },
 });
}


//get all product in the cart
export const ProductInCart = (): Promise<any> =>
 axios.get(`${api}cart`, {
   headers: { Authorization: `${localStorage.getItem("token")}` },
 });