import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken"
import config from "../../config";

export default async (req:Request,res:Response,next:NextFunction)=>{
	const signature:string  | undefined= req.get("Authorization")
	if(!signature) throw new Error("Authorization Error")
	const payload = await jwt.verify(signature.split(" ")[1],config.jwt.appSecret)
	req.body.user = payload
	next()
}
