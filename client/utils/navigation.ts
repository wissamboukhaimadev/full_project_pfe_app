export type navigation_labels = "Dashboard" | "GE_department" | "Electrotechnique" | "P & A & P" | "Amphie"

interface INavigationItems {
    label: navigation_labels
}



export const navigation_items: INavigationItems[] = [
    {
        label: "Amphie"
    },
    {
        label: "Dashboard"
    },
    {
        label: "GE_department"
    },
    {
        label: "Electrotechnique"
    },
    {
        label: "P & A & P"
    },

]