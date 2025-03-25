const mongoose = require('mongoose'); //import mongoose to use it in our models
const Schema = mongoose.Schema; //creating our schema to handle complex user data

//creating a schema to represent our collection in the database
const studentSchema = new Schema({
    FirstName:{
        type : String,
        required: [true, 'FirstName is required']
    },
    LastName:{
        type: String,
        required: [true, 'LastName required']
    },
    Gender:{
        type: String,
        required: [true, 'Gender is required']
    }
});

//creating a model to represent our collection in the database
const Student = mongoose.model('students',studentSchema);

//exporting models file so we can use it in other files
module.exports = Student;