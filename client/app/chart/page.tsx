"use client"

import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import BarChart from '@/components/charts/BarChart'
import Header from '@/components/Header'
import { DatePickerInput } from '@mantine/dates'

import '@mantine/dates/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import { ActionIcon, Button, MultiSelect, Popover, Select } from '@mantine/core'
import { Search } from "lucide-react"
import SideNavChart from '@/components/SideNavChart'
import { IAmphieData } from '@/types/socket_types'
import socket from '@/utils/socket'
import base_url from '@/utils/http'


type TSettings = "daily" | "monthly" | "yearly"




export default function Chart() {

    const pathname = usePathname()


    const [disablAnimations, setDisabelAnimations] = useState<boolean>(true)


    const [startDateValue, setStartDateValue] = useState<Date | null>(null)
    const [endDateValue, setEndDateValue] = useState<Date | null>(null)

    const [departmentValue, setDepartmentValue] = useState<string | null>(null)
    const [showValue, setShowValue] = useState<string[]>([])
    const [labelsFormat, setLabelsFormat] = useState<string | null>(null)

    const [dataDatabase, setDatatDatabase] = useState([])

    const [amphie_data, setAmphie_Data] = useState<IAmphieData>({})



    const router = useRouter()

    useEffect(() => {

        socket.on("amphie_realtime", (data: IAmphieData) => {
            setAmphie_Data(data)
        })

        let interval: any
        if (!disablAnimations) {

            if (!disablAnimations) {
                interval = setInterval(() => {
                    router.push('/');
                }, 5000);
            }
        }
        return () => {
            clearInterval(interval)
            socket.off("amphie_realtime")
        }
        // }



    }, [router, disablAnimations, pathname])

    const handleSearch = async () => {
        if (departmentValue != null && showValue != null && labelsFormat != null && startDateValue != null && endDateValue != null) {
            let settings: TSettings = "daily"
            let urlEndopoint = base_url

            if (labelsFormat === "hours of day") {
                settings = "daily"
            } else if (labelsFormat === 'days of the week') {
                settings = "monthly"
            } else {
                settings = "yearly"
            }
            const data = {
                "startDate": startDateValue,
                "endDate": endDateValue,
                "Department": departmentValue,
                "Settings": settings
            }
            if (departmentValue === "Amphi") {
                urlEndopoint = `${base_url}/api/v1/amphie/chart`
            } else if (departmentValue === "GE") {
                urlEndopoint = `${base_url}/api/v1/ge_department/chart`
            } else if (departmentValue === "ELECTROTECHNIQUE") {
                urlEndopoint = `${base_url}/api/v1/gbi_department/chart`
            } else {
                urlEndopoint = `${base_url}/api/v1/pfe_room/chart`
            }
            const response = await fetch(urlEndopoint, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json', // Specify JSON content type
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data)
            })

            const data_json = await response.json()

            console.log(data_json)
            setDatatDatabase(data_json)



        } else {
            console.error("data not complete")
        }
    }


    return (
        <div className="bg-pprimbg pt-5 px-5 h-screen">
            <Header
                disablAnimations={disablAnimations}
                setDisabelAnimations={setDisabelAnimations}
            />
            <div className="flex">
                <SideNavChart amphie_data={amphie_data} />

                <div className="flex-grow mx-10 p-5 bg-white mt-5">
                    <div>
                        <div className="flex justify-between mb-2">
                            <div></div>
                            <div className="flex">
                                <Popover>
                                    <Popover.Target>
                                        <Button>set properties</Button>
                                    </Popover.Target>
                                    <Popover.Dropdown>
                                        <div className="flex">
                                            <Select
                                                label="Set Department"
                                                value={departmentValue}
                                                onChange={setDepartmentValue}
                                                placeholder="Pick value"
                                                data={['GE', 'ELECTROTECHNIQUE', 'P & A & P']}
                                                comboboxProps={{ withinPortal: false }}
                                            />
                                            <MultiSelect
                                                className="ml-5"
                                                label="Set Values To Show"
                                                value={showValue}
                                                onChange={setShowValue}
                                                placeholder="Pick value"
                                                data={['Current', 'Tension', 'puissance_active', 'puissance_reactive', 'puissance_apparente']}
                                                comboboxProps={{ withinPortal: false }}
                                            />
                                            <Select
                                                className="ml-5"
                                                label="Select Data Format"
                                                value={labelsFormat}
                                                onChange={setLabelsFormat}
                                                placeholder="Pick value"
                                                data={[
                                                    'hours of day',
                                                    'days of the week',
                                                    'months of the year',
                                                ]}
                                                comboboxProps={{ withinPortal: false }}
                                            />
                                        </div>
                                    </Popover.Dropdown>
                                </Popover>

                                <div className="flex ml-3">
                                    <DatePickerInput
                                        placeholder="Select initial Date"
                                        value={startDateValue}
                                        onChange={setStartDateValue}
                                        dropdownType="modal"
                                    />
                                    <DatePickerInput
                                        placeholder="Select final Date"
                                        value={endDateValue}
                                        onChange={setEndDateValue}
                                        className="ml-3"
                                        dropdownType="modal"
                                    />
                                </div>

                                <ActionIcon
                                    variant="filled"
                                    size="lg"
                                    aria-label="Search"
                                    color="gray"
                                    className="ml-3"
                                    onClick={handleSearch}
                                >
                                    <Search />
                                </ActionIcon>
                            </div>
                        </div>

                        <BarChart
                            data_database={dataDatabase}
                            selectedDepartment={departmentValue}
                            labelsFormat={labelsFormat}
                            showValue={showValue}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
