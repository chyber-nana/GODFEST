import { useEffect, useState } from "react";
import client from "../api/client";

const MOMO_NUMBER = "0271806600";
const MOMO_NAME = "GODFEST";

export default function Merch() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [buyerName, setBuyerName] = useState("");
  const [buyerContact, setBuyerContact] = useState("");
  const [orderResult, setOrderResult] = useState(null);
  const [submittingOrder, setSubmittingOrder] = useState(false);

  const [checkCode, setCheckCode] = useState("");
  const [checkedOrder, setCheckedOrder] = useState(null);
  const [checkError, setCheckError] = useState("");

  useEffect(() => {
    client
      .get("/merch")
      .then((res) => setProducts(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const openBuyModal = (product) => {
    setSelectedProduct(product);
    setBuyerName("");
    setBuyerContact("");
    setOrderResult(null);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setOrderResult(null);
    setBuyerName("");
    setBuyerContact("");
  };

  const submitOrder = async (e) => {
    e.preventDefault();

    if (!selectedProduct) return;

    setSubmittingOrder(true);

    try {
      const res = await client.post("/orders", {
        productId: selectedProduct._id,
        buyerName,
        buyerContact,
      });

      setOrderResult(res.data.order);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit order.");
    } finally {
      setSubmittingOrder(false);
    }
  };

  const checkOrder = async (e) => {
    e.preventDefault();
    setCheckedOrder(null);
    setCheckError("");

    try {
      const res = await client.get(`/orders/check/${checkCode.trim()}`);
      setCheckedOrder(res.data);
    } catch (err) {
      setCheckError(err.response?.data?.message || "Order not found.");
    }
  };

  const inputStyle = {
    background: "#111",
    border: "1px solid #333",
    color: "#fafafa",
    borderRadius: "10px",
    padding: "14px 16px",
    width: "100%",
    fontSize: "14px",
    outline: "none",
  };

  return (
    <main
      className="min-h-screen px-6 pt-32 pb-20"
      style={{ background: "#0a0a0a" }}
    >
      <div className="max-w-6xl mx-auto">
        <p
          className="text-xs tracking-widest mb-3 text-center"
          style={{ color: "#e91e8c" }}
        >
          OFFICIAL
        </p>

        <h1
          className="font-display displayyy text-4xl md:text-5xl font-bold text-center mb-3"
          style={{ color: "#fafafa" }}
        >
          Godfest Merch
        </h1>

        <p className="text-center text-sm mb-10" style={{ color: "#888" }}>
          Represent the movement. Every purchase supports the program.
        </p>

        {/* Check order section */}
        <div
          className="max-w-xl mx-auto mb-14 rounded-2xl p-6"
          style={{ background: "#0d0d0d", border: "1px solid #e91e8c22" }}
        >
          <h2
            className="font-display displayyy text-xl font-bold mb-2 text-center"
            style={{ color: "#fafafa" }}
          >
            Check Your Order
          </h2>

          <p className="text-sm text-center mb-5" style={{ color: "#888" }}>
            Enter your order code to see whether your merch request has been confirmed.
          </p>

          <form onSubmit={checkOrder} className="flex flex-col sm:flex-row gap-3">
            <input
              value={checkCode}
              onChange={(e) => setCheckCode(e.target.value)}
              placeholder="Example: GF-ABC123"
              required
              style={inputStyle}
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full text-sm font-medium"
              style={{ background: "#e91e8c", color: "#fafafa" }}
            >
              Check
            </button>
          </form>

          {checkError && (
            <p className="text-sm text-center mt-4" style={{ color: "#bf6a6a" }}>
              {checkError}
            </p>
          )}

          {checkedOrder && (
            <div
              className="mt-5 rounded-xl p-4 text-sm"
              style={{ background: "#111", border: "1px solid #333", color: "#fafafa" }}
            >
              <p><strong>Code:</strong> {checkedOrder.orderCode}</p>
              <p><strong>Product:</strong> {checkedOrder.productName}</p>
              <p><strong>Amount:</strong> GH₵ {checkedOrder.amount}</p>
              <p><strong>Status:</strong> {checkedOrder.status.toUpperCase()}</p>

              {checkedOrder.status === "pending" && (
                <p className="mt-2" style={{ color: "#f5c542" }}>
                  Your payment is still being checked.
                </p>
              )}

              {checkedOrder.status === "confirmed" && (
                <p className="mt-2" style={{ color: "#6abf6a" }}>
                  Your order has been confirmed. Please present this code when collecting your merch.
                </p>
              )}

              {checkedOrder.status === "ignored" && (
                <p className="mt-2" style={{ color: "#bf6a6a" }}>
                  Reason: {checkedOrder.adminReason}
                </p>
              )}
            </div>
          )}
        </div>

        {loading && (
          <div className="text-center py-20" style={{ color: "#888" }}>
            Loading products...
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg" style={{ color: "#888" }}>
              Products coming soon.
            </p>
            <p className="text-sm mt-2" style={{ color: "#555" }}>
              Check back closer to the event.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="rounded-2xl overflow-hidden"
              style={{ background: "#0d0d0d", border: "1px solid #e91e8c22" }}
            >
              <div
                className="w-full aspect-square flex items-center justify-center"
                style={{ background: "#111" }}
              >
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span style={{ color: "#333", fontSize: "48px" }}>✦</span>
                )}
              </div>

              <div className="p-5">
                <h3
                  className="font-display displayyy text-lg font-bold mb-1"
                  style={{ color: "#fafafa" }}
                >
                  {product.name}
                </h3>

                <p className="text-sm mb-4" style={{ color: "#888" }}>
                  {product.description}
                </p>

                <div className="flex items-center justify-between gap-3">
                  <span
                    className="font-bold text-lg"
                    style={{ color: "#e91e8c" }}
                  >
                    GH₵ {product.price}
                  </span>

                  <button
                    onClick={() => openBuyModal(product)}
                    className="px-5 py-2 rounded-full text-xs font-medium transition-all hover:opacity-90"
                    style={{ background: "#e91e8c", color: "#fafafa" }}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.78)" }}
        >
          <div
            className="w-full max-w-md rounded-2xl p-6 relative"
            style={{ background: "#0d0d0d", border: "1px solid #e91e8c55" }}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-sm"
              style={{ color: "#888" }}
            >
              ✕
            </button>

            {!orderResult ? (
              <>
                <h2
                  className="font-display displayyy text-2xl font-bold mb-3"
                  style={{ color: "#fafafa" }}
                >
                  Complete Payment
                </h2>

                <p className="text-sm mb-5" style={{ color: "#888" }}>
                  Send the exact amount by MoMo, then submit your name and contact below.
                </p>

                <div
                  className="rounded-xl p-4 mb-5 text-sm"
                  style={{ background: "#111", border: "1px solid #333", color: "#fafafa" }}
                >
                  <p><strong>Product:</strong> {selectedProduct.name}</p>
                  <p><strong>Amount:</strong> GH₵ {selectedProduct.price}</p>
                  <p><strong>MoMo Number:</strong> {MOMO_NUMBER}</p>
                  <p><strong>Account Name:</strong> {MOMO_NAME}</p>
                </div>

                <form onSubmit={submitOrder} className="flex flex-col gap-4">
                  <input
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    required
                    placeholder="Your full name"
                    style={inputStyle}
                  />

                  <input
                    value={buyerContact}
                    onChange={(e) => setBuyerContact(e.target.value)}
                    required
                    placeholder="Phone number or WhatsApp contact"
                    style={inputStyle}
                  />

                  <button
                    type="submit"
                    disabled={submittingOrder}
                    className="w-full py-3 rounded-full text-sm font-medium disabled:opacity-50"
                    style={{ background: "#e91e8c", color: "#fafafa" }}
                  >
                    {submittingOrder ? "Submitting..." : "I Have Sent Payment / Submit Order"}
                  </button>
                </form>
              </>
            ) : (
              <>
                <h2
                  className="font-display displayyy text-2xl font-bold mb-3"
                  style={{ color: "#fafafa" }}
                >
                  Order Submitted
                </h2>

                <p className="text-sm mb-5" style={{ color: "#888" }}>
                  Keep this code safe. You will use it to identify yourself when collecting your merch.
                </p>

                <div
                  className="rounded-xl p-5 text-center mb-5"
                  style={{ background: "#111", border: "1px solid #e91e8c55" }}
                >
                  <p className="text-xs tracking-widest mb-2" style={{ color: "#888" }}>
                    YOUR ORDER CODE
                  </p>

                  <p
                    className="font-display displayyy text-3xl font-bold"
                    style={{ color: "#e91e8c" }}
                  >
                    {orderResult.orderCode}
                  </p>

                  <p className="text-sm mt-3" style={{ color: "#aaa" }}>
                    Status: {orderResult.status.toUpperCase()}
                  </p>
                </div>

                <button
                  onClick={closeModal}
                  className="w-full py-3 rounded-full text-sm font-medium"
                  style={{ background: "#e91e8c", color: "#fafafa" }}
                >
                  Done
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}