import { Request, Response, Router } from "express";
import { Container } from "typedi";
import {
	IAddressFields,
	ILoginFields,
	ISignupFields,
	UserService,
} from "../../services/UserService/UserService";
import Logger from "../../loaders/logger";
import UserAuthentication from "../middlewares/authentication";

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

	//login
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

	//create Address
	router.post("/address", UserAuthentication,async (req: Request, res: Response) => {
		try {
			const userId: string = req.body.userId.toString();
			const addressFields: IAddressFields = {
				street: req.body.street.toString(),
				postalCode: req.body.postalCode.toString(),
				city: req.body.city.toString(),
				state: req.body.state.toString(),
				country: req.body.toString(),
			};
			const data = await userService.addAddress(userId, addressFields);
		} catch (e) {
			Logger.error(e);
			// @ts-ignore
			response.setError(e);
		}
	});

	//get Profile
	router.post("/profile", UserAuthentication,async (req: Request, res: Response) => {
		try {
			const userId: string = req.body.userId.toString();
			const data = await userService.getUserProfile(userId);
		} catch (e) {
			Logger.error(e);
			// @ts-ignore
			response.setError(e);
		}
	});

	//shopping details
	router.post("/orders", UserAuthentication,async (req: Request, res: Response) => {
		try {
			const userId: string = req.body.userId.toString();
			const data = await userService.getUserOrders(userId);
		} catch (e) {
			Logger.error(e);
			// @ts-ignore
			response.setError(e);
		}
	});

	//get wishlist
	router.post("/wishlist",UserAuthentication,async (req:Request,res:Response)=>{
		try{
			const userId: string = req.body.userId.toString();
			const data = await userService.getUserWishlist(userId);
		}catch (e) {
			Logger.error(e);
			// @ts-ignore
			response.setError(e);
		}
	})
};
