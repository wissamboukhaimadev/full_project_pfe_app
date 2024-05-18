import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { IStage3Data } from "../utils/types/body_data_type"
import { validate_stage_data } from "../utils/validation/type_validator"
import { io } from "../server/socket"
import { check_pm255_stage3_notification } from "../utils/functions/notifications"
import { jsonToCSV } from "../utils/functions/csvconverter"



const prisma = new PrismaClient()
export const getStage3_data = async (req: Request, res: Response) => {
    const stage3_data: IStage3Data[] = await prisma.stage3.findMany()
    res.send(stage3_data)
}


export const insertStage3_data = async (req: Request, res: Response) => {
    const data: IStage3Data = req.body
    const validate_data: boolean = validate_stage_data(data)
    if (validate_data) {
        const data_inserted: IStage3Data = await prisma.stage3.create({ data })
        io.emit("inserted_stage3_data", data_inserted)
        res.send(data_inserted)
    } else {
        res.status(500).send("data type error")
    }
}

export const stage3_realtime_forward = async (req: Request, res: Response) => {
    const data: IStage3Data = req.body;
    if (validate_stage_data(data)) {
        check_pm255_stage3_notification(data)
        io.emit("stage3_realtime", data)
        res.send(data)
    } else {
        res.status(500).send("data type error")
    }
}

export const stage3_export = async (req: Request, res: Response) => {
    const stage3_data = await prisma.stage3.findMany({})

    const data_no_id = stage3_data.map(item => {
        const { id, ...newItem } = item
        return newItem
    })
    const csv_data = jsonToCSV(data_no_id)
    res.send(stage3_data)
}