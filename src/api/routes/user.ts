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
import {
	IAddAddressResponse,
	ISignUpLoginResponse,
	IUserOrdersResponse,
	IUserProfileResponse,
	IUserWishlistResponse,
} from "../responses/user";

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
			const response = new ResponseWrapper<IAddAddressResponse>();
			try {
				const userId: string = req.body.userId.toString();
				const addressFields: IAddressFields = {
					street: req.body.street.toString(),
					postalCode: req.body.postalCode.toString(),
					city: req.body.city.toString(),
					state: req.body.state.toString(),
					country: req.body.country.toString(),
				};
				const data: IAddAddressResponse = await userService.addAddress(
					userId,
					addressFields,
				);
				response.setData(data);
			} catch (e) {
				Logger.error(e.message);
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
			const response = new ResponseWrapper();
			try {
				const userId: string = req.body.userId.toString();
				const data: IUserProfileResponse =
					await userService.getUserProfile(userId);
				response.setData(data);
			} catch (e) {
				Logger.error(e.message);
				response.setError(e.message);
			}
			res.json(response);
		},
	);

	//shopping details
	router.post(
		"/orders",
		UserAuthorization,
		async (req: Request, res: Response) => {
			const response = new ResponseWrapper<IUserOrdersResponse>();
			try {
				const userId: string = req.body.userId.toString();
				const data: IUserOrdersResponse =
					await userService.getUserOrders(userId);
				response.setData(data);
			} catch (e) {
				Logger.error(e.message);
				response.setError(e.message);
			}
			res.json(response);
		},
	);

	//get wishlist
	router.post(
		"/wishlist",
		UserAuthorization,
		async (req: Request, res: Response) => {
			const response = new ResponseWrapper<IUserWishlistResponse>();
			try {
				const userId: string = req.body.userId.toString();
				const data: IUserWishlistResponse =
					await userService.getUserWishlist(userId);
				response.setData(data);
			} catch (e) {
				Logger.error(e.message);
				response.setError(e.message);
			}
			res.json(response);
		},
	);
};
