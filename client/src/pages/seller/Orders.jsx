import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Orders = () => {
  const { currency, axios } = useAppContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/seller");
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      const { data } = await axios.put(`/api/order/${orderId}/status`, {
        status,
      });
      if (data.success) {
        toast.success("Order status updated");
        fetchOrders();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="md:p-10 p-4 space-y-4">
      <h2 className="text-lg font-medium">Orders List</h2>
      {orders.map((order, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row md:items-center gap-5 justify-between p-5 max-w-4xl rounded-md border border-gray-300"
        >
          {/* Products */}
          <div className="flex gap-5 max-w-80">
            <img
              className="w-12 h-12 object-cover"
              src={order.items[0].product.image}
              alt="boxIcon"
            />
            <div>
              {order.items.map((item, idx) => (
                <div key={idx} className="flex flex-col">
                  <p className="font-medium">
                    {item.product.name}{" "}
                    <span className="text-primary">x {item.quantity}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Address */}
          <div className="text-sm md:text-base text-black/60">
            <p className="text-black/80">
              {order.address.firstName} {order.address.lastName}
            </p>
            <p>
              {order.address.street}, {order.address.city}
            </p>
            <p>
              {order.address.state}, {order.address.zipcode},{" "}
              {order.address.country}
            </p>
            <p>{order.address.phone}</p>
          </div>

          {/* Amount */}
          <p className="font-medium text-lg my-auto">
            {currency}
            {order.amount}
          </p>

          {/* Order Meta + Status Update */}
          <div className="flex flex-col text-sm md:text-base text-black/60">
            <p>Method: {order.paymentType}</p>
            <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
            <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>

            {/* Status Dropdown */}
            <select
              value={order.status}
              onChange={(e) => updateStatus(order._id, e.target.value)}
              className="border p-1 rounded mt-2"
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
