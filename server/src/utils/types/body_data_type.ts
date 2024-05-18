export interface IAmphieData {
    id?: number,
    temperature: string,
    co2_gaz: string,
    humidity: string,
    createdAt?: Date

}

export interface IStage1Data {
    id?: number,
    current: string,
    tension: string,
    puissance_active: string,
    puissance_reactive: string,
    puissance_apparente: string,
    energy: string
    createdAt?: Date
}
export interface IStage2Data {
    id?: number,
    current: string,
    tension: string,
    puissance_active: string,
    puissance_reactive: string,
    puissance_apparente: string,
    energy: string
    createdAt?: Date
}
export interface IStage3Data {
    id?: number,
    current: string,
    tension: string,
    puissance_active: string,
    puissance_reactive: string,
    puissance_apparente: string,
    energy: string
    createdAt?: Date
}


export interface IUserData {
    username: string
    password: string
}