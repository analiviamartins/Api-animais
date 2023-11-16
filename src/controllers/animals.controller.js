import {animals} from "../models/animals/animals.js"
import { animalsList } from "../models/animals/animalsList.js"

const animalList = new animalsList();

export const buscarAllAnimals = (req, res) => {
    const animal = animalList.getAnimals();
    if (animal) {
      return res.status(200).send(
        {message: `o número de animais cadastrados é ${animalList.contador()}`,
        animal}
        );
    }
    return res.status(200).json({
         message: "Nenhum animal cadastrado"
        });
  };

export const buscarAnimalsId = (req, res) => {
    const { id } = req.params;
    const animal = animalList.getAnimalsById(id);
  
    if (!animal){
        return res.status(404).send({ message: "animal não encontrado!" });
    }
    return res.send(animal);
  };

export const criarAnimal = (req, res) =>{
    const {name, age, type, color, vacina, img}= req.body

    if(name.length < 3){
        return res.status(400).send({
            message: "o nome deve conter no mínimo 3 caracteres"
        })
    }
    if(name.length > 50){
        return res.status(400).send({
            message: "o nome deve conter no máximo 50 caracteres"
        })
    }
    if(age % 1 !== 0){
        return res.status(400).send({
            message: "Tem que ser número inteiro"
        })
    }
    if(age < 0){
        return res.status(400).send({
            message: "A idade deve ser maior que 0"
        })
    }
    if(type.length > 30){
        return res.status(400).send({
            message: "o nome deve conter no máximo 30 caracteres"
        })
    }
    if(color.length > 20){
        return res.status(400).send({
            message: "a cor deve conter no máximo 20 caracteres"
        })
    } 

    const animal = new animals(name, age, type, color, vacina, img);
    animalList.addAnimals(animal)

    if(age == 0){
        return res.status(400).send({
            message: "Seu animal acabou de nascer!"
        })
    }

    return res.status(201).send(animal)
}

export const editarAnimal = (req, res) => {
    const {id} = req.params
    const {name, age, type, color, vacina, img} = req.body

    const animal = animalList.getAnimalsById(id);

    if(!animal){
        return res.status(400).send({
            message: "Animal não encontrado",
            origem:"controller"
        })
     }
     animalList.updateAnimals(id, name, age, type, color, vacina, img);
     return res.status(200).send(animal)
}


export const deletarAnimal = (req, res) => {
    const {id} = req.params
    const animal = animalList.getAnimalsById(id);

    if( !animal){
        return res.status(400).send({
            message: "Animal não deletado",
            origem:"controller"
        })
     }
     animalList.deleteAnimals(id);

    return res.status(200).send(animal)
}

