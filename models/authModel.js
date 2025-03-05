const mongoose = require('mongoose');
const Schema = mongoose.Schema;// Mongoose Schema Object
const bcrypt = require('bcrypt');// Bcrypt Schema Object

//creating user schema to represent our collection in the database
const userSchema = Schema({
    email:{
        type: String,
        required:[true, 'email is required'],
    },
    password:{
        type:String,
        required:[true,'password is required']
    }
});

userSchema.pre('save', async function(next){
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedpwd = await bcrypt.hash(this.password,salt);
        this.password = hashedpwd;
        next()
    } catch(error){
        next(error);
    }
})

//comparing the entered password and one saved in the DB
userSchema.methods.isValidPassword = async function (password){
    try{
        return await bcrypt.compare(password,this.password);
    } catch(error){
        throw error;
    }
}
//creating  model instance 
const User = mongoose.model('user', userSchema);
module.exports = User;

