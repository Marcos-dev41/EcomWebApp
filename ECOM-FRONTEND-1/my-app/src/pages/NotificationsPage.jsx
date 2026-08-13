import { useEffect, useState } from "react";
import api from "../axioxInstance";
import GlobalNav from "../components/GlobalNav";
import Footer from "../components/Footer";

export default function NotificationsPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Track which order card is expanded (stores orderId)
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const formatKSh = new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  });

  useEffect(() => {
    api
      .get("/order/my-orders")
      .then((response) => {
        setOrders(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("fetch error", err);
        setError(true);
        setOrders([]);
        setLoading(false);
      });
  }, []);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const getStatusBadge = (status) => {
    switch (status?.toUpperCase()) {
      case "PAID":
      case "DELIVERED":
      case "COMPLETED":
        return "border-emerald-500/30 bg-emerald-500/10 text-emerald-400";
      case "PENDING":
      case "PROCESSING":
        return "border-amber-500/30 bg-amber-500/10 text-amber-400";
      case "FAILED":
      case "CANCELLED":
        return "border-red-500/30 bg-red-500/10 text-red-400";
      default:
        return "border-gray-700 bg-gray-800 text-gray-400";
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-gray-100">
      <GlobalNav />

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 border-b border-gray-800 pb-4">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Order Notifications & History
          </h1>
          <p className="mt-1 text-xs text-gray-400">
            Click on any order to view itemized breakdown and summary details.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-20 w-full animate-pulse rounded-2xl border border-gray-800 bg-gray-900"
              />
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="my-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-red-900/50 bg-red-950/10 p-8 text-center">
            <p className="text-sm font-semibold text-red-400">
              Failed to load order updates
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Please check your connection and try refreshing the page.
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && orders.length === 0 && (
          <div className="my-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-800 bg-gray-900/40 p-12 text-center">
            <h3 className="text-base font-semibold text-white">No orders found</h3>
            <p className="mt-1 text-xs text-gray-400">
              Your recent purchase receipts and itemized breakdowns will show up here.
            </p>
          </div>
        )}

        {/* Expandable Orders List */}
        {!loading && !error && orders.length > 0 && (
          <div className="space-y-4">
            {orders.map((order) => {
              const isExpanded = expandedOrderId === order.orderId;
              const items = order.orderItems || order.items || [];

              return (
                <div
                  key={order.orderId}
                  className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 shadow-sm transition-all hover:border-gray-700"
                >
                  {/* Clickable Header Bar */}
                  <div
                    onClick={() => toggleOrderDetails(order.orderId)}
                    className="flex cursor-pointer flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-400">Order</span>
                        <span className="font-mono text-sm font-bold text-white">
                          #{order.orderId}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[11px] text-gray-500">
                        {items.length} {items.length === 1 ? "item" : "items"} • Tap to {isExpanded ? "collapse" : "view details"}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusBadge(
                          order.orderStatus
                        )}`}
                      >
                        {order.orderStatus || "UNKNOWN"}
                      </span>

                      <div className="text-right">
                        <span className="block text-[10px] uppercase text-gray-500">Total</span>
                        <span className="text-sm font-bold text-white">
                          {formatKSh.format(order.orderTotal || 0)}
                        </span>
                      </div>

                      {/* Expand Arrow Icon */}
                      <svg
                        className={`size-5 text-gray-400 transition-transform duration-200 ${
                          isExpanded ? "rotate-180 text-blue-400" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Expanded Itemized Order Summary Drawer */}
                  {isExpanded && (
                    <div className="border-t border-gray-800 bg-gray-950/60 p-4">
                      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Items Purchased
                      </h4>

                      {items.length > 0 ? (
                        <div className="space-y-3">
                          {items.map((item, index) => (
                            <div
                              key={item.prodId || index}
                              className="flex items-center justify-between gap-3 rounded-xl border border-gray-800/80 bg-gray-900/80 p-3"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                {item.imageUrl && (
                                  <img
                                    src={item.imageUrl}
                                    alt={item.prodName}
                                    className="size-10 rounded-lg bg-gray-950 object-contain p-1 border border-gray-800"
                                  />
                                )}
                                <div className="truncate">
                                  <p className="truncate text-xs font-semibold text-white">
                                    {item.prodName || item.productName || `Product #${item.prodId}`}
                                  </p>
                                  <p className="text-[11px] text-gray-400">
                                    Qty: <span className="font-semibold text-gray-200">{item.quantity || 1}</span>
                                  </p>
                                </div>
                              </div>

                              <p className="text-xs font-bold text-white shrink-0">
                                {formatKSh.format((item.price || 0) * (item.quantity || 1))}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-gray-500 italic">No item details available for this order.</p>
                      )}

                      {/* Payment Method Details */}
                      {order.paymentMethod && (
                        <div className="mt-4 flex items-center justify-between border-t border-gray-800/80 pt-3 text-xs text-gray-400">
                          <span>Paid via</span>
                          <span className="font-semibold uppercase text-gray-200">
                            {order.paymentMethod}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}