export type Settings = 'daily' | 'monthly' | 'yearly';

type TDepartment = "GE" | "GBI" | "PFE" | "GlOBAL"

export interface IChartData {
    startDate: Date,
    endDate: Date,
    Department: TDepartment,
    Settings: Settings
}
export interface IChartDataClient {
    day: number,
    month: number,
    year: number,
    settings: Settings
}

export type TDate = {
    year: number,
    month: number,
    day: number
}

export type TEvent = "amphie" | "stage1" | "stage2" | "stage3"