import {http} from "#/utils/http";
import useSWR from "swr";
import qs from 'qs';

export interface GetAllCashier {
	page: number;
	page_size: number;
	usernameOrEmail?: string;
}

const url = {
	createCustomer() {
		return `/user/register`;
	},

	createCashier() {
		return `/user/create/cashier`;
	},

	getAllCashier(params: GetAllCashier) {
        return `/user/getAll?${qs.stringify(params)}`
    },

	editPassword(id: string) {
		return `/user/${id}/password`;
	},

	resetPassword(id: string) {
		return `/user/${id}/reset-password`;
	},

	editStatusCashier(id: string) {
		return `/user/${id}/status`;
	},
}

const hooks = {
	useGetAllCashier(params: GetAllCashier) {
		return useSWR(url.getAllCashier(params), http.fetcher);
	},
}

const api = {
	async createCustomer(data: any){
        const response = await http.post(url.createCustomer()).send(data);
		return response;
    },

	async createCashier(data: any){
		const response = await http.post(url.createCashier()).send(data);
		return response;
	},

	async editPassword(id: string, data: any){
        return await http.put(url.editPassword(id)).send(data);
    },

	async resetPassword(id: string) {
		return await http.put(url.resetPassword(id));
	},
	
	async editStatusCashier(id: string, data: any){
        return await http.put(url.editStatusCashier(id)).send(data);
    },
}

export const userRepository = {
	url, hooks, api
}