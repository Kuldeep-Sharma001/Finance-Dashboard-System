import jwt from "jsonwebtoken";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import Transaction from "../models/transaction.js";
import mongoose from 'mongoose';

//Login User
export const login = async(req,res)=>{
    let status = 500;
    let message = "Internal Server Error";
    try {
        const {email,password} = req.body;
        if(!email || !password){
           status = 400;
                message="Email and Password required";
                throw new Error("Email and Password required")
        }
        const user = await User.findOne({email});
        if(!user){
            status = 404;
                message="User not Found";
                throw new Error("User not Found")
        }
        const isMatched = await bcrypt.compare(password,user.password);
        if(!isMatched){
            status = 400;
                message="Invalid credentials";
                throw new Error("Invalid credentials")
        }
        user.password=undefined;
        const secretKey = process.env.JWT_SECRET_KEY;
        console.log(secretKey);
        const payload = {
            name:user.name,
            email:user.email,
            role:user.role,
            _id:user._id
        }
        const token = jwt.sign(payload,secretKey,{expiresIn:'2d'})
        return res.status(200).json({
            success:true,
            message:'Logged-In successfuly',
            user,
            token
        })
    } catch (error) {
        console.log("error: ",error.message);
        return res.status(status).json({
            success:false,
            message
        })
    }
} 

//userDashboard
export const userDashboard = async(req, res)=>{
    try {
        const userId = new mongoose.Types.ObjectId(req.user._id);
        const dashboardData = await Transaction.aggregate([
            {$match:{user:userId}},
            {$facet:{
                recentTransactions:[
                    {$sort:{date:-1}},{$limit:5}
                ],
                typeTotal:[
                    {
                        $group:{
                        _id:'$type',
                        total:{$sum:'$amount'}
                    }}
                ],
                categoryTotal:[
                    {
                        $group:{
                            _id:'$category',
                            total:{$sum:'$amount'}
                        }
                    }
                ]
            }}
        ])

        const {recentTransactions, typeTotal, categoryTotal} = dashboardData[0];
        let income = 0;
        let expense = 0;
        let netBalance = 0;
        typeTotal.forEach(type=>{
            if(type._id==='income') income = type.total;
            if(type._id==='expense') expense = type.total;
        })
        netBalance = income-expense;
        return res.status(200).json({
            success:true,
            recentTransactions, income, expense, netBalance, categoryTotal
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// UserTransactions
export const userTransactions = async(req, res)=>{
    try{
        const userId = req.user._id;
        const {type, category} = req.query;
        let filter = {user:userId};
        if(type) filter.type=type;
        if(category) filter.category=category;
        const page = parseInt(req.query.page)||1;
        const limit = parseInt(req.query.limit)||10;
        const skip = (page-1)*limit;
        const transactions = await Transaction.find(filter).sort({date:-1}).skip(skip).limit(limit);
        // console.log(transactions);
        const totalTransactionsCount = await Transaction.countDocuments(filter);
        return res.status(200).json({
            success:true,
            message:'Transaction fetched',
            totalTransactionsCount,
            transactions

        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

