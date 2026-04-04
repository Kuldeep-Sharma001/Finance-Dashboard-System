import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next)=>{
    const tokenString = req?.headers?.authorization;
    let status = 500;
    let message = 'Internal server error';
    try {
        if(!tokenString){
            status = 400;
            message = 'Token not found';
            throw new Error('Token not found');
        }
        const token = tokenString.split(' ')[1] || tokenString;
        // console.log(token);
        const secretKey = process.env.JWT_SECRET_KEY;
        // console.log(secretKey);
        const user = jwt.verify(token,secretKey);
        req.user = user;
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(status).json({
            success:false,
            message
        })
    }
}
export default verifyToken;