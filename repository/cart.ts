import { http } from '#/utils/http'; // Import your custom http utility
import { get } from 'superagent';
import useSWR from 'swr';

const url = {
    getCart(id_user:any){
        return `cart/${id_user}`
    }
}
const hooks = {
    getCart(id_user:any){
        return useSWR(url.getCart(id_user),http.fetcher)
    }
}
export const cartRepository={
    url,hooks
}