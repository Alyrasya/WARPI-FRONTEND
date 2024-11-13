import { http } from "#/utils/http";

const url = {
    login() {
        return `/auth/login`;
    },
};

const hooks = {};

const api = {
    async login(data: any){
        try {
            const response = await http.post(url.login()).send(data);
            return response.body;
        } catch (error: any) {
            throw error.response?.body || { message: "Login failed", status: error.status || 500 };
        }
    },
};

export const authRepository = {
    url, hooks, api
};
