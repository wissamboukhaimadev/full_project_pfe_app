import { getDataForDate_amphie, getDataForMonth_amphie, getDataForYear_amphie } from "../../utils/chart_filters/functions_amphie";
import { IChartData } from "../../utils/types/chart_type";

export const chartFunction_Amphie = async (data: IChartData) => {


    const dataArgs: IChartData = {
        startDate: data.startDate,
        endDate: data.endDate,
        Department: "GE",
        Settings: data.Settings

    }

    if (data.Settings === "daily") {
        const data_db = await getDataForDate_amphie(dataArgs)
        return data_db
    } else if (data.Settings === "monthly") {
        const data_db = await getDataForMonth_amphie(dataArgs)
        return data_db
    } else {
        const data_db = await getDataForYear_amphie(dataArgs)
        return data_db
    }
}