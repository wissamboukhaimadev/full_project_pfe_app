import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { IStage3Data } from "../utils/types/body_data_type"
import { validate_stage_data } from "../utils/validation/type_validator"
import { io } from "../server/socket"
import { jsonToCSV } from "../utils/functions/csvconverter"
import { IChartData } from "../utils/types/chart_type"
import { chartFunction_PfeRoom } from "./chart_data/chart_data_pfe_room"
import { check_pm255_pfe_room_notification } from "../utils/functions/notifications"
import { IDataNotifications } from "../utils/types/notifications"



const prisma = new PrismaClient()
export const getPfeRoom_data = async (req: Request, res: Response) => {
    const stage3_data: IStage3Data[] = await prisma.pFERoom.findMany()
    res.send(stage3_data)
}


export const insertPfeRoom_data = async (req: Request, res: Response) => {
    const data: IStage3Data = req.body
    const validate_data: boolean = validate_stage_data(data)
    if (validate_data) {
        const data_inserted: IStage3Data = await prisma.pFERoom.create({ data })
        const isNotified = check_pm255_pfe_room_notification(data)
        if (isNotified) {
            const dataNotification: IDataNotifications = {
                notification: false,
                date: new Date(),
                source: "PFE ROOM"
            }
            io.emit("pfe_room_notification", dataNotification)
        }
        res.send(data_inserted)
    } else {
        res.status(500).send("data type error")
    }
}

export const PfeRoom_realtime_forward = async (req: Request, res: Response) => {
    const data: IStage3Data = req.body;
    if (validate_stage_data(data)) {
        io.emit("stage3_realtime", data)
        res.send(data)
    } else {
        res.status(500).send("data type error")
    }
}

export const PfeRoom_export = async (req: Request, res: Response) => {
    const stage3_data = await prisma.pFERoom.findMany({})

    const data_no_id = stage3_data.map(item => {
        const { id, ...newItem } = item
        return newItem
    })
    const csv_data = jsonToCSV(data_no_id)
    res.send(csv_data)
}



export const getPFE_chart_data = async (req: Request, res: Response) => {

    const data: IChartData = req.body

    const data_db = await chartFunction_PfeRoom(data)

    data_db.map(value => {
        value.puissance_active = String(parseInt(value.puissance_active) * 100)
        value.puissance_reactive = String(parseInt(value.puissance_reactive) * 100)
        value.puissance_apparente = String(parseInt(value.puissance_apparente) * 100)
    })

    res.send(data_db)


}