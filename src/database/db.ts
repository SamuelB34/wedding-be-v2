import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()
const DB_URI = process.env.DB_URI || "mongodb://localhost:27017/messages"

const connect = (): void => {
	const connect = (): void => {
		mongoose.connect(DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		} as mongoose.ConnectOptions)
		const db = mongoose.connection

		db.on("error", () => console.log("Connection error 💥💥💥"))
		db.once("open", function () {
			console.log("Connected to the database! ✅✅✅")
		})
	}

	connect()
}

export default { connect }
