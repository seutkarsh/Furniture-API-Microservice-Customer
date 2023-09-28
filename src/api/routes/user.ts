import { Request, Response, Router } from "express";
import { Container } from "typedi";
import {
	ILoginFields,
	ISignupFields,
	UserService,
} from "../../services/UserService/UserService";
import Logger from "../../loaders/logger";

export default (router: Router): void => {
	const userService = Container.get(UserService);

	//signup
	router.post("/signup", async (req: Request, res: Response) => {
		try {
			const signupFields: ISignupFields = {
				email: req.body.email,
				mobile: req.body.mobile,
				password: req.body.password,
			};

			const data = await userService.signUp(signupFields);
		} catch (e) {
			Logger.error(e);
			// @ts-ignore
			response.setError(e);
		}
	});

	router.post("/login", async (req: Request, res: Response) => {
		try {
			const loginFields: ILoginFields = {
				email: req.body.email.toString(),
				password: req.body.email.toString(),
			};
			const data = await userService.login(loginFields);
		} catch (e) {
			Logger.error(e);
			// @ts-ignore
			response.setError(e);
		}
	});
};
