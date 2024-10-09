import {http} from "#/utils/http";
import useSWR from "swr";

const url = {
	getAllMethods() {
		return `payment-method/getAll`;
	},

    getMethodById(id: string){
        return `payment-method/${id}/getById`;
    }
}

const hooks = {
	useGetAllMethods() {
		return useSWR(url.getAllMethods(), http.fetcher)
	},

    useGetMethodById(id: string) {
		return useSWR(url.getMethodById(id), http.fetcher);
	}
}

const api = {
}

export const methodRepository = {
	url, hooks, api
}
