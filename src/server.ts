import "dotenv/config";
import express from "express";
import cors from "cors";
import { routes } from "./routes";

const server = express();

server.use(cors());
server.use(express.json());
server.use(routes);

const PORT = process.env.PORT || 8081;

server.listen(PORT, () => {
  console.log('Server is running');
});
