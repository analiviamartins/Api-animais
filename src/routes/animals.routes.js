import { Router } from "express";
import {
    buscarAllAnimals,
    buscarAnimalsId,
    criarAnimal,
    editarAnimal,
    deletarAnimal,
} from "../controllers/animals.controller.js"

const rotasAnimals = Router();

rotasAnimals.get("/", buscarAllAnimals)
rotasAnimals.get("/:id", buscarAnimalsId)
rotasAnimals.post("/", criarAnimal)
rotasAnimals.put("/:id", editarAnimal)
rotasAnimals.delete("/:id", deletarAnimal)

export default rotasAnimals;