import {http} from "#/utils/http";
import useSWR from "swr";

const url = {
	createOrder() {
		return `/order/create`
	},

    deletaOrder(id: string) {
		return `/order/${id}/delete`
	},

    getAllOrders() {
		return `/order/getAll`
	},

    editOrder(id: string) {
		return `/order/${id}/edit`
	},
}

const hooks = {
	useGetAllOrders() {
		return useSWR(url.getAllOrders(), http.fetcher)
	}
}

const api = {
    async createOrder(data: any){
        return await http.post(url.createOrder()).send(data);
    },

    async deleteOrder(id: string, data: any){
        return await http.del(url.deletaOrder(id)).send(data);
    },

    async editOrder(id: string, actionOrQty?: 'increment' | 'decrement' | number){
        return await http.put(url.editOrder(id)).send({actionOrQty});
    }
}

export const orderRepository = {
	url, hooks, api
}
