import mongoose, { ConnectOptions } from "mongoose";
import Logger from "./logger";
import config from "../config";

export default async (): Promise<typeof mongoose> => {
	const options: ConnectOptions = {
		dbName: config.mongo.db.name,
	};
	const authSource = config.mongo.authDbName;
	if (authSource) {
		const user = config.mongo.username;
		const password = config.mongo.password;
		if (user && password) {
			options.authSource = authSource;
			options.auth = { user, password };
		}
	}

	Logger.debug(
		`Connecting to DB at ${
			config.mongo.uri
		} with options : ${JSON.stringify(options)}`,
	);
	return mongoose.connect(config.mongo.uri, options);
};
