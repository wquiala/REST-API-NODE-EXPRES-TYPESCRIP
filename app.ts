import dotenv from 'dotenv';
dotenv.config();
import { Server } from "./models/server";

const server = new Server();
server.Listen();




// import express from "express";
// const app = express();
// app.set("port", process.env.PORT || 5000);



// app.get('/', (req, res) => {
//     res.send("Hello world");
// })
// const port = app.get("port");


// const server = app.listen(port, () =>
//   console.log(`Server started on port $`)
// );
export default server;
