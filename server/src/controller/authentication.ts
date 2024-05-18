import { Request, Response } from "express";
import { validate_user_data } from "../utils/validation/type_validator";
import { IUserData } from "../utils/types/body_data_type";
import { PrismaClient } from "@prisma/client";
import { createHash } from "crypto"


const prisma = new PrismaClient()

export const adminAuthentication = async (req: Request, res: Response) => {
    const user: IUserData = req.body
    const { username, password } = user

    if (validate_user_data(user)) {
        const user_database = await prisma.user.findFirst({
            where: {
                username: username
            }
        })

        if (user_database) {

            const hashed_password = createHash('sha256').update(password).digest("base64")
            if (hashed_password == user_database.password) {
                res.status(200).send("user autheticated successufully")
            } else {
                res.status(500).send("password or user is not correct")
            }

        } else {
            res.status(404).send("user not found")
        }
    } else {
        res.status(500).send("body data type error")
    }

}