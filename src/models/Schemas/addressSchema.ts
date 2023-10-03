import mongoose, { Connection } from "mongoose";
import { Container } from "typedi";

const AddressSchema = new mongoose.Schema({
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

export interface IAddressSchema {
	street: string;
	postalCode: string;
	city: string;
	state: string;
	country: string;
}

export default {
	name: "AddressSchema",
	model: Container.get<Connection>(
		"mongoDBConnection",
	).model<mongoose.Document>("AddressSchema", AddressSchema, "address"),
};
