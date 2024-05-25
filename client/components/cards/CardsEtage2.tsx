import { ICard } from '@/utils/cards'
import { Plug, ThermometerSun } from 'lucide-react'

import { motion } from "framer-motion"
import { IAllPMData } from '@/types/socket_types'


const cards_items: ICard[] = [
    {
        title: "Tension general",
        value: 25,
        icon: <Plug />
    },
    {
        title: "Courant",
        value: 25,
        icon: <ThermometerSun />
    },
    {
        title: "Puissance Active",
        value: 25,
        icon: <ThermometerSun />
    },
    {
        title: "Cos φ",
        value: 25,
        icon: <ThermometerSun />
    },
    {
        title: "Puissance apparente",
        value: 25,
        icon: <ThermometerSun />
    },
    {
        title: "Puissance reactive",
        value: 25,
        icon: <ThermometerSun />
    },
]

type TCartdStage2 = {
    stage2_data: IAllPMData
}
export default function CardsEtage2({ stage2_data }: TCartdStage2) {

    const { tension, current, puissance_active, puissance_apparente, puissance_reactive, energy } = stage2_data

    return (
        <>
            <motion.div
                className="mt-5 p-5 bg-white rounded-xl shadow-xl"
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: "easeInOut", duration: 0.5 }}
            >
                <div className="flex justify-between">
                    <div>
                        <p className="font-bold text-lg" >Tension</p>
                        <p className="text-xl font-semibold pl-3 mt-2">{tension ? tension : "--:--"}</p>
                    </div>
                    <div>
                        <ThermometerSun />
                    </div>
                </div>
            </motion.div>
            <motion.div
                className="mt-5 p-5 bg-white rounded-xl shadow-xl"
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: "easeInOut", duration: 0.5 }}
            >
                <div className="flex justify-between">
                    <div>
                        <p className="font-bold text-lg" >Current</p>
                        <p className="text-xl font-semibold pl-3 mt-2">{current ? current : "--:--"}</p>
                    </div>
                    <div>
                        <ThermometerSun />
                    </div>
                </div>
            </motion.div>
            <motion.div
                className="mt-5 p-5 bg-white rounded-xl shadow-xl"
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: "easeInOut", duration: 0.5 }}
            >
                <div className="flex justify-between">
                    <div>
                        <p className="font-bold text-lg" >Puissance active</p>
                        <p className="text-xl font-semibold pl-3 mt-2">{puissance_active ? puissance_active : "--:--"}</p>
                    </div>
                    <div>
                        <ThermometerSun />
                    </div>
                </div>
            </motion.div>
            <motion.div
                className="mt-5 p-5 bg-white rounded-xl shadow-xl"
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: "easeInOut", duration: 0.5 }}
            >
                <div className="flex justify-between">
                    <div>
                        <p className="font-bold text-lg" >Puissance reactive</p>
                        <p className="text-xl font-semibold pl-3 mt-2">{puissance_reactive ? puissance_reactive : "--:--"}</p>
                    </div>
                    <div>
                        <ThermometerSun />
                    </div>
                </div>
            </motion.div>
            <motion.div
                className="mt-5 p-5 bg-white rounded-xl shadow-xl"
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: "easeInOut", duration: 0.5 }}
            >
                <div className="flex justify-between">
                    <div>
                        <p className="font-bold text-lg" >Puissance apparente</p>
                        <p className="text-xl font-semibold pl-3 mt-2">{puissance_apparente ? puissance_apparente : "--:--"}</p>
                    </div>
                    <div>
                        <ThermometerSun />
                    </div>
                </div>
            </motion.div>

            <motion.div
                className="mt-5 p-5 bg-white rounded-xl shadow-xl"
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: "easeInOut", duration: 0.5 }}
            >
                <div className="flex justify-between">
                    <div>
                        <p className="font-bold text-lg" >Energy</p>
                        <p className="text-xl font-semibold pl-3 mt-2">{energy ? energy : "--:--"}</p>
                    </div>
                    <div>
                        <ThermometerSun />
                    </div>
                </div>
            </motion.div>
        </>
    )
}
