const router = require("express").Router();
const Goal = require("../models/Goal");
const Progress = require("../models/Progress");

router.post("/goals", async (req,res)=>{
  const g = await Goal.create(req.body);
  res.json(g);
});

router.get("/goals", async (req,res)=>{
  res.json(await Goal.find());
});

router.post("/progress", async (req,res)=>{
  const {goalId, date} = req.body;

  let p = await Progress.findOne({goalId, date});
  if(p){
    p.done = true;
    await p.save();
  } else {
    p = await Progress.create({goalId, date, done:true});
  }
  res.json(p);
});


router.get("/progress/:id", async (req,res)=>{
  res.json(await Progress.find({goalId:req.params.id}));
});

router.get("/progress/all", async (req,res)=>{
  res.json(await Progress.find());
});


module.exports = router;
