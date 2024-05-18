"use client"

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import BarChart from '@/components/charts/BarChart'
import Header from '@/components/Header'
import SideNav from '@/components/SideNav'
import { navigation_labels } from '@/utils/navigation'
import { DatePickerInput } from '@mantine/dates'

import '@mantine/dates/styles.css';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Button, Popover, Select } from '@mantine/core'



export default function Chart() {

    const [currentLabel, setCurrentLabel] = useState<navigation_labels>("Dashboard")
    const [startDateValue, setStartDateValue] = useState<Date | null>(null)
    const [endDateValue, setEndDateValue] = useState<Date | null>(null)

    const [departmentValue, setDepartmentValue] = useState<string | null>("")
    const [showValue, setShowValue] = useState<string | null>("")

    const router = useRouter()

    useEffect(() => {

        const interval = setInterval(() => {
            router.push('/');
        }, 5000);

        return () => clearInterval(interval);

    }, [router])



    return (
        <div
            className="bg-pprimbg pt-5 px-5 "
        >
            <Header />
            <div className="flex">

                <SideNav currentLabel={currentLabel} setCurrentLabel={setCurrentLabel} />

                <div className='flex-grow mx-10 p-5 bg-white mt-5'>

                    <div>

                        <div className='flex justify-between mb-2'>
                            <div>

                                <Popover>
                                    <Popover.Target>
                                        <Button>set properties</Button>
                                    </Popover.Target>
                                    <Popover.Dropdown>
                                        <div className='flex'>
                                            <Select
                                                label="Set Department"
                                                value={departmentValue}
                                                onChange={setDepartmentValue}
                                                placeholder="Pick value"
                                                data={['Electricity', 'Biology', 'tech']}
                                                comboboxProps={{ withinPortal: false }}

                                            />
                                            <Select
                                                className='ml-5'
                                                label="Set Values To Show"
                                                value={showValue}
                                                onChange={setShowValue}
                                                placeholder="Pick value"
                                                data={['Current', 'Tension']}
                                                comboboxProps={{ withinPortal: false }}

                                            />
                                        </div>
                                    </Popover.Dropdown>
                                </Popover>
                            </div>
                            <div className='flex '>
                                <DatePickerInput
                                    placeholder="Select initial Date"
                                    value={startDateValue}
                                    onChange={setStartDateValue}
                                    className='bg-red-200 '
                                />
                                <DatePickerInput
                                    placeholder="Select final Date"
                                    value={endDateValue}
                                    onChange={setEndDateValue}
                                    className='bg-red-200 ml-2'
                                />
                            </div>

                        </div>

                        <BarChart />
                    </div>
                </div>
            </div>


        </div>
    )
}
