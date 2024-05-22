const mongoose = require("mongoose")
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => console.log("Database connection successed!"))
	.catch((err) => {
		console.log(err)
	});

const db = mongoose.connection;

module.exports = db;