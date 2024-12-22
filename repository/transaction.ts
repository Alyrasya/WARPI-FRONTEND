import useSWR from "swr";
import qs from "qs";
import { http } from "#/utils/http";

export type PaymentStatus = "paid" | "unpaid" | "pending";
export interface GetAllTransactionCashierParams {
  page: number;
  page_size: number;
  name_order?: string;
  payment_status?: PaymentStatus;
}

export interface editTransactionParams {
  id_transaction: string;
  id_user: string;
}

export type EditTransactionDto = {
  cash?: number|null;
  action: "paid" | "pending"; // Required: only accepts 'paid' or 'pending'
  id_method: string|null; // Required: UUID
};

const url = {
  getAllTransactionCashier(params: GetAllTransactionCashierParams) {
    return `/transaction/getAllTransactionCashier?${qs.stringify(params, {
      encode: false,
    })}`;
  },

  getAllMethods() {
    return `/payment-method/getAll`;
  },

  // Update this function to ensure the URL is properly formatted
  editTransaction(params: editTransactionParams) {
    return `/transaction/edit/${params.id_transaction}/${params.id_user}`;  // Dynamically replace parameters
  },
};

const hooks = {
  useGetAllTransactionCashier(params: GetAllTransactionCashierParams) {
    return useSWR(url.getAllTransactionCashier(params), http.fetcher);
  },

  useGetAllMethods() {
    return useSWR(url.getAllMethods(), http.fetcher);
  },
};

const api = {
  async editTransaction(useParams: editTransactionParams, data: EditTransactionDto) {
    const endpoint = url.editTransaction(useParams); // Get the URL with dynamic params
    try {
      // Send the PUT request with the correct URL and data
      const response = await http.put(endpoint).send(data);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export const transactionRepository = {
  hooks,
  url,
  api,
};
