import express from 'express';
import { configDotenv } from 'dotenv';
configDotenv();
import db from './config/dbConnection.js';
import viewerRoutes from './routes/viewerRoutes.js';
import { isAdmin, isAnalyst } from './middlewares/verifyRole.js';
import analystRoutes from './routes/analystRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import verifyToken from './middlewares/verifyToken.js';
const app = express();
const port = process.env.PORT||5000;
app.use(express.json());
app.use('/', viewerRoutes);
app.use('/analyst', verifyToken,isAnalyst, analystRoutes);
app.use('/admin',verifyToken, isAdmin, adminRoutes);

app.listen(port, (error)=>{
    console.log(`Server is running on http://localhost:${port}`)
})