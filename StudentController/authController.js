
const User = require('../models/authModel');
//import validation Schema
const {authSchema} = require('../helpers/validationSchema');
const createError = require('http-errors');

const { signAccessToken, signRefreshToken } = require('../helpers/JwtHelper');
module.exports ={
    register:async(request,respond,next)=>{
            try{
                const { email} = request.body;
                const result = await authSchema.validateAsync(request.body);
                const Exitst = await User.findOne({email:email});
                if(Exitst) throw createError.Conflict(`${email} is already been registered`);
                const user = new User(result);
                const saveUser = await user.save();

                respond.send(saveUser)

            }catch(error){
                if(error.isJoi === true)error.status = 422
                next(error);
            }
    },

    // getUsers: async(request,respond,next)=>{
    //     try{
    //         const users = await authSchema.find();
    //         respond.send(users);
    //     } catch(error){
    //         console.log(error.message)
    //     }
    // },
   
 login:async(request,respond,next)=>{
    try{
        const result = await authSchema.validateAsync(request.body);
        const user = await User.findOne({email: result.email})
        if(!user) throw createError.NotFound('User not registered');
        
        //checke for matching  password
        const isMatch = await user.isValidPassword(result.password);
        if(!isMatch) throw createError.Unauthorized('Username/Password not valid');
        // respond.send({message: 'Login successful'})
       

       // if password match generate token
        const accessToken = await signAccessToken(user.id);
        const refreshToken = await signRefreshToken(user.id);
        respond.send({ accessToken, refreshToken });
   
        
    }catch(error){
        if(error.isJoi === true) 
            return next(createError.BadRequest('Invalid username/password'));
        next(error)
        
    }
 },

}


