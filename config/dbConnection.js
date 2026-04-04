import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const dbString =process.env.DB_CONN_STRING;
console.log('dbString:',dbString);
mongoose.connect(dbString);
const db = mongoose.connection;
db.on('connected',()=>{
    console.log('Connected to the database successfully')
})
db.on('error',(error)=>{
    console.log('Database connection error:',error);
})
db.on('disconnected',()=>{
    console.log('Disconnected successfully');
})
export default db;