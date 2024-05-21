import { PrismaClient } from "@prisma/client";
import { format, startOfDay } from "date-fns"
import { IChartData } from "../types/chart_type";
import { IStage1Data } from "../types/body_data_type";


const prisma = new PrismaClient()

interface IStage1DataNumbers {
    current: number,
    tension: number,
    puissance_active: number,
    puissance_reactive: number,
    puissance_apparente: number,
    energy: number,
    createdAt?: Date

}

type TDayMonthYear = {
    [time: string]: IStage1DataNumbers,
}


export async function getDataForDate_gbi({ startDate, endDate }: IChartData) {
    const date_of_start = new Date(startDate)
    const date_of_end = new Date(endDate)

    try {
        const startDate = startOfDay(new Date(date_of_start.getFullYear(), date_of_start.getMonth(), date_of_start.getDate()));
        const endDate = startOfDay(new Date(date_of_end.getFullYear(), date_of_end.getMonth(), date_of_end.getDate()));
        let average_data: TDayMonthYear = {}
        let average_data_count: TDayMonthYear = {}

        const data = await prisma.gBIDepartment.findMany({
            where: {
                createdAt: {
                    gte: startDate,
                    lt: endDate,

                },
            },
        });

        data.forEach(({ createdAt, current, tension, puissance_active, puissance_reactive, puissance_apparente, energy }) => {
            let date = new Date(createdAt)
            let hour = date.getHours().toString()

            if (!average_data[hour]) {
                average_data[hour] = {
                    current: 0,
                    tension: 0,
                    puissance_active: 0,
                    puissance_reactive: 0,
                    puissance_apparente: 0,
                    energy: 0,
                }
                average_data_count[hour] = {
                    current: 0,
                    tension: 0,
                    puissance_active: 0,
                    puissance_reactive: 0,
                    puissance_apparente: 0,
                    energy: 0,
                }
            }

            average_data[hour].current += parseInt(current)
            average_data[hour].tension += parseInt(tension)
            average_data[hour].puissance_active += parseInt(puissance_active)
            average_data[hour].puissance_reactive += parseInt(puissance_reactive)
            average_data[hour].puissance_apparente += parseInt(puissance_apparente)
            average_data[hour].energy += parseInt(energy)

            average_data_count[hour].current += 1
            average_data_count[hour].tension += 1
            average_data_count[hour].puissance_active += 1
            average_data_count[hour].puissance_reactive += 1
            average_data_count[hour].puissance_apparente += 1
            average_data_count[hour].energy += 1


        })

        const allHours = Array.from({ length: 24 }, (_, index) => index.toString())

        const result: IStage1Data[] = allHours.map(hour => {
            const averageCurrent = average_data[hour] ? average_data[hour].current / average_data_count[hour].current : 0
            const averageTension = average_data[hour] ? average_data[hour].tension / average_data_count[hour].tension : 0
            const averageActivePower = average_data[hour] ? average_data[hour].puissance_active / average_data_count[hour].puissance_active : 0
            const averageReactivePower = average_data[hour] ? average_data[hour].puissance_reactive / average_data_count[hour].puissance_reactive : 0
            const averageApparentPower = average_data[hour] ? average_data[hour].puissance_apparente / average_data_count[hour].puissance_apparente : 0
            const averageEnergy = average_data[hour] ? average_data[hour].energy / average_data_count[hour].energy : 0
            let final_result: IStage1Data = {
                current: averageCurrent.toString(),
                tension: averageTension.toString(),
                puissance_active: averageActivePower.toString(),
                puissance_reactive: averageReactivePower.toString(),
                puissance_apparente: averageApparentPower.toString(),
                energy: averageEnergy.toString(),

            }
            return final_result
        })
        return result;
    } catch (error) {
        console.error(error);
        throw new Error('Error retrieving data for the date.');
    } finally {
        await prisma.$disconnect();
    }
}



