import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { IStage1Data } from "../utils/types/body_data_type"
import { validate_stage_data } from "../utils/validation/type_validator"
import { io } from "../server/socket"
import { check_pm255_global_notification } from "../utils/functions/notifications"
import { jsonToCSV } from "../utils/functions/csvconverter"
import { IChartData } from "../utils/types/chart_type"
import { chartFunction_Global } from "./chart_data/chart_data_global"


const prisma = new PrismaClient()


export const getGlobal_data = async (req: Request, res: Response) => {
    const global_data: IStage1Data[] = await prisma.globalPM.findMany()
    res.send(global_data)
}

export const insertGlobal_data = async (req: Request, res: Response) => {
    const data: IStage1Data = req.body
    const validate_data: boolean = validate_stage_data(data)
    if (validate_data) {
        const data_inserted: IStage1Data = await prisma.globalPM.create({ data })
        io.emit("inserted_global_data", data_inserted)
        res.send(data_inserted)
    } else {
        res.status(500).send("data type error")
    }
}


export const global_realtime_forward = async (req: Request, res: Response) => {
    const data: IStage1Data = req.body;
    if (validate_stage_data(data)) {
        io.emit("global_realtime", data)
        res.send(data)
    } else {
        res.status(500).send("data type error")
    }
}

export const global_export = async (req: Request, res: Response) => {
    const global_data = await prisma.globalPM.findMany({})

    const data_no_id = global_data.map(item => {
        const { id, ...newItem } = item
        return newItem
    })
    const csv_data = jsonToCSV(data_no_id)
    res.send(csv_data)
}



export const getGlobal_chart_data = async (req: Request, res: Response) => {

    const data: IChartData = req.body

    const data_db = await chartFunction_Global(data)

    res.send(data_db)


}