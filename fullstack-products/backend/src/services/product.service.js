import { readData, writeData } from "../utils/file.util.js";

export const getAll = async (query) => {
  let data = await readData();

  if (query.category) {
    data = data.filter(p => p.category === query.category);
  }

  if (query.search) {
    const k = query.search.toLowerCase();
    data = data.filter(p => p.name.toLowerCase().includes(k));
  }

  return data;
};

export const getById = async (id) => {
  const data = await readData();
  return data.find(p => p.id === id);
};

export const create = async (body) => {
  const data = await readData();

  const newItem = {
    id: Date.now(),
    ...body
  };

  data.push(newItem);
  await writeData(data);

  return newItem;
};

export const update = async (id, body) => {
  const data = await readData();
  const i = data.findIndex(p => p.id === id);
  if (i === -1) return null;

  data[i] = { ...data[i], ...body };
  await writeData(data);

  return data[i];
};

export const remove = async (id) => {
  const data = await readData();
  const i = data.findIndex(p => p.id === id);
  if (i === -1) return false;

  data.splice(i, 1);
  await writeData(data);

  return true;
};

export const checkout = async (cart) => {
  const data = await readData();

  for (let item of cart) {
    const product = data.find(p => p.id === item.id);

    if (!product) {
      throw new Error(`Product not found: ${item.id}`);
    }

    if (product.stock < item.quantity) {
      throw new Error(
        `Not enough stock for ${product.name}`
      );
    }
  }

  const updated = data.map(p => {
    const item = cart.find(c => c.id === p.id);

    if (item) {
      return {
        ...p,
        stock: p.stock - item.quantity
      };
    }

    return p;
  });

  await writeData(updated);

  return updated;
};