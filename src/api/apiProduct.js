import {API} from '../utils/config';
import axios from 'axios';

export const getProducts = (sortBy, order, limit) => {
    return axios.get(`${API}/product?sortBy=${sortBy}&order=${order}&limit=${limit}`);
}

export const getProductById = (id) =>{
    return axios.get(`${API}/product/${id}`)
}

export const getCategories = ()=>{
    return axios.get(`${API}/category`)
}

export const getFilteredProducts = (skip, sortBy, order, limit, filters={}) =>{
    const data = {
        skip: skip,
        sortBy: sortBy,
        order: order,
        limit: limit,
        filters: filters
    }
    return axios.post(`${API}/product/filter/`,data,{
        headers:{
            'Content-Type': 'application/json'
        }
    })
}