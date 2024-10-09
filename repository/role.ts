import {http} from "#/utils/http";
import useSWR from "swr";

const url = {
	getAllRole() {
		return `role/getAll`;
	},

    getRoleById(id: string){
        return `role/${id}/getById`;
    }
}

const hooks = {
	useGetAllRole() {
		return useSWR(url.getAllRole(), http.fetcher);
	},

    useGetRoleById(id: string) {
		return useSWR(url.getRoleById(id), http.fetcher);
	}
}

const api = {

}

export const roleRepository = {
	url, hooks, api
}
