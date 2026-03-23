import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, deleteProduct } from "../api/product.api";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const { user, logout } = useContext(AuthContext);
  const { addToCart, cart } = useContext(CartContext);

  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getProducts({ search, category });
      setData(res.data);
    } catch (err) {
      console.error(err);
      alert("Error loading data");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [search, category]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await deleteProduct(id);
    fetchData();
  };

  return (
    <div style={{ padding: 20, maxWidth: 1000, margin: "auto" }}>
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Product Manager</h1>

        <div>
          {user ? (
            <>
              <span style={{ marginRight: 10 }}>
                👤 {user.username} ({user.role})
              </span>

              <button onClick={() => navigate("/cart")}>
                🛒 Cart ({cart.length})
              </button>

              <button
                onClick={logout}
                style={{ marginLeft: 10 }}
              >
                Logout
              </button>
            </>
          ) : (
            <button onClick={() => navigate("/login")}>
              Login
            </button>
          )}
        </div>
      </div>

      {/* ACTION BAR */}
      <div style={{ marginTop: 20 }}>
        {user?.role === "admin" && (
          <button onClick={() => navigate("/create")}>
            + Add Product
          </button>
        )}

        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginLeft: 10 }}
        />

        <select
          onChange={(e) => setCategory(e.target.value)}
          style={{ marginLeft: 10 }}
        >
          <option value="">All</option>
          <option value="Laptop">Laptop</option>
          <option value="Phone">Phone</option>
        </select>
      </div>

      {/* LIST */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ marginTop: 20 }}>
          {data.length === 0 && <p>No products</p>}

          {data.map((p) => (
            <div
              key={p.id}
              style={{
                border: "1px solid #ccc",
                padding: 15,
                marginBottom: 10,
                display: "flex",
                gap: 20,
                alignItems: "center",
              }}
            >
              <img src={p.image} width={120} />

              <div style={{ flex: 1 }}>
                <h2
                  onClick={() => navigate(`/product/${p.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  {p.name}
                </h2>

                <p>💲 {p.price}</p>
                <p>📦 {p.category}</p>
                <p>Stock: {p.stock}</p>

                {/* USER ACTION */}
                {user?.role === "user" && (
                  <button onClick={() => addToCart(p)}>
                    Add to cart
                  </button>
                )}

                {/* ADMIN ACTION */}
                {user?.role === "admin" && (
                  <>
                    <button onClick={() => handleDelete(p.id)}>
                      Delete
                    </button>

                    <button
                      onClick={() => navigate(`/edit/${p.id}`)}
                      style={{ marginLeft: 10 }}
                    >
                      Edit
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}