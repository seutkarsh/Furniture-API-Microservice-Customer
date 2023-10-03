import { Application } from "express";
import expressLoader from "./express";
import Logger from "./logger";
import mongooseLoader from "./mongoose";
import DependencyInjector from "./dependencyInjector";
import { Connection } from "mongoose";

export default async (expressApp: Application): Promise<void> => {
	const mongoDBConnection: Connection = await Promise.resolve(
		mongooseLoader(),
	);
	Logger.info("✌️ DB Loaded ✌️");
	await DependencyInjector(mongoDBConnection);
	Logger.info("✌️ Dependency Loaded ✌️");
	await expressLoader(expressApp);
	Logger.info("✌️ Express Loaded ✌️");
};
