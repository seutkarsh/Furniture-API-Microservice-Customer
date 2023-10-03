import mongoose, { Connection, Document } from "mongoose";
import { Container } from "typedi";

const UserSchema = new mongoose.Schema(
	{
		email: String,
		password: String,
		salt: String,
		phone: String,
		address: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "address",
				require: true,
			},
		],
		cart: [
			{
				product: {
					_id: { type: String, require: true },
					name: { type: String },
					banner: { type: String },
					price: { type: Number },
				},
				unit: { type: Number, require: true },
			},
		],
		wishlist: [
			{
				_id: { type: String, require: true },
				name: { type: String },
				description: { type: String },
				banner: { type: String },
				available: { type: Boolean },
				price: { type: Number },
			},
		],
		orders: [
			{
				_id: { type: String, required: true },
				amount: { type: String },
				date: { type: Date, default: Date.now() },
			},
		],
	},
	{
		toJSON: {
			transform(doc, ret) {
				delete ret.password;
				delete ret.salt;
				delete ret.__v;
			},
		},
		timestamps: true,
	},
);

export interface IProduct {
	_id: string;
	name: string;
	banner: string;
	price: number;
}

export interface ICardItem {
	product: IProduct;
	unit: number;
}

export interface IWishlistItem {
	_id: string;
	name: string;
	description: string;
	banner: string;
	available: boolean;
	price: number;
}
export interface IOrderItem {
	_id: string;
	amount: number;
	date: Date;
}
export interface IUserSchema extends Document {
	email: string;
	password: string;
	salt: string;
	phone: string;
	address: string[];
	cart: ICardItem[];
	wishlist: IWishlistItem[];
	orders: IOrderItem[];
}

export default {
	name: "UserSchema",
	model: Container.get<Connection>(
		"mongoDBConnection",
	).model<mongoose.Document>("UserSchema", UserSchema, "users"),
};
