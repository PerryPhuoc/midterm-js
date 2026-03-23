import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { checkout } from "../api/product.api";

export default function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    totalPrice,
    totalItems,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      await checkout(cart);
      alert("Checkout success!");
      clearCart();
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Checkout failed");
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "auto" }}>
      <h1>🛒 Your Cart</h1>

      <button onClick={() => navigate("/")}>← Back</button>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div style={{ marginTop: 20 }}>
            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  border: "1px solid #ccc",
                  padding: 15,
                  marginBottom: 10,
                  display: "flex",
                  gap: 20,
                  alignItems: "center",
                }}
              >
                <img src={item.image} width={100} />

                <div style={{ flex: 1 }}>
                  <h3>{item.name}</h3>
                  <p>💲 {item.price}</p>
                  <p>Stock: {item.stock}</p>

                  {/* QUANTITY CONTROL */}
                  <div>
                    <button onClick={() => decreaseQty(item.id)}>
                      -
                    </button>

                    <span style={{ margin: "0 10px" }}>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      disabled={item.quantity >= item.stock}
                    >
                      +
                    </button>
                  </div>

                  {item.quantity >= item.stock && (
                    <p style={{ color: "red" }}>
                      Max stock reached
                    </p>
                  )}
                </div>

                <div>
                  <p>
                    Subtotal: 💲{" "}
                    {item.price * item.quantity}
                  </p>

                  <button onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h2>Total Items: {totalItems}</h2>
          <h2>Total Price: 💲 {totalPrice}</h2>

          <button onClick={clearCart}>Clear Cart</button>

          <button
            onClick={handleCheckout}
            style={{ marginLeft: 10 }}
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}