import {http} from "#/utils/http";
import useSWR from "swr";
import qs from 'qs';

export interface GetAllCategory {
    page: number;
    page_size: number;
    category_name?: string;
}

export interface GetProductsByCategory {
    page: number;
    page_size:number;
    product_name?: string;
}

const url = {
    getAllCategory(params: GetAllCategory) {
        return `/category/getAll?${qs.stringify(params)}`;
    },

    createCategory(){
        return `/category/create`;
    },

    updateCategory(id: string){
        return `/category/${id}/edit`;
    },

    getProductsByCategory(id: string, params: GetProductsByCategory) {
        return `/category/${id}/detail?${qs.stringify(params)}`;
    },
}

const hooks = {
    useGetAllCategory(params: GetAllCategory){
        return useSWR(url.getAllCategory(params), http.fetcher);
    },

    useGetProductsByCategory(id: string, params: GetProductsByCategory){
        return useSWR(url.getProductsByCategory(id, params), http.fetcher);
    }
}

const api = {
  async createCategory(data: any){
    const response = await http.post(url.createCategory()).send(data);
    return response;
  },

  async updateCategory(id: string, data: any){
    const response = await http.put(url.updateCategory(id)).send(data);
    return response;
  }
}

export const categoryRepository = {
	url, hooks, api
}
