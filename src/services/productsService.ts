import axios from "axios";
import { Product } from "../interfaces/Product";

const api = process.env.REACT_APP_API || "";
const _ = require("lodash");

export const getProductsOnSale = (): Promise<any> => {
  return axios.get(`${api}products/sale`);
};

export const getProductsCategory = (category: string): Promise<any> => {
  return axios.get(`${api}products/category/${category}`);
};

export const deleteProduct = (_id: string): Promise<any> => {
  return axios.delete(`${api}products/${_id}`, {
    headers: { Authorization: `${localStorage.getItem("token")}` },
  });
};

export const getProduct = (_id:string): Promise<any> =>{
  return axios.get(`${api}products/specificProduct/${_id}`, {
    headers: { Authorization: `${localStorage.getItem("token")}` },
  })};

  export const editProduct= (product:Product): Promise<any> =>{
    let body=_.omit(product,["_id"])
    return axios.put(`${api}products/${product._id}`, body, {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    });
  }

  export const addNewProduct = (newProduct: Product): Promise<any> =>
  axios.post(`${api}products`, newProduct, {
    headers: { Authorization: `${localStorage.getItem("token")}` },
  });


  