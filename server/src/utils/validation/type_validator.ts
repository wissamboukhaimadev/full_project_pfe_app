import { IAmphieData, IStage1Data, IUserData } from "../types/body_data_type";

export const validate_amphie_data = (data: IAmphieData) => {
    if ((data.temperature && typeof data.temperature === "string") && (data.co2_gaz &&
        typeof data.co2_gaz === "string") && (data.humidity && typeof data.humidity === "string")) {
        return true;
    } else {
        return false
    }
}



export const validate_stage_data = (data: IStage1Data) => {
    if ((data.current && typeof data.current === "string")
        && (data.tension && typeof data.tension === "string")
        && (data.puissance_active && typeof data.puissance_active === "string")
        && (data.energy && typeof data.energy === "string")
        && (data.puissance_active && typeof data.puissance_active === "string")
        && (data.puissance_reactive && typeof data.puissance_reactive === "string")
        && (data.puissance_apparente && typeof data.puissance_apparente === "string")
    ) {
        return true;
    } else {
        return false
    }
}



export const validate_user_data = ({ username, password }: IUserData) => {
    if ((username && typeof username === "string") && password && typeof password === "string") {
        return true
    } else {
        return false
    }
}
