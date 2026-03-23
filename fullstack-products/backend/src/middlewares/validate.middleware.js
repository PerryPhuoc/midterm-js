export const validateProduct = (req, res, next) => {
    const { name, category, price, stock, image } = req.body;
  
    if (!name || !category || price == null || stock == null || !image)
      return res.status(400).json({ message: "Missing fields" });
  
    if (price <= 0)
      return res.status(400).json({ message: "price > 0" });
  
    if (stock < 0)
      return res.status(400).json({ message: "stock >= 0" });
  
    next();
  };