import { navigation_items, navigation_labels } from '@/utils/navigation'
import { Progress } from '@mantine/core'
import { Droplets, ThermometerSun } from 'lucide-react'
import { motion } from "framer-motion"
import { IAmphieData } from '@/types/socket_types'


interface SideNavChartProps {
    amphie_data: IAmphieData,
}


function SideNavChart({ amphie_data }: SideNavChartProps) {

    const { temperature, humidity } = amphie_data

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
                        <p className="text-xl font-semibold pl-3 mt-2">{temperature ? `${temperature}°C` : '--:--'}</p>
                    </div>
                    <div>
                        <ThermometerSun />
                    </div>
                </div>
                <Progress className="mt-3 " value={temperature ? parseInt(temperature) : 0} size={"lg"} />
            </div>

            <div className="mt-5 p-5 bg-white  rounded-xl shadow-xl">
                <div className="flex justify-between">
                    <div>
                        <p>Humidity</p>
                        <p className="text-xl font-semibold pl-3 mt-2">{humidity ? `${humidity}%` : '--:--'}</p>
                    </div>
                    <div>
                        <Droplets />
                    </div>
                </div>
                <Progress className="mt-3 " value={humidity ? parseInt(humidity) : 0} color="orange" size={"lg"} />
            </div>

        </motion.div >
    )
}

export default SideNavChart