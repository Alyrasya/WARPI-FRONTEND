 import {http} from "#/utils/http";
 import useSWR from "swr";
 import qs from "qs";

 export interface GetAllProduct {
    page: number;
    page_size: number;
    product_name?: string;
    category_name?: string;
 }

 const url = {
    getAllProduct(params: GetAllProduct){
        return `/product/getAll?${qs.stringify(params)}`;
    },

    getByIdProduct(id: string){
        return`/product/${id}/getById`;
    },

    createProduct(){
        return `/product/create`;
    },

    updateProduct(id: string){
        return `/product/${id}/edit`
    }

 }

 const hooks = {
    useGetAllProduct(params: GetAllProduct){
        return useSWR(url.getAllProduct(params), http.fetcher);
    },

    useGetByIdProduct(id:string){
        return useSWR(url.getByIdProduct(id), http.fetcher);
    }
 }

 const api = {
    async createProduct(data: any){
        const response = await http.post(url.createProduct()).send(data);
        return response;
    },

    async updateProduct(id: string, data: any){
        const response = await http.put(url.updateProduct(id)).send(data);
        return response;
    }

    
 }

 export const productRepository = {
	url, hooks, api
 }