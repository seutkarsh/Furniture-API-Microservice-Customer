import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../../config";

export const UserAuthorization = async (
	req: Request,
	res: Response,
	next: (args?: Error) => void,
) => {
	const signature: string | undefined = req.get("Authorization");
	if (signature) {
		req.body.user = await jwt.verify(
			signature.split(" ")[1],
			config.jwt.appSecret,
		);

		return next();
	} else return next(new UnauthorizedError(new Error("Authorization Error")));
};

export class UnauthorizedError extends Error {
	status: number;

	constructor(error: Error) {
		super(error.message);
		this.status = 401;
		this.name = "UnauthorizedError";
	}
}
