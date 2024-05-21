import { PrismaClient } from "@prisma/client";
import { format, startOfDay } from "date-fns"
import { IChartData, TDate, TEvent } from "../types/chart_type";
import { IAmphieData } from "../types/body_data_type";


const prisma = new PrismaClient()

interface IAmphieDataNumbers {
    temperature: number,
    co2_gaz: number,
    humidity: number,
    createdAt?: Date

}

type TDayMonthYear = {
    [time: string]: IAmphieDataNumbers,
}


export async function getDataForDate_amphie({ startDate, endDate }: IChartData) {
    const date_of_start = new Date(startDate)
    const date_of_end = new Date(endDate)

    try {
        const startDate = startOfDay(new Date(date_of_start.getFullYear(), date_of_start.getMonth(), date_of_start.getDate()));
        const endDate = startOfDay(new Date(date_of_end.getFullYear(), date_of_end.getMonth(), date_of_end.getDate()));
        let average_data: TDayMonthYear = {}
        let average_data_count: TDayMonthYear = {}

        const data = await prisma.amphie.findMany({
            where: {
                createdAt: {
                    gte: startDate,
                    lt: endDate,

                },
            },
        });


        data.forEach(({ createdAt, temperature, co2_gaz, humidity }) => {
            let date = new Date(createdAt)
            let hour = date.getHours().toString()


            if (!average_data[hour]) {
                average_data[hour] = {
                    co2_gaz: 0,
                    humidity: 0,
                    temperature: 0
                }
                average_data_count[hour] = {
                    co2_gaz: 0,
                    humidity: 0,
                    temperature: 0
                }
            }

            average_data[hour].temperature += parseInt(temperature)
            average_data[hour].humidity += parseInt(humidity)
            average_data[hour].co2_gaz += parseInt(co2_gaz)

            average_data_count[hour].temperature += 1
            average_data_count[hour].humidity += 1
            average_data_count[hour].co2_gaz += 1


        })

        const allHours = Array.from({ length: 24 }, (_, index) => index.toString())

        const result: IAmphieData[] = allHours.map(hour => {
            const averageTemperature = average_data[hour] ? average_data[hour].temperature / average_data_count[hour].temperature : 0
            const averageHumidity = average_data[hour] ? average_data[hour].humidity / average_data_count[hour].humidity : 0
            const averageCo2gaz = average_data[hour] ? average_data[hour].co2_gaz / average_data_count[hour].co2_gaz : 0
            let final_result: IAmphieData = {
                temperature: averageTemperature.toString(),
                humidity: averageHumidity.toString(),
                co2_gaz: averageCo2gaz.toString(),

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



export async function getDataForMonth_amphie({ startDate, endDate }: IChartData) {
    const date_of_start = new Date(startDate)
    const date_of_end = new Date(endDate)

    try {
        const startDate = startOfDay(new Date(date_of_start.getFullYear(), date_of_start.getMonth(), date_of_start.getDate()));
        const endDate = startOfDay(new Date(date_of_end.getFullYear(), date_of_end.getMonth(), date_of_end.getDate()));
        let average_data: TDayMonthYear = {}
        let average_data_count: TDayMonthYear = {}


        const data = await prisma.amphie.findMany({
            where: {
                createdAt: {
                    gte: startDate,
                    lt: endDate,
                },
            },
        });


        data.forEach(({ createdAt, temperature, co2_gaz, humidity }) => {
            let date = new Date(createdAt)
            let day_week = format(date, "EEEE")

            if (!average_data[day_week]) {
                average_data[day_week] = {
                    co2_gaz: 0,
                    humidity: 0,
                    temperature: 0
                }
                average_data_count[day_week] = {
                    co2_gaz: 0,
                    humidity: 0,
                    temperature: 0
                }
            }

            average_data[day_week].temperature += parseInt(temperature)
            average_data[day_week].humidity += parseInt(humidity)
            average_data[day_week].co2_gaz += parseInt(co2_gaz)

            average_data_count[day_week].temperature += 1
            average_data_count[day_week].humidity += 1
            average_data_count[day_week].co2_gaz += 1


        })

        const allDaysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

        const result: IAmphieData[] = allDaysOfWeek.map(day_week => {
            const averageTemperature = average_data[day_week] ? average_data[day_week].temperature / average_data_count[day_week].temperature : 0
            const averageHumidity = average_data[day_week] ? average_data[day_week].humidity / average_data_count[day_week].humidity : 0
            const averageCo2gaz = average_data[day_week] ? average_data[day_week].co2_gaz / average_data_count[day_week].co2_gaz : 0
            let final_result: IAmphieData = {
                temperature: averageTemperature.toString(),
                humidity: averageHumidity.toString(),
                co2_gaz: averageCo2gaz.toString(),

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
export async function getDataForYear_amphie({ startDate, endDate }: IChartData) {

    const date_of_start = new Date(startDate)
    const date_of_end = new Date(endDate)

    try {
        const startDate = startOfDay(new Date(date_of_start.getFullYear(), date_of_start.getMonth(), date_of_start.getDate()));
        const endDate = startOfDay(new Date(date_of_end.getFullYear(), date_of_end.getMonth(), date_of_end.getDate()));
        let average_data: TDayMonthYear = {}
        let average_data_count: TDayMonthYear = {}

        const data = await prisma.amphie.findMany({
            where: {
                createdAt: {
                    gte: startDate,
                    lt: endDate,
                },
            },
        });
        data.forEach(({ createdAt, temperature, co2_gaz, humidity }) => {
            let date = new Date(createdAt)
            let month = format(date, "MMMM")
            if (!average_data[month]) {
                average_data[month] = {
                    co2_gaz: 0,
                    humidity: 0,
                    temperature: 0
                }
                average_data_count[month] = {
                    co2_gaz: 0,
                    humidity: 0,
                    temperature: 0
                }
            }

            average_data[month].temperature += parseInt(temperature)
            average_data[month].humidity += parseInt(humidity)
            average_data[month].co2_gaz += parseInt(co2_gaz)

            average_data_count[month].temperature += 1
            average_data_count[month].humidity += 1
            average_data_count[month].co2_gaz += 1


        })

        const allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', "August", "September", "October", "November", "December"]

        const result: IAmphieData[] = allMonths.map(month => {
            const averageTemperature = average_data[month] ? average_data[month].temperature / average_data_count[month].temperature : 0
            const averageHumidity = average_data[month] ? average_data[month].humidity / average_data_count[month].humidity : 0
            const averageCo2gaz = average_data[month] ? average_data[month].co2_gaz / average_data_count[month].co2_gaz : 0
            let final_result: IAmphieData = {
                temperature: averageTemperature.toString(),
                humidity: averageHumidity.toString(),
                co2_gaz: averageCo2gaz.toString(),

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

