import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, deleteProduct } from "../api/product.api";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

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
    <div style={{ padding: 20, maxWidth: 900, margin: "auto" }}>
      <h1>Product Manager</h1>

      {/* CREATE BUTTON */}
      <button onClick={() => navigate("/create")}>
        + Add Product
      </button>

      {/* SEARCH */}
      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginLeft: 10 }}
      />

      {/* FILTER */}
      <select
        onChange={(e) => setCategory(e.target.value)}
        style={{ marginLeft: 10 }}
      >
        <option value="">All</option>
        <option value="Laptop">Laptop</option>
        <option value="Phone">Phone</option>
      </select>

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

                <p>Price: {p.price}</p>
                <p>Category: {p.category}</p>
                <p>Stock: {p.stock}</p>

                <button onClick={() => handleDelete(p.id)}>
                  Delete
                </button>

                <button
                  onClick={() => navigate(`/edit/${p.id}`)}
                  style={{ marginLeft: 10 }}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}