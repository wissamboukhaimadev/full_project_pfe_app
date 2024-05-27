import { navigation_items, navigation_labels } from '@/utils/navigation'
import { Progress } from '@mantine/core'
import { Droplets, ThermometerSun } from 'lucide-react'
import { motion } from "framer-motion"
import { Dispatch, SetStateAction, useState } from 'react'
import { useRouter } from 'next/navigation'
import { IAmphieData } from '@/types/socket_types'


type TSideNav = {
    currentLabel: navigation_labels,
    setCurrentLabel: Dispatch<SetStateAction<navigation_labels>>
    amphie_data: IAmphieData
}

function SideNav({ currentLabel, setCurrentLabel, amphie_data }: TSideNav) {

    const router = useRouter()

    return (
        <motion.div
            className="side nav flex flex-col mt-3 w-1/6"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.8 }}
        >
            <div className="p-5 bg-white rounded-xl  shadow-xl">
                <p className="mb-1 text-">Menu</p>
                <div>
                    {navigation_items.map((item, index) => (
                        <div key={index} className="pl-5 mr-5 ml-2 cursor-pointer"
                            onClick={() => {
                                setCurrentLabel(item.label)
                            }}>
                            <p className={`mb-1 p-1  ${currentLabel === item.label && "bg-purple-500 rounded-r-xl text-white text-center"}`}>{item.label}</p>
                        </div>
                    ))}
                    <div className="pl-5 mr-5 cursor-pointer" onClick={() => router.push("/chart")}>
                        <p className="mb-1 " >Histrorique</p>
                    </div>
                </div>
            </div>

            <div className="mt-5 p-5 bg-white  rounded-xl shadow-xl">
                <div className="flex justify-between">
                    <div>
                        <p className='font-semibold'>Weather</p>
                        <p className="text-xl font-semibold pl-3 mt-2">{amphie_data.temperature ? `${amphie_data.temperature}°C` : '--:--'}</p>
                    </div>
                    <div>
                        <ThermometerSun />
                    </div>
                </div>
                <Progress className="mt-3 " value={amphie_data.temperature ? parseInt(amphie_data.temperature) : 0} size={"lg"} />
            </div>

            <div className="mt-5 p-5 bg-white  rounded-xl shadow-xl">
                <div className="flex justify-between">
                    <div>
                        <p className='font-semibold'>Humidity</p>
                        <p className="text-xl font-semibold pl-3 mt-2">{amphie_data.humidity ? `${amphie_data.humidity}%` : '--:--'}</p>
                    </div>
                    <div>
                        <Droplets />
                    </div>
                </div>
                <Progress className="mt-3 " value={amphie_data.humidity ? parseInt(amphie_data.humidity) : 0} color="orange" size={"lg"} />
            </div>

        </motion.div >
    )
}

export default SideNav