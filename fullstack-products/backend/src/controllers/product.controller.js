import * as s from "../services/product.service.js";

export const getAll = async (req, res, next) => {
  try {
    const data = await s.getAll(req.query);
    res.json(data);
  } catch (e) { next(e); }
};

export const getOne = async (req, res, next) => {
  try {
    const item = await s.getById(Number(req.params.id));
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (e) { next(e); }
};

export const create = async (req, res, next) => {
  try {
    const item = await s.create(req.body);
    res.status(201).json(item);
  } catch (e) { next(e); }
};

export const update = async (req, res, next) => {
  try {
    const item = await s.update(Number(req.params.id), req.body);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (e) { next(e); }
};

export const remove = async (req, res, next) => {
  try {
    const ok = await s.remove(Number(req.params.id));
    if (!ok) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (e) { next(e); }
};