import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { IAmphieData } from "../utils/types/body_data_type"
import { validate_amphie_data } from "../utils/validation/type_validator"
import { io } from "../server/socket"
import { check_amphie_notification } from "../utils/functions/notifications"
import { jsonToCSV } from "../utils/functions/csvconverter"
import { IChartData } from "../utils/types/chart_type"
import { getDataForDate_amphie } from "../utils/chart_filters/functions_amphie"
import { chartFunction_Amphie } from "./chart_data/chart_data_amphie"


const prisma = new PrismaClient()


export const getAmphi_data = async (req: Request, res: Response) => {
    const amphie_data = await prisma.amphie.findMany({})

    res.send(amphie_data)
}

export const insertAmphi_data = async (req: Request, res: Response) => {
    const data: IAmphieData = req.body;
    const valid_data = validate_amphie_data(data)
    if (valid_data) {
        const data_inserted = await prisma.amphie.create({
            data
        })
        check_amphie_notification(data)
        res.send(data_inserted)
    } else {
        res.status(500).send("data type error")
    }
}


export const amphie_realtime_forward = async (req: Request, res: Response) => {
    const data: IAmphieData = req.body;

    if (validate_amphie_data(data)) {

        io.emit("amphie_realtime", data)
        res.send(data)
    } else {
        res.status(500).send("data type error")
    }
}

export const amphie_export = async (req: Request, res: Response) => {
    const amphie_data: IAmphieData[] = await prisma.amphie.findMany()

    const data_no_id = amphie_data.map(item => {
        const { id, ...newItem } = item
        return newItem
    })
    const csv_data = jsonToCSV(data_no_id)
    res.send(csv_data)

}



export const getAmphie_chart_data = async (req: Request, res: Response) => {

    const data: IChartData = req.body

    const data_db = await chartFunction_Amphie(data)

    res.send(data_db)


}
