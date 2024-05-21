import express, { Request, Response } from "express"
import cors from "cors"
import router from "./routes/route"
import { app, httpServer, io } from "./server/socket"
import { Socket } from "socket.io"
import { chartFunction_Amphie } from "./controller/chart_data/chart_data_amphie"
import { IChartData } from "./utils/types/chart_type"
import { chartFunction_GEDepartment } from "./controller/chart_data/chart_data_ge_department"
import { chartFunction_GBIDepartment } from "./controller/chart_data/chart_data_gbi_department"
import { chartFunction_PfeRoom } from "./controller/chart_data/chart_data_pfe_room"
import { chartFunction_Global } from "./controller/chart_data/chart_data_global"



app.use(cors())
app.use(express.json())
app.use("/api/v1", router)

// http://127.0.0.1:4000/


app.get("/", (req: Request, res: Response) => {
  res.status(200).send("hello world")
})

io.on("connection", (socket: Socket) => {

  socket.on("amphie_chart_data", async (something: IChartData) => {
    something.startDate = new Date(something.startDate)
    something.endDate = new Date(something.endDate)
    const data = await chartFunction_Amphie(something)
    socket.emit("amphie_chart_data_update", data)

  })

  socket.on("geDepartment_chart_data", async (something: IChartData) => {
    something.startDate = new Date(something.startDate)
    something.endDate = new Date(something.endDate)
    const data = await chartFunction_GEDepartment(something)
    socket.emit("geDepartment_chart_data_update", data)

  })

  socket.on("gbiDepartment_chart_data", async (something: IChartData) => {
    something.startDate = new Date(something.startDate)
    something.endDate = new Date(something.endDate)
    const data = await chartFunction_GBIDepartment(something)
    socket.emit("gbiDepartment_chart_data_update", data)

  })

  socket.on("pfeRoom_chart_data", async (something: IChartData) => {
    something.startDate = new Date(something.startDate)
    something.endDate = new Date(something.endDate)
    const data = await chartFunction_PfeRoom(something)
    socket.emit("pfeRoom_chart_data_update", data)

  })

  socket.on("global_chart_data", async (something: IChartData) => {
    something.startDate = new Date(something.startDate)
    something.endDate = new Date(something.endDate)
    const data = await chartFunction_Global(something)
    socket.emit("global_chart_data_update", data)

  })

})

const port = process.env.PORT;
httpServer.listen(port, () => {
  console.log(`app is listening on port ${port}`)
})