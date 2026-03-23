import { useEffect, useState } from "react";
import { getProducts, createProduct, deleteProduct } from "../api/product.api";
import ProductItem from "../components/ProductItem";
import ProductForm from "../components/ProductForm";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await getProducts();
      setData(res.data);
    } catch {
      alert("error");
    }
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const handleCreate = async (d) => {
    await createProduct(d);
    fetch();
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetch();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <ProductForm onCreate={handleCreate}/>
      {data.map(p => (
        <ProductItem key={p.id} p={p} onDelete={handleDelete}/>
      ))}
    </div>
  );
}