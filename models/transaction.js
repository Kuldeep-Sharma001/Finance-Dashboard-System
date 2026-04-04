import mongoose from 'mongoose';
const transactionSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum:['income','expense'],
        required:true
    },
    date:{
        type:Date,
        default:Date.now()},
    note:String
});

const Transaction = mongoose.model('transaction', transactionSchema);
export default Transaction;