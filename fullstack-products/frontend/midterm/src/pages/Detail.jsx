import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct } from "../api/product.api";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    getProduct(id).then((res) => setData(res.data));
  }, [id]);

  if (!data) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => navigate("/")}>Back</button>

      <h1>{data.name}</h1>
      <img src={data.image} width={200} />

      <p>Price: {data.price}</p>
      <p>Category: {data.category}</p>
      <p>Stock: {data.stock}</p>
    </div>
  );
}