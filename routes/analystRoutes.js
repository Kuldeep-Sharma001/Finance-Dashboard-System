import express from 'express';
import { allTransactions, allUsers, recentTransactions } from '../controllers/analystControllers.js';
const analystRoutes = express.Router();

analystRoutes.get('/allTransactions', allTransactions );
analystRoutes.get('/allUsers', allUsers);
analystRoutes.get('/recentTransactions', recentTransactions);
export default analystRoutes;
