import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { IStage2Data } from "../utils/types/body_data_type"
import { validate_stage_data } from "../utils/validation/type_validator"
import { io } from "../server/socket"
import { check_pm255_stage2_notification } from "../utils/functions/notifications"
import { jsonToCSV } from "../utils/functions/csvconverter"
import { chartFunction_GBIDepartment } from "./chart_data/chart_data_gbi_department"
import { IChartData } from "../utils/types/chart_type"


const prisma = new PrismaClient()

export const getGbiDepartment_data = async (req: Request, res: Response) => {
    const stage2_data: IStage2Data[] = await prisma.gBIDepartment.findMany()
    res.send(stage2_data)
}


export const insertGbiDepartment_data = async (req: Request, res: Response) => {
    const data: IStage2Data = req.body
    const validate_data: boolean = validate_stage_data(data)
    if (validate_data) {
        const data_inserted: IStage2Data = await prisma.gBIDepartment.create({ data })
        check_pm255_stage2_notification(data)
        res.send(data_inserted)
    } else {
        res.status(500).send("data type error")
    }
}


export const GbiDepartment_realtime_forward = async (req: Request, res: Response) => {
    const data: IStage2Data = req.body;
    if (validate_stage_data(data)) {
        io.emit("stage2_realtime", data)
        res.send(data)
    } else {
        res.status(500).send("data type error")
    }
}

export const GbiDepartment_export = async (req: Request, res: Response) => {
    const stage2_data = await prisma.gBIDepartment.findMany({})

    const data_no_id = stage2_data.map(item => {
        const { id, ...newItem } = item
        return newItem
    })
    const csv_data = jsonToCSV(data_no_id)
    res.send(csv_data)
}



export const getGBI_chart_data = async (req: Request, res: Response) => {

    const data: IChartData = req.body

    const data_db = await chartFunction_GBIDepartment(data)

    res.send(data_db)


}