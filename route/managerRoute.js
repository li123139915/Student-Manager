const express = require("express");

const path = require("path");

const helper = require("../tools/helper.js")

const svgCaptcha = require('svg-captcha');

let router = express.Router();

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "../template/login.html"))
})

router.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "../template/register.html"));
})
router.post("/register", (req, res) => {
    let userName = req.body.userName;
    let password = req.body.password;
    helper.find("manager", { userName }, (result) => {
        if (result.length == 0) {
            helper.insert("manager", { userName, password }, (result) => {
                // res.send(result);
                if (result.result.n == 1) {
                    helper.tips(res, "注册成功", "/manager/login")
                }
            })
        } else {
            helper.tips(res, "抱歉,您输入的账号已存在,请重新输入", "/manager/register")
        }
    });
})
router.post("/login",(req,res)=>{
    let userName=req.body.userName; 
    let password=req.body.password; 
    let vCode=req.body.vCode;
    if(vCode==req.session.captcha){
        helper.find("manager",{userName,password},(result)=>{
            if(result.length!=0){
                helper.tips(res,"登录成功","/manager/index");
            }
        })
    }else{
        helper.tips(res,"您输入的验证码有误,请重新输入","/manager/login");
    }
})
// 获取验证码并且存储在session内
router.get('/vCode', function (req, res) {
    var captcha = svgCaptcha.create();
    // 将获取到的验证码保存进session内,再登录判断时使用
    req.session.captcha = captcha.text.toLowerCase();
	res.type('svg'); // 使用ejs等模板时如果报错 res.type('html')
	res.status(200).send(captcha.data);
});
module.exports = router;
