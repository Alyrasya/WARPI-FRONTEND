import {http} from "#/utils/http";
import useSWR from "swr";

const url = {
	getAdminSummary() {
		return `/dashboard/admin-summary`
	},
}

const hooks = {
	useGetAdminSummary() {
		return useSWR(url.getAdminSummary(), http.fetcher);
	}
}

const api = {

}

export const dashboardRepository = {
	url, hooks, api
}
