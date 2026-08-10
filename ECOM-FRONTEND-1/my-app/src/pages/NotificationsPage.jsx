import { useEffect, useState } from "react";
import api from "../axioxInstance";
import GlobalNav from "../components/GlobalNav";

export default function NotificationsPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/order/my-orders")
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
          })
      .catch((error) => {
        setOrders(null)
        console.error("fetch error", error);
        setLoading(false);
      });
  }, []);
  
if (loading) { 
      return (
        <> 
          <GlobalNav/>
          <div className='flex flex-col items-center h-100 p-3 text-center justify-center'>
            <p className='text-green-300 text-center font-semibold text-sm'>Loading Orders...</p>
          </div>
        </>
      );
    }
if (orders == null) { 
          return (
            <> 
              <GlobalNav/> 
              <div className='flex flex-col items-center h-100 p-3 text-center justify-center'>
                <p className='text-gray-400 text-center'> No Orders for now</p>
              </div>
            </>
          );
        }

  const statusColors = {
  PAID: '#16a34a',     // Green
  PENDING: '#d97706',  // Amber / Orange
  FAILED: '#dc2626',   // Red
};

  return (
    
    <div>
        <GlobalNav/>
      <h2 className="text-xl m-2 p-2 text-center">Orders</h2>

       {orders > 0  ?<p className="text-center text-gray-500 py-8">No notificaions for now.</p>:<p></p>}
      <div className="flex  flex-col items-center">
      {orders.map((order) => (
        <div key={order.orderId}  className=" flex flex-row font-semibold justify-around items-center  w-fill border-2 m-2 w-150 rounded-2xl p-2">
          <p className="">Order #{order.orderId}</p>
          {/* <p>{order.orderItems}</p> */}
          <p>Status:{' '}
        <span 
            style={{ 
                     color: statusColors[order.orderStatus] || '#6b7280', 
                    fontWeight: '600'  }}> 
            {order.orderStatus}
         </span>
        </p>
          <p>Total: Ksh {order.orderTotal}</p>
        </div>))}
        </div>
    </div>
  );
}