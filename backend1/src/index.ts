import { WebSocketServer } from "ws";
import { GameManager } from "./GameManager";

const wss = new WebSocketServer({ port: 8080 });

// var mysql = require("mysql");

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "yourusername",
//   password: "yourpassword",
// });

// con.connect((e:string) => {
//   if (e) throw e;
//   else console.log("Connected to database");
// });

const gameManager = new GameManager();
wss.on("connection", function connection(ws) {
  console.log("Player Connected");

  gameManager.addPlayer(ws);
  ws.on("disconnect", () => {
    console.log("Player disconnected");
    gameManager.removePlayer(ws);
  });
});
