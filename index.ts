import express, { Application } from "express";

const app:Application = express();

const port:number = 3011

const Server = app.listen(port,()=>{
    console.log("Server listening on port")
})

process.on("uncaughtException",(error:any)=>{
    console.log("uncaughtException",error)
    process.exit(1)
})

process.on("unhandledRejection",(reason:any)=>{
    console.log("unhandledRejection",reason)
    Server.close(()=>{
        process.exit(1)
    })
})