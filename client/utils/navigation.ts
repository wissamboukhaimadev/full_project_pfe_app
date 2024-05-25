export type navigation_labels = "Dashboard" | "GE_department" | "GBI_department" | "PFE_room" | "Amphie"

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
        label: "GBI_department"
    },
    {
        label: "PFE_room"
    },

]