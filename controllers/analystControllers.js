import Transaction from "../models/transaction.js"
import User from "../models/user.js";
// Get All Transactions
export const allTransactions = async(req, res)=>{
     try {
        const {type, category} = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        let filter = {};
        let skip = (page-1)*limit;
        if(type) filter.type=type;
        if(category) filter.category=category;
        const transactions = await Transaction.find(filter).populate('user','name email').sort({date:-1}).skip(skip).limit(limit);
        if(transactions.length<=0){
            return res.status(404).json({
                success:false,
                messaage:"No transaction found"
            })
        }
        const totalTransactionsCount = await Transaction.countDocuments();
        return res.status(200).json({
            success:true,
            message:'Transaction fetched successfully',
            totalTransactionsCount,
            transactions
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// Get all users with their balance
export const allUsers = async (req, res)=>{
    try {
        const limit = parseInt(req.query.limit)||10;
        const page = parseInt(req.query.page)||1;
       const allUsers = await User.aggregate([
        {
            $match:{role:'viewer'}
        },
        {
            $sort:{name:-1}
        },
        {
            $skip:(page-1)*limit
        },
        {
            $limit:limit
        },

        {$lookup:{
            from:'transactions',
            localField:'_id',
            foreignField:'user',
            as:'transactions'
        }},
        {
            $addFields:{
                totalAmount:{$sum:"$transactions.amount"}
            }
        },
        {
            $project:{
                name:1,
                email:1,
                _id:1,
                totalAmount:1
            }
        }
       ])
       const totalUserCount = await User.countDocuments({role:'viewer'});
        return res.status(200).json({
            success:true,
            totalUserCount,
            allUsers
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// Get Recent Activities
export const recentTransactions = async (req, res)=>{
    try {
        const recentActivities = await Transaction.find().sort({date:-1}).limit(10).populate('user', 'name email');
        // console.log(recentActivities)
        if(recentActivities.length<=0){
            throw new Error('Something went wrong');
        }
        return res.status(200).json({
            success:true,
            recentActivities
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}