import { Indicator, Switch, Tooltip } from '@mantine/core'
import { BellRing, HandCoins } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useState } from 'react'
import NotificationDrawer from './NotificationDrawer'
import { useDisclosure } from '@mantine/hooks'
import ExportDownloadFile from './ExportDownloadFile'
import Image from 'next/image'


interface IHeaderProps {
    disablAnimations: boolean
    setDisabelAnimations: Dispatch<SetStateAction<boolean>>
}

export default function Header({ disablAnimations, setDisabelAnimations }: IHeaderProps) {

    const [opened, { open, close }] = useDisclosure(false)



    const router = useRouter()
    return (
        <div className="flex justify-between pl-10 pr-5 bg-white  rounded-xl shadow-lg ">
            <NotificationDrawer opened={opened} close={close} />
            <Image
                onClick={() => router.push('/')}
                src="/logo.png"
                className='cursor-pointer'
                alt="logo"
                width={100}
                height={40}
            ></Image>
            <div className="flex p-6 mt-1">
                <Indicator disabled={false} size={15} label="New">
                    <BellRing
                        className="ml-10 cursor-pointer"
                        size={28}
                        onClick={open}
                    />
                </Indicator>

                <ExportDownloadFile />

                <HandCoins className="ml-7 mr-5 cursor-pointer" size={28} />
                {/* <ConsumptionIcon /> */}

                <Tooltip label="Turn ON/OFF animations" refProp="rootRef">
                    <Switch
                        size="lg"
                        onLabel="ON"
                        offLabel="OFF"
                        checked={disablAnimations}
                        onChange={(event) =>
                            setDisabelAnimations(event.currentTarget.checked)
                        }
                    />
                </Tooltip>
            </div>
        </div>
    );
}
