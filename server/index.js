const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { getData, getUser, insertUser,insertData,deletePost } = require("./db")
const cookieParser = require("cookie-parser");
const {forEach} = require("react-bootstrap/ElementChildren");


const port = process.env.PORT || 3001 ;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

app.get("/", async ( req, res)  => {
    const data = await getData();
    res.send(data);
})

app.post("/login", async (req, res) => {
    const loginData = req.body.formData;
    if (!loginData.password || !loginData.login) {
        return "Not all fields have been filled in";
    }

    const userData = await getUser(loginData.login);
    if (userData && ( await bcrypt.compare(loginData.password, userData.password))) {
        res.json( { status:true });
    } else {
        res.json({status:false});
    }
})

app.post("/register", async (req, res) => {
    const { login, password, confirmPassword } = req.body.formData;
    if (login && password) {
        if (password === confirmPassword) {

        if (!await getUser(login)) {
                    const hashedPassword = await bcrypt.hash(password,10);
                    await insertUser(login, hashedPassword);
                    res.send('User successfully added');
        } else {
            res.send("This login is already taken");
        }
        } else {
            res.send("Passwords doesn't match");
        }
    } else {
        res.send("Not all fields are fill in");
    }
})

app.post("/post", async (req,res) => {
    const { data } = req.body;
    let status = 200;
    try {
        await insertData(data)
    } catch (err) {
        status = 406;
    }
    res.sendStatus(status);
})

app.post("/delete", async (req,res) => {
    const { title } = req.body;
    await deletePost(title);
    res.sendStatus(200);
})

app.listen(port);