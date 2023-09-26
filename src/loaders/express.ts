import { Application, Request, Response } from "express";
import Router from "../api/index";

export default (expressApp: Application): void => {
	expressApp.get("/health", (req: Request, res: Response) => {
		res.status(200).end();
	});

	expressApp.head("/health", (req: Request, res: Response) => {
		res.status(200).end();
	});

	//Router Group
	expressApp.use(Router());
};
