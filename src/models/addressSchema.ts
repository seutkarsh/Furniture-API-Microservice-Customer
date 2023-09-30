import mongoose, {Connection,Document} from "mongoose";
import {Container} from "typedi";
import config from "../config";

const AddressSchema= new mongoose.Schema({
	street: {
		type: String,
		require: true,
	},
	postalCode: {
		type: String,
		require: true,
	},
	city: {
		type: String,
		require: true,
	},
	state: {
		type: String,
		require: true,
	},
	country: {
		type: String,
		require: true,
	},
});

export interface IAddressSchema extends Document{
	street: string;
	postalCode: string;
	city: string;
	state: string;
	country: string;
}

export default {
	name:"AddressSchema",
	model:Container.get<Connection>(config.mongo.db.name).model(
	"AddressSchema",
	AddressSchema,
	"address",
),
}
