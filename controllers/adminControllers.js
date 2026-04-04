import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs"
import User from '../models/user.js';
import Transaction from '../models/transaction.js';
import { response } from 'express';

// Create User
export const createUser = async(req, res)=>{
    let status = 500;
    let message = 'Internal Server Error';
    try{
        const {name, email, password, role} = req.body;
        console.log(req.body);
      
        const user = await User.findOne({email});
        if(user){
                status = 400;
                message="This email is already registered";
                throw new Error("Email already registered")
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await User.create({name,email,password:hashedPassword, role});
        newUser.password=undefined;
          return res.status(202).json({
            success:true,
            message:'New User Created Successfuly',
            user:newUser
        })
    }catch(error){
        console.log('Error:',error.message);
        res.status(status).json({
            success:false,
            message
        })
    }
}

// Update User
export const updateUser = async(req, res)=>{
    let status = 500;
 try {
        const {id} = req.query;
        const updatedUser = req.body;
        const updated = await User.findByIdAndUpdate(id,updatedUser,{new:true},{runValidators:true});
        console.log(updated);
        if(!updated){
            status=404;
            throw new Error('User not found');
        }
        
        return res.status(200).json({
            success:true,
            message:'User Data Updated successfuly',
            updatedUser:updated
        })
    } catch (error) {
        return res.status(status).json({
            success:false,
            message:error.message || 'Internal Server Error'
        })
    }
}

// Delete User
export const deleteUser = async(req, res)=>{
    let status= 500;
 try {
        const {id} = req.query;
        const response = await User.findByIdAndDelete(id);
        console.log(response);
        if(!response){
            status = 404;
            throw new Error('User not found');
        }
        return res.status(200).json({
            success:true,
            message:'User deleted Successfuly',
            response
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message || 'Internal Server Error'
        })
    }
}

// Create Transaction
export const createTransaction = async(req, res)=>{
 try {
        const transaction = req.body;
        const response = await Transaction.create(transaction);
        if(!response){
            throw new Error('Something went wrong');
        }
        return res.status(200).json({
            success:true,
            message:'transaction completed',
            transaction:response
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message || 'Internal server Error'
        })
    }
}

// Update Transaction
export const updateTransaction = async(req, res)=>{
    let status = 500;
 try {
        const transactionId = req.query?.id;
        if(!transactionId){
            status = 400;
            throw new Error('Bad request, transaction id not provided')
        }
        const updatedTransaction = req.body;
        const response = await Transaction.findByIdAndUpdate(transactionId, updatedTransaction,{new:true, runValidation:true});
        return res.status(200).json({
            success:true,
            message:'Update Transaction Route',
            updatedTransaction:response
        })
    } catch (error) {
        return res.status(status).json({
            success:false,
            message:error.message
        })
    }
}

// Delete Transaction
export const deleteTransaction = async(req, res)=>{
     try {
        const transactionId = req.query.id;
        const response = await Transaction.findByIdAndDelete(transactionId);
        if(!response){
            throw new Error("Something went wrong");
        }
        return res.status(200).json({
            success:true,
            message:'Transaction deleted successfuly',
            transaction:response
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}