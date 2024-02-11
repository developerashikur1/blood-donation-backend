import mongoose, { mongo } from "mongoose";
import app from "./app";
import config from "./config";
import {Server} from 'http';

process.on('uncaughtException', error => {
    console.log(error);
    process.exit(1);
})

let server: Server;


async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("database connect successfully!.");
    
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
      console.log("database connect failed");
  }
  
  process.on('unhandledRejection', error => {
    if(server){
        server.close(() => {
            console.log(error)
            process.exit(1);
        })
    }else{
        process.exit(1);
    }
  })
}

main();

process.on('SIGTERM', () => {
    console.log('SIGTERM is recieved');
    if(server){
        server.close();
    }
})
