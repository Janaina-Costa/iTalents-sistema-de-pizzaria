import express from "express";

import DBConnection from "database/db";

const server = express();
server.use(express.json());

const PORT = 3333;
const HOST = "http://localhost:";
DBConnection();

server.listen(PORT, () => console.log(`Server is running on ${HOST}${PORT} `));
