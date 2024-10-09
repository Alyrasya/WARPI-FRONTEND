import {http} from "#/utils/http";
import useSWR from "swr";

const url = {
	createCustomer() {
		return `/user/register`;
	},

	createCashier() {
		return `/user/create/cashier`;
	},

	getAllCashier(usernameOrEmail?: string) {
        // Menggunakan URLSearchParams untuk membangun query string
        const params = new URLSearchParams();
        if (usernameOrEmail) {
            params.append('usernameOrEmail', usernameOrEmail);
        }
        // Menghasilkan URL; jika tidak ada parameter, hanya mengembalikan path dasar
        return `/cashier/getAll${params.toString() ? '?' + params.toString() : ''}`;
    },

	editStatusCashier(id: string) {
		return `/user/${id}/status`;
	},

	editPassword(id: string) {
		return `/user/${id}/password`;
	},

	resetPassword(id: string) {
		return `/user/${id}/reset-password`;
	},
}

const hooks = {
	useGetAllCashier(usernameOrEmail?: string) {
		return useSWR(url.getAllCashier(usernameOrEmail), http.fetcher);
	},
}

const api = {
	async createCustomer(data: any){
        return await http.post(url.createCustomer()).send(data);
    },

	async createCashier(data: any){
        return await http.post(url.createCashier()).send(data);
    },

    async editStatusCashier(id: string, data: any){
        return await http.put(url.editStatusCashier(id)).send(data);
    },

	async editPassword(id: string, data: any){
        return await http.put(url.editPassword(id)).send(data);
    },

	async resetPassword(id: string, data: any){
        return await http.put(url.resetPassword(id)).send(data);
    }
}

export const userRepository = {
	url, hooks, api
}
