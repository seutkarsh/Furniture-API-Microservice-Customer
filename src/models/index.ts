import mongoose from "mongoose";
import UserSchema from "./userSchema";
import AddressSchema from "./addressSchema";

export const models: Array<{
	name: string;
	model: mongoose.Model<mongoose.Document>;
}> = [UserSchema, AddressSchema];
