import { Router } from "express";
import rotasAnimals from "./animals.routes.js"

const rotas= Router();

rotas.use("/animals", rotasAnimals);

rotas.get("/", (req, res) => {
    return res.status(200).send({ message: "Servidor ok" });
  });

export default rotas;