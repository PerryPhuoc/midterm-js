import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createProduct,
  getProduct,
  updateProduct,
} from "../api/product.api";

export default function Form() {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEdit = !!id;

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: 0,
    image: "",
    stock: 0,
  });

  useEffect(() => {
    if (isEdit) {
      getProduct(id).then((res) => setForm(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "number"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEdit) {
      await updateProduct(id, form);
    } else {
      await createProduct(form);
    }

    navigate("/");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>{isEdit ? "Edit Product" : "Add Product"}</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="name"
          required
        />

        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="category"
          required
        />

        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="price"
          required
        />

        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="image url"
          required
        />

        <input
          name="stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
          placeholder="stock"
          required
        />

        <button type="submit">
          {isEdit ? "Update" : "Create"}
        </button>

        <button type="button" onClick={() => navigate("/")}>
          Cancel
        </button>
      </form>
    </div>
  );
}