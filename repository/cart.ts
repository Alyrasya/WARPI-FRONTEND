import { http } from '#/utils/http';
import useSWR from 'swr';

const url = {
    getCartByUserId(id_user: string){
        return `/cart/getById/${id_user}`
    }
}
const hooks = {
    useGetCartByUserId(id_user: string){
        return useSWR(url.getCartByUserId(id_user),http.fetcher)
    }
}
export const cartRepository={
    url,hooks
}