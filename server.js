const express = require('express');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const userRouter = require('./routers/usersroute');

const port = process.env.PORT || 3000;
const app = express();

app.use(helmet()); // Security middleware
app.use(cookieParser());
app.use(express.json());

// CORS Configuration
app.use(cors({
    origin: ['http://localhost:3000', 'https://onlinevotingsystemclient.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

const db = require('./db');


app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use('/api/user', userRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
