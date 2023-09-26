import { Application } from "express";
import expressLoader from "./express";
import Logger from "./logger";
import mongooseLoader from "mongoose";

export default async (expressApp: Application): Promise<void> => {
	await mongooseLoader;
	Logger.info("✌️ DB Loaded ✌️");
	await expressLoader(expressApp);
	Logger.info("✌️ Express Loaded ✌️");
};
