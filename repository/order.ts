import { http } from '#/utils/http';

const url = {
  postAddToCart(id_user:any) {
    return `/order/add/${id_user}`;
  },
  editQuantity(id_order:any) {
    return `/edit-quantity/${id_order}`;
  },
  deleteOrder(id_order:any) {
    return `/delete/${id_order}`;
  },
};

const api = {
  async getCart(id_user:any) {
    try {
      const response = await http.get(`/cart/${id_user}`);
      return response.body; // Sesuaikan dengan struktur respons API Anda
    } catch (error) {
      console.error("Error fetching cart:", error);
      throw error;
    }
  },
  // Tambahkan produk ke keranjang
  async addToCart(id_user:any, data:any) {
    try {
      const response = await http.post(url.postAddToCart(id_user)).send(data);
      return response;
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  },

  // Edit jumlah pesanan
  async editOrderQuantity(id_order:any, data:any) {
    try {
      const response = await http.put(url.editQuantity(id_order)).send(data);
      return response;
    } catch (error) {
      console.error("Error editing order quantity:", error);
      throw error;
    }
  },

  // Hapus pesanan
  async deleteOrder(id_order: any) {
    try {
      // Gunakan metode yang benar untuk penghapusan
      const response = await http.del(url.deleteOrder(id_order));
      return response;
    } catch (error) {
      console.error("Error deleting order:", error);
      throw error;
    }
  },
};

export const orderRepository = { url, api };
