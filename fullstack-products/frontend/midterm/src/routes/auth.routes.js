import express from "express";
import fs from "fs/promises";
import path from "path";

const router = express.Router();
const filePath = path.resolve("src/data/users.json");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const data = JSON.parse(await fs.readFile(filePath));

  const user = data.find(
    u => u.username === username && u.password === password
  );

  if (!user)
    return res.status(401).json({ message: "Invalid credentials" });

  res.json(user);
});

export default router;