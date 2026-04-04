import express from "express";
import { createUser, updateUser, deleteUser, createTransaction, deleteTransaction, updateTransaction } from "../controllers/adminControllers.js";
const adminRoutes = express.Router();

adminRoutes.post('/createUser', createUser);
adminRoutes.put('/updateUser', updateUser);
adminRoutes.delete('/deleteUser', deleteUser);
adminRoutes.post('/createTransaction', createTransaction);
adminRoutes.put('/updateTransaction', updateTransaction);
adminRoutes.delete('/deleteTransaction', deleteTransaction);

export default adminRoutes;