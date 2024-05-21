import { getDataForDate_global, getDataForMonth_global, getDataForYear_global } from "../../utils/chart_filters/functions_global";
import { IChartData } from "../../utils/types/chart_type";

export const chartFunction_Global = async (data: IChartData) => {

    const dataArgs: IChartData = {
        startDate: data.startDate,
        endDate: data.endDate,
        Department: "GE",
        Settings: data.Settings

    }

    if (data.Settings === "daily") {
        const data_db = await getDataForDate_global(dataArgs)
        return data_db
    } else if (data.Settings === "monthly") {
        const data_db = await getDataForMonth_global(dataArgs)
        return data_db
    } else {
        const data_db = await getDataForYear_global(dataArgs)
        return data_db
    }

}