import mongoose from "mongoose";
import UserSchema from "./userSchema";

export const models: Array<{
	name: string;
	model: mongoose.Model<mongoose.Document>;
}> = [UserSchema];
