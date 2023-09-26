import dotenv from "dotenv";
import * as procress from "process";

const envFound = dotenv.config();

if (!envFound) {
	throw new Error("⚠️ Couldn't Find ENV File ⚠️");
}

export default {
	apiEndpoint: procress.env.API_ENDPOINT || "http://localhost",
	port: parseInt(procress.env.PORT || "3000", 10) || 3000,
	logs: {
		level: procress.env.LOG_LEVEL || "silly",
	},
	mongo: {
		uri: process.env.MONGODB_URI || "mongodb://localhost:27017/",
		authDbName: process.env.MONGODB_URI_AUTH_DB_NAME || null,
		username: process.env.MONGODB_URI_AUTH_USERNAME || null,
		password: process.env.MONGODB_URI_AUTH_PASSWORD || null,
		db: {
			name: "furniture-products",
		},
	},
};
