const express = require('express');
const cors = require('cors');
const user = require("../routes/user");
const connectDb = require("../config/dbconnection");
const blogRoutes = require('../routes/blogRoutes');
const crud = require('../routes/crud')
const college = require('../routes/college')
const {cloudinaryConnect }= require("../config/cloudinary")
require("dotenv").config();
const eventRoutes = require("../routes/eventRoutes")
const homepageRoutes = require("../routes/homepageRoutes")
const collegeRep=require('../routes/collegeRep')
const app = express();

const corsOptions = {
    // origin: "https://event-sphere-g11.vercel.app",
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
    allowedHeaders:["Content-Type"],
    credentials: true,
};


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


const PORT = process.env.PORT || 3000;

app.use("/api/auth", user);
app.use("/api/blog", blogRoutes);
app.use("/api/users", crud);
app.use("/api/college",college)
app.use("/api/event",eventRoutes);
app.use("/api/asd",eventRoutes)
app.use("/api/home",homepageRoutes);
app.use("/api/collegeRep",collegeRep)


app.get("/", (req, res) => {
    res.send("Working");
})


connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at port: ${PORT}`);
    });
});

module.exports = app;
