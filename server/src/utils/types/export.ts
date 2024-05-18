type Settings = 'daily' | 'monthly' | 'yearly';

export interface IExport_Choose_date {
    day: number,
    month: number,
    year: number,
    settings: Settings
}