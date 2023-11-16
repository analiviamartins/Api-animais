import { animals } from "../models/animals/animals.js"
import { animalsList } from "../models/animals/animalsList.js"

const animalList = new animalsList();

function url_valid(url) {
    if (url.match(/\.(jpeg|jpg|gif|png)$/) != null) {
        return "imagem válida"
    } else {
        return "imagem inválida"
    }
}

export const buscarAllAnimals = (req, res) => {
    let animals = animalList.getAnimals();
    const { type } = req.query

    if(type){
        animals = animalList.getAnimalsType(type);
        return res.status(200).send({
            tipo: animals.length, animals
        });
    }else{
        animals = animalList.getAnimals();
    }
    
    const animal = animalList.getAnimals();
    if (animal) {
        return res.status(200).send(
            {
                message: `o número de animais cadastrados é ${animalList.contador()}`,
                animal
            }
        );
    }
    return res.status(200).json({
        message: "Nenhum animal cadastrado"
    });
};

export const buscarAnimalsId = (req, res) => {
    const { id } = req.params;
    const animal = animalList.getAnimalsById(id);

    if (!animal) {
        return res.status(404).send({ message: "animal não encontrado!" });
    }
    return res.send(animal);
};

export const criarAnimal = (req, res) => {
    const { name, age, type, color, vacina, img } = req.body
    const animal = new animals(name, age, type, color, vacina, img);
    let error = "dados inválidos:"
    let contador = 0;

    if (name.length < 3 || name.length > 50) {
        error += " nome deve conter no mínimo 3 e no máximo 50 caracteres"
        contador++
    }

    if (age === "" || typeof(age) !== 'number' || age < 0 || Number.isInteger(age) === false) {
        error += " A idade está errada"
        contador++
    }
    if (type.length > 30 || type == "") {
        error += "O tipo deve ter menos de 30 linhas"
        contador++
    }
    if (color.length > 20 || color == "") {
        error += "A cor deve ter no mínino 20 caracteres"
        contador++
    }

    if (!url_valid(img)) {
        error += " A imagem deve ser um link valido"
        contador++
    }

    if (typeof vacina !== "boolean") {
        error += " O status vacil deve ser true ou false"
        contador++
    }

    if (contador == 0) {
        animalList.addAnimals(animal)
        res.status(201).send(animal)
    } else {
        res.status(400).send({ message: error, status: "Bad Request", contador })
    }

    if (age == 0) {
        return res.status(400).send({
            message: "Seu animal acabou de nascer!"
        })
    }

    return res.status(201).send(animal)
}

export const editarAnimal = (req, res) => {
    const { id } = req.params
    const { name, age, type, color, vacina, img } = req.body

    const animal = animalList.getAnimalsById(id);

    if (!animal) {
        return res.status(400).send({
            message: "Animal não encontrado",
            origem: "controller"
        })
    }
    animalList.updateAnimals(id, name, age, type, color, vacina, img);
    return res.status(200).send(animal)
}


export const deletarAnimal = (req, res) => {
    const { id } = req.params
    const animal = animalList.getAnimalsById(id);

    if (!animal) {
        return res.status(400).send({
            message: "Animal não encontrado",
            origem: "controller"
        })
    }
    animalList.deleteAnimals(id);

    return res.status(200).send(animal)
}

