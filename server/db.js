const mongoose = require('mongoose');
const { Blog, User } = require('./schemas.js');

const main = async () => {
    await mongoose.connect(`mongodb+srv://maciejkloda98:9nAB1nJuzGWdol61@blog.4zeqqjk.mongodb.net/Blog?retryWrites=true&w=majority&appName=blog`);
}
const getData = async () => {
    return Blog.find();
}

const getUser = async (loginInfo) => {
    return User.findOne({login:loginInfo});
}


const insertUser = async (login, hashedPassword) => {
    await User.collection.insertOne({
        login: login,
        password: hashedPassword,
    })


}

const insertData = async (  data  ) => {
    await Blog.collection.insertOne({
        title: data.title,
        text: data.text,
        user: data.user
    })
}

const deletePost = async (title) => {
    return Blog.deleteOne({title:title})
}


main().catch(err => console.log(err));

module.exports = { getData, getUser, insertUser, insertData,deletePost };




