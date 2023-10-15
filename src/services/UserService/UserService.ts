import { Container, Service } from "typedi";
import mongoose, { Model } from "mongoose";
import { IUserSchema } from "../../models/Schemas/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";
import { IAddressSchema } from "../../models/Schemas/addressSchema";

@Service()
export class UserService {
	private userSchema: Model<IUserSchema & mongoose.Document> =
		Container.get("UserSchema");
	private addressSchema: Model<IAddressSchema & mongoose.Document> =
		Container.get("AddressSchema");

	//userSignup
	async signUp(userDetails: ISignupFields) {
		//field validations
		const existingUser: IUserSchema | null = await this.findUserByEmail(
			userDetails.email,
		);

		if (existingUser)
			throw new Error(UserServiceError.SIGNUP_USER_ALREADY_EXISTS);

		const salt: string = await this.generateSalt();
		const password: string = await this.generateSecurePassword(
			userDetails.password,
			salt,
		);
		const userData: IUserCreationDetails = {
			email: userDetails.email,
			mobile: userDetails.mobile,
			password: password,
			salt: salt,
		};
		const user: IUserSchema = await this.createUser(userData);
		const token: string = await this.generateSignature({
			email: user.email,
			_id: user._id,
		});
		return { userId: user._id, token: token };
	}

	async login(userDetails: ILoginFields) {
		//fields validation
		const existingUser: IUserSchema | null = await this.findUserByEmail(
			userDetails.email,
		);

		if (!existingUser)
			throw new Error(UserServiceError.LOGIN_USER_NOT_EXISTS);

		const validPassword: boolean = await this.validateUserPassword(
			userDetails,
			existingUser,
		);
		if (!validPassword) throw new Error(UserServiceError.WRONG_PASSWORD);

		const token: string = await this.generateSignature({
			email: existingUser.email,
			_id: existingUser._id,
		});
		return { userId: existingUser._id, token: token };
	}

	async addAddress(userId: string, addressFields: IAddressFields) {
		//address field validations
		const user = await this.findUserById(userId);
		if (!user) throw new Error(UserServiceError.INVALID_USER_ID);

		const address = await this.addressSchema.create(addressFields);
		const addressObjectReference: mongoose.Types.ObjectId =
			mongoose.Types.ObjectId(address.id);
		await this.userSchema.findByIdAndUpdate(userId, {
			$push: { address: addressObjectReference },
		});
		return { userId: userId, address: address };
	}

	async getUserProfile(userId: string) {
		const user = await this.findUserById(userId);
		if (!user) throw new Error(UserServiceError.INVALID_USER_ID);
		return { userDetails: user };
	}

	async getUserOrders(userId: string) {
		const user = await this.findUserById(userId);
		if (!user) throw new Error(UserServiceError.INVALID_USER_ID);
		return {
			userId: user.id,
			orders: user.orders,
		};
	}

	async getUserWishlist(userId: string) {
		const user = await this.findUserById(userId);
		if (!user) throw new Error(UserServiceError.INVALID_USER_ID);
		return {
			userId: user.id,
			wishlist: user.wishlist,
		};
	}
	private async findUserByEmail(email: string) {
		return this.userSchema.findOne({ email: email });
	}

	private async findUserById(userId: string) {
		return this.userSchema.findById(userId);
	}

	private async generateSalt() {
		return bcrypt.genSalt();
	}

	private async generateSecurePassword(password: string, salt: string) {
		return bcrypt.hash(password, salt);
	}

	private async createUser(userData: IUserCreationDetails) {
		return this.userSchema.create(userData);
	}

	private async generateSignature(payload: object) {
		return jwt.sign(payload, config.jwt.appSecret, { expiresIn: "30d" });
	}

	private async validateUserPassword(
		userInput: ILoginFields,
		userInfo: IUserSchema,
	) {
		const generatedPassword = await this.generateSecurePassword(
			userInput.password,
			userInfo.salt,
		);
		return generatedPassword === userInfo.password;
	}
}

export interface ISignupFields {
	email: string;
	mobile: string;
	password: string;
}
export interface ILoginFields {
	email: string;
	password: string;
}

export interface IUserCreationDetails {
	email: string;
	password: string;
	mobile: string;
	salt: string;
}
export interface IAddressFields {
	street: string;
	postalCode: string;
	city: string;
	state: string;
	country: string;
}
export interface IJwtTokenPayload {
	_id: string;
	email: string;
}

export enum UserServiceError {
	SIGNUP_USER_ALREADY_EXISTS = "User already exists by this email, please Login",
	LOGIN_USER_NOT_EXISTS = "No user exists by this email, please SignUp",
	WRONG_PASSWORD = "Wrong Password",
	INVALID_USER_ID = "Invalid User ID",
}