export async function getDataForMonth_gbi({ startDate, endDate }: IChartData) {
    const date_of_start = new Date(startDate)
    const date_of_end = new Date(endDate)

    try {
        const startDate = startOfDay(new Date(date_of_start.getFullYear(), date_of_start.getMonth(), date_of_start.getDate()));
        const endDate = startOfDay(new Date(date_of_end.getFullYear(), date_of_end.getMonth(), date_of_end.getDate()));
        let average_data: TDayMonthYear = {}
        let average_data_count: TDayMonthYear = {}


        const data = await prisma.gBIDepartment.findMany({
            where: {
                createdAt: {
                    gte: startDate,
                    lt: endDate,
                },
            },
        });

        data.forEach(({ createdAt, current, tension, puissance_active, puissance_reactive, puissance_apparente, energy }) => {
            let date = new Date(createdAt)
            let day_week = format(date, "EEEE")

            if (!average_data[day_week]) {
                average_data[day_week] = {
                    current: 0,
                    tension: 0,
                    puissance_active: 0,
                    puissance_reactive: 0,
                    puissance_apparente: 0,
                    energy: 0,
                }
                average_data_count[day_week] = {
                    current: 0,
                    tension: 0,
                    puissance_active: 0,
                    puissance_reactive: 0,
                    puissance_apparente: 0,
                    energy: 0,
                }
            }

            average_data[day_week].current += parseInt(current)
            average_data[day_week].tension += parseInt(tension)
            average_data[day_week].puissance_active += parseInt(puissance_active)
            average_data[day_week].puissance_reactive += parseInt(puissance_reactive)
            average_data[day_week].puissance_apparente += parseInt(puissance_apparente)
            average_data[day_week].energy += parseInt(energy)

            average_data_count[day_week].current += 1
            average_data_count[day_week].tension += 1
            average_data_count[day_week].puissance_active += 1
            average_data_count[day_week].puissance_reactive += 1
            average_data_count[day_week].puissance_apparente += 1
            average_data_count[day_week].energy += 1


        })

        const allDaysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]


        const result: IStage1Data[] = allDaysOfWeek.map(day_of_week => {
            const averageCurrent = average_data[day_of_week] ? average_data[day_of_week].current / average_data_count[day_of_week].current : 0
            const averageTension = average_data[day_of_week] ? average_data[day_of_week].tension / average_data_count[day_of_week].tension : 0
            const averageActivePower = average_data[day_of_week] ? average_data[day_of_week].puissance_active / average_data_count[day_of_week].puissance_active : 0
            const averageReactivePower = average_data[day_of_week] ? average_data[day_of_week].puissance_reactive / average_data_count[day_of_week].puissance_reactive : 0
            const averageApparentPower = average_data[day_of_week] ? average_data[day_of_week].puissance_apparente / average_data_count[day_of_week].puissance_apparente : 0
            const averageEnergy = average_data[day_of_week] ? average_data[day_of_week].energy / average_data_count[day_of_week].energy : 0
            let final_result: IStage1Data = {
                current: averageCurrent.toString(),
                tension: averageTension.toString(),
                puissance_active: averageActivePower.toString(),
                puissance_reactive: averageReactivePower.toString(),
                puissance_apparente: averageApparentPower.toString(),
                energy: averageEnergy.toString(),

            }
            return final_result
        })

        return result;
    } catch (error) {
        console.error(error);
        throw new Error('Error retrieving data for the date.');
    } finally {
        await prisma.$disconnect();
    }
}
export async function getDataForYear_gbi({ startDate, endDate }: IChartData) {

    const date_of_start = new Date(startDate)
    const date_of_end = new Date(endDate)

    try {
        const startDate = startOfDay(new Date(date_of_start.getFullYear(), date_of_start.getMonth(), date_of_start.getDate()));
        const endDate = startOfDay(new Date(date_of_end.getFullYear(), date_of_end.getMonth(), date_of_end.getDate()));
        let average_data: TDayMonthYear = {}
        let average_data_count: TDayMonthYear = {}

        const data = await prisma.gBIDepartment.findMany({
            where: {
                createdAt: {
                    gte: startDate,
                    lt: endDate,
                },
            },
        });
        data.forEach(({ createdAt, current, tension, puissance_active, puissance_reactive, puissance_apparente, energy }) => {
            let date = new Date(createdAt)
            let month = format(date, "MMMM")

            if (!average_data[month]) {
                average_data[month] = {
                    current: 0,
                    tension: 0,
                    puissance_active: 0,
                    puissance_reactive: 0,
                    puissance_apparente: 0,
                    energy: 0,
                }
                average_data_count[month] = {
                    current: 0,
                    tension: 0,
                    puissance_active: 0,
                    puissance_reactive: 0,
                    puissance_apparente: 0,
                    energy: 0,
                }
            }

            average_data[month].current += parseInt(current)
            average_data[month].tension += parseInt(tension)
            average_data[month].puissance_active += parseInt(puissance_active)
            average_data[month].puissance_reactive += parseInt(puissance_reactive)
            average_data[month].puissance_apparente += parseInt(puissance_apparente)
            average_data[month].energy += parseInt(energy)

            average_data_count[month].current += 1
            average_data_count[month].tension += 1
            average_data_count[month].puissance_active += 1
            average_data_count[month].puissance_reactive += 1
            average_data_count[month].puissance_apparente += 1
            average_data_count[month].energy += 1


        })

        const allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', "August", "September", "October", "November", "December"]

        const result: IStage1Data[] = allMonths.map(month => {
            const averageCurrent = average_data[month] ? average_data[month].current / average_data_count[month].current : 0
            const averageTension = average_data[month] ? average_data[month].tension / average_data_count[month].tension : 0
            const averageActivePower = average_data[month] ? average_data[month].puissance_active / average_data_count[month].puissance_active : 0
            const averageReactivePower = average_data[month] ? average_data[month].puissance_reactive / average_data_count[month].puissance_reactive : 0
            const averageApparentPower = average_data[month] ? average_data[month].puissance_apparente / average_data_count[month].puissance_apparente : 0
            const averageEnergy = average_data[month] ? average_data[month].energy / average_data_count[month].energy : 0
            let final_result: IStage1Data = {
                current: averageCurrent.toString(),
                tension: averageTension.toString(),
                puissance_active: averageActivePower.toString(),
                puissance_reactive: averageReactivePower.toString(),
                puissance_apparente: averageApparentPower.toString(),
                energy: averageEnergy.toString(),

            }
            return final_result
        })

        return result;
    } catch (error) {
        console.error(error);
        throw new Error('Error retrieving data for the date.');
    } finally {
        await prisma.$disconnect();
    }
}

