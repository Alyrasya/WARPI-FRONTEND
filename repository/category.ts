import {http} from "#/utils/http";
import useSWR from "swr";

const url = {
    getAllCategory(category_name?: string) {
        // Menggunakan URLSearchParams untuk membangun query string
        const params = new URLSearchParams();
        if (category_name) {
            params.append('category_name', category_name);
        }
        // Menghasilkan URL; jika tidak ada parameter, mengembalikan URL dasar
        return `/category/getAll${params.toString() ? '?' + params.toString() : ''}`;
    },

    createCategory(){
        return `/category/create`;
    },

    updateCategory(id: string){
        return `/category/${id}/edit`;
    },

    getProductsByCategory(id: string, product_name?: string) {
        // Menggunakan URLSearchParams untuk membangun query string
        const params = new URLSearchParams();
        if (product_name) {
            params.append('product_name', product_name);
        }
        // Menghasilkan URL; jika tidak ada parameter, hanya mengembalikan path dasar
        return `/category/${id}detail${params.toString() ? '?' + params.toString() : ''}`;
    },
}

const hooks = {
	useGetAllCategory(category_name?: string) {
		return useSWR(url.getAllCategory(category_name), http.fetcher);
	},

    useGetProductsByCategory(id: string, product_name?: string){
        return useSWR(url.getProductsByCategory(id, product_name), http.fetcher);
    },
}

const api = {
  async createCategory(data: any): Promise<any> {
    const response = await http.post(url.createCategory()).send(data);
    return response; // Kembalikan respons langsung
  },

  async updateCategory(id: string, data: any): Promise<any> {
    const response = await http.put(url.updateCategory(id)).send(data);
    return response; // Kembalikan respons langsung
  }
}

export const categoryRepository = {
	url, hooks, api
}
