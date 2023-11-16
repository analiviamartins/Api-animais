export class animalsList{
    constructor() {
      this.animals = [];
    }
  
    getAnimals() {
      return this.animals;
    }

    contador(){
      return this.animals.length
    }

    getAnimalsType(type){
      return this.animals.filter((animal) => animal.type.toLowerCase() === type.toLowerCase() )
    }
  
    getAnimalsById(id) {
      return this.animals.find((animal) => animal.id === id);
    }
  
    addAnimals(animal) {
      this.animals.push(animal);
    }
  
    updateAnimals(id, name, age, type, color, vacina, img) {
      const animal = this.getAnimalsById(id);
  
      if (!animal) {
        return null;
      }

        animal.name = name;
        animal.age = age;
        animal.type = type;
        animal.color = color;
        animal.vacina = vacina;
        animal.img = img;
      
  
      return animal;
    }
  
    deleteAnimals(id) {
      this.animals = this.animals.filter((animal) => animal.id !== id);
    }
  }