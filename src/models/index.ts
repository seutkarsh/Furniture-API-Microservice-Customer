import mongoose from "mongoose";
import UserSchema from "./Schemas/userSchema";
import AddressSchema from "./Schemas/addressSchema";

export const models: Array<{
	name: string;
	model: mongoose.Model<mongoose.Document>;
}> = [UserSchema, AddressSchema];
