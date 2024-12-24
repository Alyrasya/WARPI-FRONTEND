import { http } from "#/utils/http";
import useSWR from "swr";
import qs from "qs";
import { createTracing } from "trace_events";

export interface GetAllTransaction {
  page: number;
  page_size: number;
  name_order: string;
  method_name: string;
  start_date: string;
  end_date: string;
}

const url = {
  getByIdTransaction(id: string) {
    return `/transaction/getById/${id}`;
  },

  createTransaction(id_user: string) {
    return `/transaction/create/${id_user}`;
  },

  getAllTransactionUser(id_user : any){
    return `/transaction/getAll/${id_user}`;
  },

  getAllTransaction(params: GetAllTransaction){   
    return `/transaction/getAll?${qs.stringify(params)}`;
  },

  getByIdDetail(id: string){
    return `/transaction/getDetail/${id}`;
  }
};

const hooks = {
  useGetAllTransactionUser(id_user: string){
      return useSWR(url.getAllTransactionUser(id_user),http.fetcher)
  },

  useGetByIdTransaction(id: string) {
    return useSWR(url.getByIdTransaction(id), http.fetcher);
  },

  useGetAllTransaction(params: GetAllTransaction){
    return useSWR(url.getAllTransaction(params), http.fetcher);
  },

  useGetByIdDetail(id: string){
    return useSWR(url.getByIdDetail(id), http.fetcher);
  }
}  

const api = {
  // async createTransaction(id_user: string) {
  //   try {
  //     const response = await http.post(url.createTransaction(id_user));
  //     return response.body;
  //   } catch (error) {
  //     console.error("Error creating transaction:", error);
  //     throw error;
  //   }
  // },

  async createTransaction(id_user: string, req: any){
    return http.post(url.createTransaction(id_user)).send(req);
  },
};

export const transactionRepository = {url,api,hooks};