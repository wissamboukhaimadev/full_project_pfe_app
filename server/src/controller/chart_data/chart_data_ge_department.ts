import { getDataForDate_ge, getDataForMonth_ge, getDataForYear_ge } from "../../utils/chart_filters/functions_ge_department";
import { IChartData } from "../../utils/types/chart_type";

export const chartFunction_GEDepartment = async (data: IChartData) => {

    const dataArgs: IChartData = {
        startDate: data.startDate,
        endDate: data.endDate,
        Department: "GE",
        Settings: data.Settings

    }


    if (data.Settings === "daily") {
        const data_db = await getDataForDate_ge(dataArgs)
        return data_db
    } else if (data.Settings === "monthly") {
        const data_db = await getDataForMonth_ge(dataArgs)
        return data_db
    } else {
        const data_db = await getDataForYear_ge(dataArgs)
        return data_db
    }

}
