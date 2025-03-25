const JWT = require('jsonwebtoken');
const createError = require('http-errors');



module.exports = {
    signAccessToken:(UserId)=>{
        return new Promise((resolve, reject)=>{
            const payload = {};
            const secret = process.env.ACCESS_TOKEN_SECRET;
           const options ={
            expiresIn: '10m',
               issuer: 'EddTechnologies.com',
            audience: UserId,
           }
           JWT.sign(payload,secret,options,(error,token)=>{
            if(error){
                console.log(error.message);
                reject(createError.InternalServerError());
            }
            resolve(token);
           })
        })
    },

    signRefreshToken:(UserId)=>{
        return new Promise((resolve,reject)=>{
            const payload ={};
            const secret = process.env.REFRESH_TOKEN_SECRET;
            const options ={
                expiresIn: '10m',
                issuer: 'EddiTechnologies.com',
                audience: UserId,
            }
         JWT.sign(payload,secret,options,(error,token)=>{
           if(error){
               console.log(error.message);
               reject(createError.InternalServerError());
           }
           resolve(token);
         })
        })
    },

    verifyAccessToken:(request,respond, next)=>{
        if(!request.headers['authorization']) return next(createError.Unauthorized())
            const authHeader = request.headers['authorization']
        const bearerToken = authHeader.split(' ');//splitting bearer totken into two portions 
        const token = bearerToken[1];
        JWT.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,payload)=>{
            if(err){
                if(err.name === 'JsonWebTokenError'){
                    return next(createError.Unauthorized());
                }else{
                    return next(createError.Unauthorized(err.message));
                }
            }
            request.payload = payload;
            next();
        })
    },

    //for cheking multiply roles ...
    restrict:(...allowedRoles)=>{
        return(request,respond, next)=>{
            const userRole = request.payload.role;
            if(!userRole || allowedRoles.includes(userRole)){
                return next(
                    createError.Forbidden(
                        "Sorry! You do not have permission to perform this action"
                    )
                )
            }
            next();
        }
    }
}