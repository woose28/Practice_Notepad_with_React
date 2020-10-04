import express from 'express';
import Account from '../models/account';
import bkfd2Password from 'pbkdf2-password';

const router = express();
const hasher = bkfd2Password();

/*
    ACCOUNT SIGNUP: POST /api/account/signup
    BODY SAMPLE: { "username": "test", "password": "test" }
    ERROR CODES:
        1: BAD USERNAME
        2: BAD PASSWORD
        3: USERNAM EXISTS
*/

router.post("/signup", (req, res) => {
  let usernameRegex = /^[0-9a-z]+$/;

  if(!usernameRegex.test(req.body.username)){
    return res.status(400).json({error:"BAD USERNAME", code:1});
  }

  if(req.body.password.length < 4 || typeof req.body.password !== "string"){
    return res.status(400).json({error:"BAD PASSWORD", code:2});
  }


  Account.findOne({username:req.body.username}, (err, exists) => {
    if(err) throw err;
    if(exists){
      return res.status(400).json({error:"USERNAME EXISTS", code:3});
    }

    hasher({password:req.body.password}, function(err, pass, salt, hash){
      let account = new Account({
        username:req.body.username,
        password:hash,
        salt:salt
      });

      account.save(err => {
        if(err) throw err;
        return res.json({success:true});
      });
    });
  });
});

/*
    ACCOUNT SIGNIN: POST /api/account/signin
    BODY SAMPLE: { "username": "test", "password": "test" }
    ERROR CODES:
        1: PASSWORD IS NOT STRING
        2: THERE IS NO USER
        3: PASSWORD IS NOT CORRECT
*/

router.post("/signin", (req, res)=>{
  console.log("/signin으로 요청 들어옴");
  if(typeof req.body.password !== 'string'){
    return res.status(401).json({
      error:"PASSWORD IS NOT STRING",
      code:1
    });
  }
  console.log("db 조회 전");
  Account.findOne({username:req.body.username}, (err, account)=>{
    if(err) {
      console.log("db 조회 에러");
      throw err;
    }
    if(!account){
      console.log("username 없음");
      return res.status(401).json({
        error:"THERE IS NO USER",
        code : 2
      });
    }
    console.log("db조회 성공");
    hasher({password:req.body.password, salt:account.salt}, function(err, pass, salt, hash){
        if(hash === account.password){
          let session = req.session;
          session.loginInfo = {
            _id : account._id,
            username : account.username
          };

          console.log("암호 일치");
          return res.json({success:true});
        }
        else{
          console.log("암호 불일치");
          return res.status(401).json({error:"PASSWORD IS NOT CORRECT", code:3});
        }
    });
  });
});

/*
    GET CURRENT USER INFO GET /api/account/getInfo
    ERROR CODES:
        1: THERE IS NO LOGIN DATA
*/

router.get('/getinfo', (req, res)=>{
  if(typeof req.session.loginInfo === 'undefined'){
    return res.status(401).json({
      error : "THERE IS NO LOGIN DATA",
      code : 1
    });
  }

  res.json({ info : req.session.loginInfo });
});

router.post('/logout', (req, res)=>{
  req.session.destroy(err => { if(err) throw err; });
  return res.json({success:true});
});

export default router;
