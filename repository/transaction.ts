import { http } from '#/utils/http';
import useSWR from 'swr';

const url = {
  createTransaction(id_user: string) {
    return `/transaction/create/${id_user}`;
  },
  getAllTransaction(id_user : any){
    return `/transaction/transaction/${id_user}`
  }
};

const api = {
  // Create a new transaction
  async createTransaction(id_user: string) {
    try {
      const response = await http.post(url.createTransaction(id_user));
      return response.body; // Modify according to the actual response structure
    } catch (error) {
      console.error("Error creating transaction:", error);
      throw error;
    }
  },
};
const hooks = {
  getAllTransaction(id_user:any){
      return useSWR(url.getAllTransaction(id_user),http.fetcher)
  }
}

export const transactionRepository = { url, api,hooks};