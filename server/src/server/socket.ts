import express, { Application } from "express"
import { createServer } from "http"
import { Server } from "socket.io"

export const app: Application = express()
export const httpServer = createServer(app)


export const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
})