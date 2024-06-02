const express = require('express');
const cors = require('cors');
const helmet = require('helmet')
require('dotenv').config()
const cookieParser = require('cookie-parser');
const userRouter = require('./routers/usersroute')

const port = process.env.PORT
const app = express()
//app.use(helmet());
app.use(cookieParser());
app.use(express.json());

app.use(cors({origin: true
}));


const db = require("./db")

app.get("/", (req, res) => {
	res.send("Hello World!")
})

app.use('/api/user',userRouter)


app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})