import { getDataForDate_pfe, getDataForMonth_pfe, getDataForYear_pfe, } from "../../utils/chart_filters/functions_pfe_room";
import { IChartData } from "../../utils/types/chart_type";

export const chartFunction_PfeRoom = async (data: IChartData) => {


    const dataArgs: IChartData = {
        startDate: data.startDate,
        endDate: data.endDate,
        Department: "GE",
        Settings: data.Settings

    }

    if (data.Settings === "daily") {
        const data_db = await getDataForDate_pfe(dataArgs)
        return data_db
    } else if (data.Settings === "monthly") {
        const data_db = await getDataForMonth_pfe(dataArgs)
        return data_db
    } else {
        const data_db = await getDataForYear_pfe(dataArgs)
        return data_db
    }


}