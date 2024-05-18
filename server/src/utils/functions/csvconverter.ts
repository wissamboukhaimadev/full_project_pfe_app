import fs from "fs";

export const jsonToCSV = (amphie_json: any[]) => {
    if (amphie_json.length > 0) {
        const headers = Object.keys(amphie_json[0]).toString()
        let main = amphie_json.map(item => Object.values(item).toString())

        const csv = [headers, ...main].join("\n")

        fs.writeFile("/Users/user/Desktop/pfe/pprim_project/server/result.csv", csv, err => {
            if (err) {
                console.error(err)
            } else {
                console.log("write is succesfull")
            }
        })
        return csv
    }

    return ""
}
