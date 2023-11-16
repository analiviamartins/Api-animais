import { v4 as uuidv4 } from "uuid";

export class animals{
    constructor(name, age, type, color, vacina, url){
        this.id= uuidv4();
        this.name= name;
        this.age= age;
        this.type= type;
        this.color= color;
        this.vacina= this.vacinas(vacina);
        this.url = url;
    }

    geradorId() {
       return uuidv4();
    }

    vacinas(vacina) {
        if(vacina === true){
            return "Vacinado";
        } else {
            return "Não Vacinado"
        }
    }
    url_valid(url){
        if(url.match(/\.(jpeg|jpg|gif|png)$/) !=null){
            return "imagem válida"
        }else{
            return "imagem inválida"
        }
    }
}
