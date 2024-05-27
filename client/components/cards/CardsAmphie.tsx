import { ICard } from '@/utils/cards'
import { Plug, ThermometerSun } from 'lucide-react'

import { motion } from "framer-motion"
import { IAmphieData } from '@/types/socket_types'


const cards_items: ICard[] = [
    {
        title: "Temperature",
        value: 25,
        icon: <Plug />
    },
    {
        title: "Humidite",
        value: 25,
        icon: <ThermometerSun />
    },
    {
        title: "C02",
        value: 25,
        icon: <ThermometerSun />
    },

]

type TCardsAmphie = {
    amphie_data: IAmphieData
}

export default function CardsAmphie({ amphie_data }: TCardsAmphie) {

    const { temperature, humidity } = amphie_data
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
                        <p className="font-bold text-lg" >Temperature</p>
                        <p className="text-xl font-semibold pl-3 mt-2">{temperature ? temperature : '--:--'}</p>
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
                transition={{ ease: "easeInOut", duration: 0.6 }}
            >
                <div className="flex justify-between">
                    <div>
                        <p className="font-bold text-lg" >Humidty</p>
                        <p className="text-xl font-semibold pl-3 mt-2">{humidity ? humidity : '--:--'}</p>
                    </div>
                    <div>
                        <ThermometerSun />
                    </div>
                </div>
            </motion.div>




        </>
    )
}
