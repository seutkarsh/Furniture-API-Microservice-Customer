import { Request, Response, Router } from "express";
import { Container } from "typedi";
import {
	IAddressFields,
	ILoginFields,
	ISignupFields,
	UserService,
} from "../../services/UserService/UserService";
import Logger from "../../loaders/logger";
import { UserAuthorization } from "../middlewares/authorization";
import { ResponseWrapper } from "../responses/responseWrapper";
import { ISignUpLoginResponse } from "../responses/user";

export default (router: Router): void => {
	const userService = Container.get(UserService);

	//signup
	router.post("/signup", async (req: Request, res: Response) => {
		const response = new ResponseWrapper<ISignUpLoginResponse>();
		try {
			const signupFields: ISignupFields = {
				email: req.body.email,
				mobile: req.body.mobile,
				password: req.body.password,
			};

			const data: ISignUpLoginResponse =
				await userService.signUp(signupFields);
			response.setData(data);
		} catch (e) {
			Logger.error(e.message);
			response.setError(e.message);
		}
		res.json(response);
	});

	//login
	router.post("/login", async (req: Request, res: Response) => {
		const response = new ResponseWrapper<ISignUpLoginResponse>();
		try {
			const loginFields: ILoginFields = {
				email: req.body.email.toString(),
				password: req.body.password.toString(),
			};
			const data: ISignUpLoginResponse =
				await userService.login(loginFields);
			response.setData(data);
		} catch (e) {
			Logger.error(e.message);
			response.setError(e.message);
		}
		res.json(response);
	});

	//create Address
	router.post(
		"/address",
		UserAuthorization,
		async (req: Request, res: Response) => {
			const response = new ResponseWrapper();
			try {
				const userId: string = req.body.userId.toString();
				const addressFields: IAddressFields = {
					street: req.body.street.toString(),
					postalCode: req.body.postalCode.toString(),
					city: req.body.city.toString(),
					state: req.body.state.toString(),
					country: req.body.toString(),
				};
				const data = await userService.addAddress(
					userId,
					addressFields,
				);
				response.setData(data);
			} catch (e) {
				Logger.error(e);
				// @ts-ignore
				response.setError(e.message);
			}
			res.json(response);
		},
	);

	//get Profile
	router.post(
		"/profile",
		UserAuthorization,
		async (req: Request, res: Response) => {
			try {
				const userId: string = req.body.userId.toString();
				const data = await userService.getUserProfile(userId);
			} catch (e) {
				Logger.error(e);
				// @ts-ignore
				response.setError(e);
			}
		},
	);

	//shopping details
	router.post(
		"/orders",
		UserAuthorization,
		async (req: Request, res: Response) => {
			try {
				const userId: string = req.body.userId.toString();
				const data = await userService.getUserOrders(userId);
			} catch (e) {
				Logger.error(e);
				// @ts-ignore
				response.setError(e);
			}
		},
	);

	//get wishlist
	router.post(
		"/wishlist",
		UserAuthorization,
		async (req: Request, res: Response) => {
			try {
				const userId: string = req.body.userId.toString();
				const data = await userService.getUserWishlist(userId);
			} catch (e) {
				Logger.error(e);
				// @ts-ignore
				response.setError(e);
			}
		},
	);
};
