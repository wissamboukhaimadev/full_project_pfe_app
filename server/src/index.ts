import express, { Request, Response } from "express"
import cors from "cors"
import router from "./routes/route"
import { app, httpServer, io } from "./server/socket"
import { Socket } from "socket.io"
import { chartFunction_Amphie } from "./controller/chart_data/chart_data_amphie"
import { IChartData, TEvent } from "./utils/types/chart_type"
import { chartFunction_Stage1 } from "./controller/chart_data/chart_data_stage1"
import { chartFunction_Stage2 } from "./controller/chart_data/chart_data_stage2"
import { chartFunction_Stage3 } from "./controller/chart_data/chart_data_stage3"



app.use(cors())
app.use(express.json())
app.use("/api/v1", router)

// http://127.0.0.1:4000/


app.get("/", (req: Request, res: Response) => {
  res.status(200).send("hello world")
})

io.on("connection", (socket: Socket) => {

  socket.on("amphie_chart_data", async (something: IChartData) => {
    something.currentDate = new Date(something.currentDate)
    const data = await chartFunction_Amphie(something)
    socket.emit("amphie_chart_data_update", data)

  })

  socket.on("stage1_chart_data", async (something: IChartData) => {
    something.currentDate = new Date(something.currentDate)
    const data = await chartFunction_Stage1(something)
    socket.emit("stage1_chart_data_update", data)

  })

  socket.on("stage2_chart_data", async (something: IChartData) => {
    something.currentDate = new Date(something.currentDate)
    const data = await chartFunction_Stage2(something)
    socket.emit("stage2_chart_data_update", data)

  })

  socket.on("stage3_chart_data", async (something: IChartData) => {
    something.currentDate = new Date(something.currentDate)
    const data = await chartFunction_Stage3(something)
    socket.emit("stage3_chart_data_update", data)

  })

  socket.on("global_chart_data", async (something: IChartData) => {
    something.currentDate = new Date(something.currentDate)
    const data = await chartFunction_Stage3(something)
    socket.emit("global_chart_data_update", data)

  })

})

const port = process.env.PORT;
httpServer.listen(port, () => {
  console.log(`app is listening on port ${port}`)
})