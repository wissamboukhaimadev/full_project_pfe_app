import { Indicator, Menu } from '@mantine/core'
import { BellRing, Download, HandCoins, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import NotificationDrawer from './NotificationDrawer'
import { useDisclosure } from '@mantine/hooks'
import { FaFile } from "react-icons/fa";
import ExportDownloadFile from './ExportDownloadFile'


export default function Header() {

    const [opened, { open, close }] = useDisclosure(false)

    const downloadCSVFile = async () => {
        const response = await fetch("http://localhost:4000/api/v1/amphie/export", {
            method: "GET"
        })

        try {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const csvData = await response.text();
            const blob = new Blob([csvData], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'data.csv');

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error(error)
        }


    }

    const router = useRouter()
    return (
        <div className='flex justify-between pl-10 pr-5 bg-white p-5 rounded-xl shadow-lg '>

            <NotificationDrawer opened={opened} close={close} />
            <p className='text-3xl cursor-pointer' onClick={() => {
                router.push("/")
            }}>Logo</p>
            <div className='flex'>
                <Indicator
                    disabled={false}
                    size={15}
                    label="New"
                >
                    <BellRing className='ml-10 cursor-pointer' size={28} onClick={open} />
                </Indicator>

                <ExportDownloadFile />

                <HandCoins className='ml-7 mr-5 cursor-pointer' size={28} />
                {/* <ConsumptionIcon /> */}
            </div>
        </div>
    )
}
