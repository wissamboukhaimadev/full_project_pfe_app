"use client"

import Header from "@/components/Header";
import SideNav from "@/components/SideNav";
import CardsAmphie from "@/components/cards/CardsAmphie";
import CardsEtage1 from "@/components/cards/CardsEtage1";
import CardsEtage2 from "@/components/cards/CardsEtage2";
import CardsEtage3 from "@/components/cards/CardsEtage3";
import CardsGeneral from "@/components/cards/CardsGeneral";
import DognutChart from "@/components/charts/DognutChart";
import { navigation_items, navigation_labels } from "@/utils/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import '@mantine/dates/styles.css';

import 'react-toastify/dist/ReactToastify.css';


import { IAllPMData, IAmphieData } from "@/types/socket_types";
import socket from "@/utils/socket";
import { IDataNotifications } from "@/types/notifications";




export default function Home() {

  const router = useRouter()

  const [disablAnimations, setDisabelAnimations] = useState<boolean>(false)

  const [currentLabel, setCurrentLabel] = useState<navigation_labels>("Dashboard")

  const [amphie_data, setAmphie_Data] = useState<IAmphieData>({})
  const [globalPM_data, setGlobalPM_Data] = useState<IAllPMData>({})
  const [stage1_data, setStage1_Data] = useState<IAllPMData>({})
  const [stage2_data, setStage2_Data] = useState<IAllPMData>({})
  const [stage3_data, setStage3_Data] = useState<IAllPMData>({})

  const [notification, setNotification] = useState<IDataNotifications>({
    notification: true,

  })


  useEffect(() => {

    socket.on("amphie_realtime", (data: IAmphieData) => {
      setAmphie_Data(data)
    })
    socket.on("global_realtime", (data: IAllPMData) => {
      setGlobalPM_Data(data)
    })
    socket.on("stage1_realtime", (data: IAllPMData) => {
      setStage1_Data(data)
    })
    socket.on("stage2_realtime", (data: IAllPMData) => {
      setStage2_Data(data)
    })
    socket.on("stage3_realtime", (data: IAllPMData) => {
      setStage3_Data(data)
    })

    // notifications
    socket.on("amphie_notification", (data: IDataNotifications) => {
      setNotification(data)
    })
    socket.on("ge_department_notification", (data: IDataNotifications) => {
      setNotification(data)
    })
    socket.on("gbi_department_notification", (data: IDataNotifications) => {
      setNotification(data)
    })
    socket.on("pfe_room_notification", (data: IDataNotifications) => {
      setNotification(data)
    })


    let state_interval: any


    if (!disablAnimations) {
      state_interval = setInterval(() => {

        setCurrentLabel(prevLabel => {
          const currentIndex = navigation_items.findIndex(item => item.label === prevLabel);
          const nextIndex = (currentIndex + 1) % navigation_items.length;
          return navigation_items[nextIndex].label;
        });

        localStorage.setItem("disableAnamtions", String(true))



        if (currentLabel == "Amphie") {
          router.push('/chart');
        }

      }, 2000);
    } else {
      localStorage.removeItem("disableAnamtions")
    }


    return () => {
      clearInterval(state_interval)
      socket.off("amphie_realtime")
      socket.off("global_realtime")
      socket.off("stage1_realtime")
      socket.off("stage2_realtime")
      socket.off("stage3_realtime")
      socket.off("amphie_notification")
      socket.off("ge_department_notification")
      socket.off("gbi_department_notification")
      socket.off("pfe_room_notification")

    };
  }, [router, currentLabel, disablAnimations])

  return (
    <div className="bg-pprimbg pt-5 px-5 flex-grow  ">


      <Header
        disablAnimations={disablAnimations}
        setDisabelAnimations={setDisabelAnimations}
        notification={notification}
        setNotification={setNotification}
      />

      <div className="flex">
        <SideNav
          currentLabel={currentLabel}
          setCurrentLabel={setCurrentLabel}
          amphie_data={amphie_data}
        />
        <div className="main p-5 flex-grow">
          <div className="flex justify-between  ">
            <div>
              <p className="text-3xl font-semibold">Values Overview</p>
            </div>

          </div>

          <div className="flex justify-between ">
            <div className="w-2/3 grid grid-cols-2 gap-4 mr-10 h-1/3">
              <SwitchCardsByLabel
                label={currentLabel}
                amphie_data={amphie_data}
                global_data={globalPM_data}
                stage1_data={stage1_data}
                stage2_data={stage2_data}
                stage3_data={stage3_data}
              />
            </div>

            <div className="flex-grow">
              <div className="mt-5 p-5 bg-white rounded-xl shadow-xl">
                <div className="flex justify-between">
                  <div>
                    <p className="font-bold text-lg">Consommation en Kwh</p>
                    <div className="mt-3">
                      <DognutChart />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type TSwitchCardsByLabel = {
  label: navigation_labels
  amphie_data: IAmphieData
  global_data: IAllPMData
  stage1_data: IAllPMData
  stage2_data: IAllPMData
  stage3_data: IAllPMData

}

function SwitchCardsByLabel({ label, amphie_data, global_data, stage1_data, stage2_data, stage3_data }: TSwitchCardsByLabel) {
  if (label === "Dashboard") {
    return <CardsGeneral global_data={global_data} />
  } else if (label === "GE_department") {
    return <CardsEtage1 stage1_data={stage1_data} />
  } else if (label === "Electrotechnique") {
    return <CardsEtage2 stage2_data={stage2_data} />
  } else if (label === "P & A & P") {
    return <CardsEtage3 stage3_data={stage3_data} />
  } else if (label === "Amphie") {
    return <CardsAmphie amphie_data={amphie_data} />
  } else {
    return null
  }
}