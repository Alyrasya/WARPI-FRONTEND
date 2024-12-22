import useSWR from "swr";
import { http } from "#/utils/http";
import qs from "qs";

// Enum untuk status pembayaran
export type PaymentStatus = "paid" | "unpaid" | "pending";

// Interface untuk parameter query
export interface GetAllTransactionCashierParams {
  page: number; // Halaman saat ini
  page_size: number; // Jumlah data per halaman
  name_order?: string; // (Opsional) Nama pemesan
  payment_status?: PaymentStatus; // (Opsional) Status pembayaran
}

// Interface untuk data transaksi
export interface Transaction {
  id: string; // ID transaksi
  no_order: number; // Nomor pesanan
  name_order: string; // Nama pemesan
  total_price_transaction: number; // Total harga transaksi
  cash: number; // Uang tunai yang diterima
  change_money: number; // Kembalian
  payment_status: PaymentStatus; // Status pembayaran
  payment_method: string; // Metode pembayaran
  createdAt: string; // Waktu pembuatan transaksi
}

// Interface untuk respons transaksi
export interface TransactionResponse {
  data: Transaction[]; // Data transaksi
  totalCount: number; // Total transaksi
}

// URL endpoint transaksi
const url = {
  getAllTransactionCashier: (params: GetAllTransactionCashierParams) =>
    `/transactions/getAllTransactionCashier?${qs.stringify(params, {
      encode: false,
    })}`,
};

// Hooks untuk transaksi
const hooks = {
  // Fetch semua transaksi berdasarkan query parameter
  useGetAllTransactionCashier: (params: GetAllTransactionCashierParams) => {
    const query = url.getAllTransactionCashier(params);
    return useSWR<TransactionResponse>(query, http.fetcher);
  },
};

// Export repository transaksi
export const transactionRepository = { url, hooks };
