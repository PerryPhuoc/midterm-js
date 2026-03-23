import { useState } from "react";

export default function ProductForm({ onCreate }) {
  const [f, setF] = useState({
    name: "",
    category: "",
    price: 0,
    image: "",
    stock: 0
  });

  const submit = (e) => {
    e.preventDefault();
    onCreate(f);
  };

  return (
    <form onSubmit={submit}>
      <input placeholder="name" onChange={e => setF({...f, name:e.target.value})}/>
      <input placeholder="category" onChange={e => setF({...f, category:e.target.value})}/>
      <input type="number" onChange={e => setF({...f, price:+e.target.value})}/>
      <input placeholder="image" onChange={e => setF({...f, image:e.target.value})}/>
      <input type="number" onChange={e => setF({...f, stock:+e.target.value})}/>
      <button>Add</button>
    </form>
  );
}