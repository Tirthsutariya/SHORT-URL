const express = require("express");
const router = require("./routes/url")
const dbConnection = require("./connection");
const URL = require("./model/url")
const path = require("path");
const staticRoute = require("./routes/staticRouter")
const userRoute = require("./routes/user");
const cookieParser = require("cookie-parser");
const {restrictToLoggedInUserOnly,checkAuth}=require("./middleware/auth")

const app = express()
const PORT = 8001;

dbConnection("mongodb://127.0.0.1:27017/short")
.then(()=>{
    console.log("DB Connected");
})

app.set("view engine","ejs");
app.set("views",path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());


app.use('/url', restrictToLoggedInUserOnly,router);
app.use('/user', userRoute);
app.use('/',checkAuth, staticRoute);


app.get("/url/:shortId",async(req,res)=>{
    const shortId = req.params.shortId;
    const entry=await URL.findOneAndUpdate({
        shortId
    },{$push:{
        visitHistory:{
            timestamp:Date.now()
        },
    }})
    if(!entry) return res.json({err:"not entry"})
    res.redirect(entry.redirectUrl)
})


app.listen(PORT, ()=>console.log(`Server Started AT PORT:${PORT}`))
