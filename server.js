const express = require("express");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI);

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.use("/api", require("./routes/goals"));

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
