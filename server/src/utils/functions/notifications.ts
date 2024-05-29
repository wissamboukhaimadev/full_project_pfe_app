import { io } from "../../server/socket"
import { IAmphieData, IStage1Data } from "../types/body_data_type"
import { IAmphie_Data_Socket_Notifications, IStage_Data_Socket_Notifications } from "../types/notifications"
import { send_email_amphie } from "./notifications/send_email_amphie"
import { send_email_electrotechnique } from "./notifications/send_email_electrotechnique"
import { send_email_ge } from "./notifications/send_email_ge"
import { send_email_pfe_room } from "./notifications/send_email_pfe_room"


export const check_amphie_notification = async (data: IAmphieData) => {
    const result: IAmphie_Data_Socket_Notifications = {
        ...data,
        notification: {
            temperature: "",
            co2_gaz: "",
            humidity: ""
        }
    }

    if (parseInt(result.temperature) > 30) {
        result.notification.temperature = "hey temperature est superieur a 30"




    } else if (parseInt(result.temperature) < 5) {
        result.notification.temperature = "hey temperature est inferieur a 5"

    }

    if (parseInt(result.humidity) > 30) {
        result.notification.humidity = "hey humidity est superieur a 30"

    } else if (parseInt(result.humidity) < 5) {
        result.notification.humidity = "hey humidity est inferieur a 5"


    }

    if (parseInt(result.co2_gaz) > 30) {
        result.notification.co2_gaz = "hey co2_gaz est superieur a 30"

    } else if (parseInt(result.co2_gaz) < 5) {
        result.notification.co2_gaz = "hey co2_gaz est inferieur a 5 "
    }

    if (result.notification.temperature !== "" && result.notification.co2_gaz !== "" && result.notification.humidity !== "") {
        io.emit("amphie_notifications", result.notification)
    }


    if (result.notification.temperature !== "" || result.notification.humidity !== "") {
        // TODO: send mail
        send_email_amphie(result.temperature, result.humidity)
    } else {
        console.log("no_notification \n")
    }

    return result.notification


}
export const check_pm255_global_notification = async (data: IStage1Data) => {
    const result: IStage_Data_Socket_Notifications = {
        ...data, notification: {
            current: "",
            tension: "",
            puissance_active: "",
            puissance_reactive: "",
            puissance_apparente: "",
            energy: ""
        }
    }


    if (parseInt(result.tension) > 30) {
        result.notification.tension = "hey tension est superieur a 30"




    } else if (parseInt(result.tension) < 5) {
        result.notification.tension = "hey tension est inferieur a 5"


    }

    if (parseInt(result.current) > 30) {
        result.notification.current = "hey current est superieur a 30"

    } else if (parseInt(result.current) < 5) {
        result.notification.current = "hey current est inferieur a 5"
    }


    if (result.notification.tension !== "" && result.notification.current) {
        io.emit("global_notifications", result.notification)
    }




    return result.notification


}

export const check_pm255_ge_notification = async (data: IStage1Data) => {
    const result: IStage_Data_Socket_Notifications = {
        ...data, notification: {
            current: "",
            tension: "",
            puissance_active: "",
            puissance_reactive: "",
            puissance_apparente: "",
            energy: ""
        }
    }

    if (parseInt(result.tension) > 30) {
        result.notification.tension = "hey tension est superieur a 30"

    } else if (parseInt(result.tension) < 5) {
        result.notification.tension = "hey tension est inferieur a 5"

    }

    if (parseInt(result.current) > 30) {
        result.notification.current = "hey current est superieur a 30"

    } else if (parseInt(result.current) < 5) {
        result.notification.current = "hey current est inferieur a 5"

    }

    if (result.notification.tension !== "" && result.notification.current) {
        io.emit("stage1_notifications", result.notification)
    }


    if (result.notification.current !== "" || result.notification.tension !== "") {
        // TODO: send mail
        send_email_ge(result.current, result.tension)
    } else {
        console.log("no_notification \n")
    }

    return result.notification

}
export const check_pm255_electrotechnique_notification = async (data: IStage1Data) => {
    const result: IStage_Data_Socket_Notifications = {
        ...data, notification: {
            current: "",
            tension: "",
            puissance_active: "",
            puissance_reactive: "",
            puissance_apparente: "",
            energy: ""
        }
    }

    if (parseInt(result.tension) > 30) {
        result.notification.tension = "hey tension est superieur a 30"


    } else if (parseInt(result.tension) < 5) {
        result.notification.tension = "hey tension est inferieur a 5"

    }

    if (parseInt(result.current) > 30) {
        result.notification.current = "hey current est superieur a 30"

    } else if (parseInt(result.current) < 5) {
        result.notification.current = "hey current est inferieur a 5"

    }

    if (result.notification.tension !== "" && result.notification.current) {
        io.emit("stage2_notifications", result.notification)
    }


    if (result.notification.current !== "" || result.notification.tension !== "") {
        // TODO: send mail
        send_email_electrotechnique(result.current, result.tension)
    } else {
        console.log("no_notification \n")
    }

    return result.notification

}
export const check_pm255_pfe_room_notification = async (data: IStage1Data) => {
    const result: IStage_Data_Socket_Notifications = {
        ...data, notification: {
            current: "",
            tension: "",
            puissance_active: "",
            puissance_reactive: "",
            puissance_apparente: "",
            energy: ""
        }
    }


    if (parseInt(result.tension) > 30) {
        result.notification.tension = "hey tension est superieur a 30"

    } else if (parseInt(result.tension) < 5) {
        result.notification.tension = "hey tension est inferieur a 5"

    }

    if (parseInt(result.current) > 30) {
        result.notification.current = "hey current est superieur a 30"

    } else if (parseInt(result.current) < 5) {
        result.notification.current = "hey current est inferieur a 5"

    }

    if (result.notification.tension !== "" && result.notification.current) {
        io.emit("stage3_notifications", result.notification)
    }

    if (result.notification.current !== "" || result.notification.tension !== "") {
        // TODO: send mail
        send_email_pfe_room(result.current, result.tension)
    } else {
        console.log("no_notification \n")
    }

    return result.notification

}