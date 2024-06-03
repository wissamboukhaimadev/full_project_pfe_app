

type TNotification_Stage = {
    current: string,
    tension: string,
    puissance_active: string,
    puissance_reactive: string,
    puissance_apparente: string,
    energy: string
}
type TNotification_Amphie = {
    temperature: string
    co2_gaz: string
    humidity: string
}

export interface IStage_Data_Socket_Notifications {
    current: string,
    tension: string,
    puissance_active: string,
    puissance_reactive: string,
    puissance_apparente: string,
    energy: string
    createdAt?: Date
    notification: TNotification_Stage


}

export interface IAmphie_Data_Socket_Notifications {
    temperature: string,
    co2_gaz: string,
    humidity: string,
    createdAt?: Date
    notification: TNotification_Amphie
}


export interface IDataNotifications {
    notification: boolean,
    source: string,
    date: Date
}