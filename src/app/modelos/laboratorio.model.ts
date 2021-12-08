//Clase de modelo

export class Laboratorio {

  public _id?: String;
  public nombre?: String;
  public asignatura?: String;
  public img?: String;


  constructor(id: String, nombre: String, asignatura: String, img: String) {
    this._id = id;
    this.nombre = nombre;
    this.asignatura = asignatura;
    this.img = img;
  }

}
