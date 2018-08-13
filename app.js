// 导入express
const express = require('express');

var bodyParser = require('body-parser')

const router = require("./route/managerRoute.js");

const session = require("express-session");

// 实例化 app
let app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    // resave: false,
    // saveUninitialized: true,
    // cookie: { secure: true }
}))
// 托管静态资源
app.use(express.static('static'));

app.use("/manager", router);

// 开启监听
app.listen(8090, () => {
    console.log('success');
})