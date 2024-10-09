import {http} from "#/utils/http";
import useSWR from "swr";

const url = {
	getAllProduct(product_name?: string, category_name?: string) {
        const params = new URLSearchParams();
        if (product_name) params.append('product_name', product_name);
        if (category_name) params.append('category_name', category_name);
        
        // Jika tidak ada parameter yang disertakan, mengembalikan URL dasar
        return `/product/getAll${params.toString() ? '?' + params.toString() : ''}`;
    },
	
    getByIdProduct(id: string) {
		return `/product/${id}/getById`;
	},

    createProduct() {
		return `/product/create`;
	},

    updateProduct(id: string) {
		return `/product/${id}/edit`;
	},

}

const hooks = {
	useGetAllProduct(product_name?: string, category_name?: string) {
        // Menghasilkan URL menggunakan fungsi dari objek url
        const endpoint = url.getAllProduct(product_name, category_name);
        // Menggunakan SWR untuk mengambil data produk
        return useSWR(endpoint || null, http.fetcher);
    },

    useGetByIdProduct(id: string) {
		return useSWR(url.getByIdProduct(id), http.fetcher);
	},

}

const api = {
    async createProduct(data: FormData){
        return await http.post(url.createProduct()).send(data);
    },

    async updateProduct(id: string, data: FormData){
        return await http.put(url.updateProduct(id)).send(data);
    }
}

export const productRepository = {
	url, hooks, api
}
