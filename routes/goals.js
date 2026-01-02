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
  const p = await Progress.create(req.body);
  res.json(p);
});

router.get("/progress/:id", async (req,res)=>{
  res.json(await Progress.find({goalId:req.params.id}));
});

module.exports = router;
