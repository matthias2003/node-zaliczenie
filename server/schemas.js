const mongoose = require('mongoose');
const { ObjectId } = require('mongodb')

const blogSchema = new mongoose.Schema({
    _id : ObjectId,
    title : {type:String,unique:true},
    text : String,
    user : String
})

const userCredentialsSchema = new mongoose.Schema({
    _id: ObjectId,
    login: {type: String, required: true, unique:true},
    password: {type: String, required: true}
});

const Blog = mongoose.model("Blog", blogSchema, "Blog");
const User = mongoose.model("UsersCredentials",userCredentialsSchema,"UsersCredentials");

module.exports = { Blog, User };