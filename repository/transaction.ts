import {http} from "#/utils/http";
import useSWR from "swr";
import qs from 'qs';
import { userAgent } from "next/server";

export interface GetAllTransaction {
    page: number;
    page_size: number;
    name_order: string;
    method_name: string;
    start_date: string;
    end_date: string;
}

export interface ExportTransaction {
    page: number;
    page_size: number;
    name_order: string;
    method_name: string;
    start_date: string;
    end_date: string;
}

const url = {
    getAllTransaction(params: GetAllTransaction) {
        return `/transaction/getAll?${qs.stringify(params)}`;
    },

    getByIdTransaction(id: string){
        return `/transaction/getById/${id}`
    },

    exportTransactionToExcel(params: ExportTransaction){
        return `/transaction/export?${qs.stringify(params)}`
    }
}

const hooks = {
    useGetAllTransaction(params: GetAllTransaction){
        return useSWR(url.getAllTransaction(params), http.fetcher);
    },

    useGetByIdTransaction(id: string){
        return useSWR(url.getByIdTransaction(id), http.fetcher);
    }
}

const api = {
}

export const transactionRepository = {
	url, hooks, api
}
