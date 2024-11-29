import {http} from "#/utils/http";
import useSWR from "swr";

const url = {
	getAdminSummary() {
		return `/dashboard/admin-summary`
	},
	getCashierSummary() {
		return `/dashboard/cashier-summary`; // Pastikan endpoint ini sesuai dengan backendmu
	}
}

const hooks = {
	useGetAdminSummary() {
		return useSWR(url.getAdminSummary(), http.fetcher);
	},
	useGetCashierSummary() {
		return useSWR(url.getCashierSummary(), http.fetcher);
	}
	
}

const api = {

}

export const dashboardRepository = {
	url, hooks, api
}
