export default function ProductItem({ p, onDelete }) {
    return (
      <div style={{ border: "1px solid #ccc", margin: 10 }}>
        <img src={p.image} width={100} />
        <h3>{p.name}</h3>
        <p>{p.price}</p>
        <p>{p.category}</p>
        <p>{p.stock}</p>
        <button onClick={() => onDelete(p.id)}>Delete</button>
      </div>
    );
  }