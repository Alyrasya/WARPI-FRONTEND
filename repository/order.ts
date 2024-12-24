import { http } from '#/utils/http';

const url = {
  addToCart(id_user: string) {
    return `/order/add/${id_user}`;
  },

  editOrderQuantity(id_order: string) {
    return `/order/edit-quantity/${id_order}`;
  },

  deleteOrder(id_order: string) {
    return `/order/delete/${id_order}`;
  }
};

const hooks = {
}

const api = {
  async addToCart(id_user: string, data: any) {
    return http.post(url.addToCart(id_user)).send(data);
  },

  async editOrderQuantity(id_order: string, data:any) {
   return http.put(url.editOrderQuantity(id_order)).send(data);
  },

  async deleteOrder(id_order: string) {
    return http.del(url.deleteOrder(id_order));
  }
};

export const orderRepository = { url, api };
