import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { IStage1Data } from "../utils/types/body_data_type"
import { validate_stage_data } from "../utils/validation/type_validator"
import { io } from "../server/socket"
import { jsonToCSV } from "../utils/functions/csvconverter"
import { IChartData } from "../utils/types/chart_type"
import { chartFunction_GEDepartment } from "./chart_data/chart_data_ge_department"
import { check_pm255_ge_notification } from "../utils/functions/notifications"
import { IDataNotifications } from "../utils/types/notifications"


const prisma = new PrismaClient()



export const getGEDepatment_data = async (req: Request, res: Response) => {
    const stage1_data: IStage1Data[] = await prisma.gEDepartment.findMany()
    res.send(stage1_data)
}

export const insertGEDepatment_data = async (req: Request, res: Response) => {
    const data: IStage1Data = req.body

    const validate_data: boolean = validate_stage_data(data)
    if (validate_data) {
        const data_inserted: IStage1Data = await prisma.gEDepartment.create({ data })
        const isnotified = check_pm255_ge_notification(data)
        if (isnotified) {
            const dataNotification: IDataNotifications = {
                notification: false,
                date: new Date(),
                source: "GE Department"
            }
            io.emit("ge_department_notification", dataNotification)
        }

        res.send(data_inserted)
    } else {
        res.status(500).send("data type error")
    }

}

export const GEDepatment_realtime_forward = async (req: Request, res: Response) => {
    const data: IStage1Data = req.body;
    if (validate_stage_data(data)) {

        io.emit("stage1_realtime", data)
        res.send(data)
    } else {
        res.status(500).send("data type error")
    }
}

export const GEDepatment_export = async (req: Request, res: Response) => {
    const stage1_data = await prisma.gEDepartment.findMany({})

    const data_no_id = stage1_data.map(item => {
        const { id, ...newItem } = item
        return newItem
    })
    const csv_data = jsonToCSV(data_no_id)
    res.send(csv_data)
}


export const getGe_chart_data = async (req: Request, res: Response) => {

    const data: IChartData = req.body

    const data_db = await chartFunction_GEDepartment(data)
    data_db.map(value => {
        value.puissance_active = String(parseInt(value.puissance_active) * 100)
        value.puissance_reactive = String(parseInt(value.puissance_reactive) * 100)
        value.puissance_apparente = String(parseInt(value.puissance_apparente) * 100)
    })

    res.send(data_db)


}