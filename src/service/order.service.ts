import Order from "model/Order.Schema";

export const findAllOrdersService = () => Order.find();
export const findOrderByIdService = (id: string) => Order.findById(id);
export const createOrderService = (body: any) => Order.create(body);
export const deleteOrderService = (id: string) => Order.findByIdAndDelete(id);
export const updateStatusOrderService = (id: string) =>
  Order.findOneAndUpdate({ _id: id }, { $set: { orderCompleted: true } });
