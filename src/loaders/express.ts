import { Application, Request, Response } from "express";
import Router from "../api/index";
import bodyParser from "body-parser";

export default (expressApp: Application): void => {
	expressApp.get("/health", (req: Request, res: Response) => {
		res.status(200).end();
	});

	expressApp.head("/health", (req: Request, res: Response) => {
		res.status(200).end();
	});

	//Body Parser
	expressApp.use(bodyParser.json({ limit: "5mb" }));
	expressApp.use(bodyParser.urlencoded({ extended: true }));

	//Router Group
	expressApp.use(Router());
};
