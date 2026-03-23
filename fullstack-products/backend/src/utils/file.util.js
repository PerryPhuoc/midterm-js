import fs from "fs/promises";
import path from "path";

const filePath = path.resolve("src/data/products.json");

export const readData = async () => {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
};

export const writeData = async (data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};