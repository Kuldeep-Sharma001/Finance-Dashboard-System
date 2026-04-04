import mongoose from 'mongoose';
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['viewer', 'analyst', 'admin'],
        default:'viewer'
    },
    status:{
        type:String,
        enum:['active', 'inactive']
    }
});
const User = mongoose.model('user', userSchema);
export default User;