import { Router } from "express";
import { Container } from "typedi";
import { CustomerService } from "../../services/CustomerService/CustomerService";

export default (router: Router): void => {
	const customerService = Container.get(CustomerService);
};
