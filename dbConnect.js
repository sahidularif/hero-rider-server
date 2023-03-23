const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const DB = 'mongodb://127.0.0.1:27017/hero-rider';
const DBURL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.or4h7.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

const dbConnect = () => {
	const db = mongoose.connection
	mongoose.connect(
		DB,
		{ useNewUrlParser: true, useUnifiedTopology: true },
		() => {
			console.log("connected to mongodb");
		}
	);
};


module.exports = dbConnect;