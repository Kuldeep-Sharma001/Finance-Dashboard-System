

// Verify Admin
export const isAdmin = (req, res, next)=>{
   if(req.user && req.user.role ==='admin'){
    next();
   }else{
    return res.status(403).json({
        success:false,
        message:'Access denied. Admin Only'
    })
   }
}

//Verify Analyst
export const isAnalyst = (req, res, next)=>{
   if(req.user && (req.user.role==='admin' || req.user.role==='analyst')){
    next();
   }else{
    return res.status(403).json({
        success:false,
        message:'Access denied. Admin/Analyst Only'
    })
   }
}


