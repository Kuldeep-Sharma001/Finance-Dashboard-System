import express from 'express';
import { login, userDashboard, userTransactions } from '../controllers/viewerControllers.js';
import verifyToken from '../middlewares/verifyToken.js';
const viewerRoutes = express.Router();

viewerRoutes.post('/login', login);
viewerRoutes.get('/userDashboard', verifyToken, userDashboard);
viewerRoutes.get('/userTransactions', verifyToken, userTransactions);
export default viewerRoutes;