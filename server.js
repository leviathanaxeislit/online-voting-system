const express = require('express');
const cors = require('cors');
const helmet = require('helmet')
require('dotenv').config()
const cookieParser = require('cookie-parser');
const userRouter = require('./routers/usersroute')

const port = process.env.PORT;
const app = express();

// Uncomment helmet if needed and ensure it's configured properly
// app.use(helmet());

app.use(cookieParser());
app.use(express.json());

// Configure CORS with specific origin and credentials
app.use(cors({
  origin: 'https://onlinevotingsystemclient.vercel.app', // Client origin
  credentials: true, // Allow credentials (cookies, authorization headers, TLS client certificates)
}));

const db = require("./db");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/api/user', userRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
