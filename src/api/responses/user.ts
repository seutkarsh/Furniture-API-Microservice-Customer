import { IAddressSchema } from "../../models/Schemas/addressSchema";
import {
	IOrderItem,
	IUserSchema,
	IWishlistItem,
} from "../../models/Schemas/userSchema";

export interface ISignUpLoginResponse {
	userId: string;
	token: string;
}

export interface IAddAddressResponse {
	userId: string;
	address: IAddressSchema;
}

export interface IUserProfileResponse {
	userDetails: IUserSchema;
}

export interface IUserOrdersResponse {
	userId: string;
	orders: IOrderItem[];
}

export interface IUserWishlistResponse {
	userId: string;
	wishlist: IWishlistItem[];
}
