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
  console.log("/api/memo/ 호출 됨");
  Memo.find().sort({"_id" : -1}).limit(6).exec((err, memos)=> {
    if(err) throw err;
    console.log("정상 반환");
    return res.json(memos);
  });
});

router.get("/:listType/:id", (req, res) => {
  let listType = req.params.listType;
  let id = req.params.id;

  if(listType !== "old" && listType !== "new"){
    return res.status(400).json({
      error : "INVALID LISTTYPE",
      code : 1
    });
  }

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({
      error : "INVALID ID",
      code : 2
    });
  }

  let objID = new mongoose.Types.ObjectId(id);

  if(listType === "new"){
    Memo.find({ _id : { $gt : objId}}).sort({_id:-1}).limit(6)
    .exec((err, memos) => {
      if(err) throw err;
      return res.json(memos);
    });
  }
  else{
    Memo.find().sort({_id : { $lt : objId}}).limit(6)
    .exec((err, memos) => {
      if(err) throw err;
      return res.json(memos);
    });
  }

});

export default router;
