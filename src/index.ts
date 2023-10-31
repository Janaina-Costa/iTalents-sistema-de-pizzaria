import express from "express";

import DBConnection from "database/db";

import routes from "./router/router";

const server = express();
server.use(express.json());
server.use("/", routes);

const PORT = 3006;
const HOST = "http://localhost:";
DBConnection();

server.listen(PORT, () => console.log(`Server is running on ${HOST}${PORT} `));
