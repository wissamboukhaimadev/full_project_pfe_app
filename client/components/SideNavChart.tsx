import { navigation_items, navigation_labels } from '@/utils/navigation'
import { Progress } from '@mantine/core'
import { Droplets, ThermometerSun } from 'lucide-react'
import { motion } from "framer-motion"
import { Dispatch, SetStateAction, useState } from 'react'
import { useRouter } from 'next/navigation'


type TSideNav = {
    currentLabel: navigation_labels,
    setCurrentLabel: Dispatch<SetStateAction<navigation_labels>>
}

function SideNavChart() {

    const router = useRouter()

    return (
        <motion.div
            className="side nav flex flex-col mt-3 w-1/6"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.8 }}
        >


            <div className="mt-5 p-5 bg-white  rounded-xl shadow-xl">
                <div className="flex justify-between">
                    <div>
                        <p>Weather</p>
                        <p className="text-xl font-semibold pl-3 mt-2">25%</p>
                    </div>
                    <div>
                        <ThermometerSun />
                    </div>
                </div>
                <Progress className="mt-3 " value={25} size={"lg"} />
            </div>

            <div className="mt-5 p-5 bg-white  rounded-xl shadow-xl">
                <div className="flex justify-between">
                    <div>
                        <p>Humidity</p>
                        <p className="text-xl font-semibold pl-3 mt-2">40%</p>
                    </div>
                    <div>
                        <Droplets />
                    </div>
                </div>
                <Progress className="mt-3 " value={40} color="orange" size={"lg"} />
            </div>

        </motion.div >
    )
}

export default SideNavChart