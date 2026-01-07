const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authroutes");
const categoryRoutes = require("./routes/categoryRoutes");
const requestRoutes = require("./routes/requestRoutes"); 

const app = express(); 

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* DATABASE */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));


app.use("/api/auth", authRoutes);       
app.use("/api/category", categoryRoutes); 
app.use("/api/requests", requestRoutes); 

app.get("/", (req, res) => {
  res.send("API Running");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
