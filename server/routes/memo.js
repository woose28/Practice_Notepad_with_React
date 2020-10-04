import express from 'express';
import Memo from "../models/memo";
import mongoose from 'mongoose';

const router = express.Router();

// WRITE MEMO
router.post("/", (req, res) => {
  if(typeof req.session.loginInfo === "undefined"){
    return res.status(403).json({
      error : "NOT LOGGED IN",
      code : 1
    });
  }

  if(typeof req.body.contents !== "string"){
    return res.status(400).json({
      error : "CONTENTS IS NOT STRING",
      code : 2
    });
  }

  if(req.body.contents === ""){
    return res.status(400).json({
      error : "EMPTY CONTENTS",
      code : 3
    });
  }

  let memo = Memo({
    writer : req.session.loginInfo.username,
    contents : req.body.contents
  });

  memo.save((err)=>{
    if(err) throw err;
    return res.json({success : true});
  });
});

// MODIFY MEMO
router.put("/:id", (req, res)=>{

});

// DELETE MEMO
router.delete("/:id", (req, res)=>{

});

// GET MEMO LIST
router.get("/", (req, res)=>{

});

export default router;
