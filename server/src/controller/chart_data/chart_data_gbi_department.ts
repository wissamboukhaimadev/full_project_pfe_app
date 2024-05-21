import { getDataForDate_gbi, getDataForMonth_gbi, getDataForYear_gbi } from "../../utils/chart_filters/functions_gbi_department";
import { IChartData } from "../../utils/types/chart_type";

export const chartFunction_GBIDepartment = async (data: IChartData) => {

    const dataArgs: IChartData = {
        startDate: data.startDate,
        endDate: data.endDate,
        Department: "GE",
        Settings: data.Settings

    }

    if (data.Settings === "daily") {
        const data_db = await getDataForDate_gbi(dataArgs)
        return data_db
    } else if (data.Settings === "monthly") {
        const data_db = await getDataForMonth_gbi(dataArgs)
        return data_db
    } else {
        const data_db = await getDataForYear_gbi(dataArgs)
        return data_db
    }

}