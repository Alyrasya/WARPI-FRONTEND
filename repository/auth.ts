import {http} from "#/utils/http";
import useSWR from "swr";

const url = {
	login() {
		return `/auth/login`;
	},
}

const hooks = {
}

const api = {
    async login(data: any){
        return await http.post(url.login()).send(data);
    }
}

export const authRepository = {
	url, hooks, api
}
