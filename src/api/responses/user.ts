import { IAddressSchema } from "../../models/Schemas/addressSchema";

export interface ISignUpLoginResponse {
	userId: string;
	token: string;
}

export interface IAddAddressResponse {
	userId: string;
	address: IAddressSchema;
}
