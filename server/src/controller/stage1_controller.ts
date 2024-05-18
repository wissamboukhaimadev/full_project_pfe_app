import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { IStage1Data } from "../utils/types/body_data_type"
import { validate_stage_data } from "../utils/validation/type_validator"
import { io } from "../server/socket"
import { check_pm255_stage1_notification } from "../utils/functions/notifications"
import { jsonToCSV } from "../utils/functions/csvconverter"


const prisma = new PrismaClient()


export const getStage1_data = async (req: Request, res: Response) => {
    const stage1_data: IStage1Data[] = await prisma.stage1.findMany()
    res.send(stage1_data)
}

export const insertStage1_data = async (req: Request, res: Response) => {
    const data: IStage1Data = req.body
    const validate_data: boolean = validate_stage_data(data)
    if (validate_data) {
        const data_inserted: IStage1Data = await prisma.stage1.create({ data })
        io.emit("inserted_stage1_data", data_inserted)
        res.send(data_inserted)
    } else {
        res.status(500).send("data type error")
    }
}

export const stage1_realtime_forward = async (req: Request, res: Response) => {
    const data: IStage1Data = req.body;
    if (validate_stage_data(data)) {
        check_pm255_stage1_notification(data)
        io.emit("stage1_realtime", data)
        res.send(data)
    } else {
        res.status(500).send("data type error")
    }
}

export const stage1_export = async (req: Request, res: Response) => {
    const stage1_data = await prisma.stage1.findMany({})

    const data_no_id = stage1_data.map(item => {
        const { id, ...newItem } = item
        return newItem
    })
    const csv_data = jsonToCSV(data_no_id)
    res.send(stage1_data)
}