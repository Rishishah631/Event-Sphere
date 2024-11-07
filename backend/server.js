const express = require('express');
const cors = require('cors');
const user = require("./routes/user");
const connectDb = require("./config/dbconnection");
require("dotenv").config();

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/api/auth", user);
 
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at port: ${PORT}`);
    });
});