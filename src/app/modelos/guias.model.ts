//Clase de modelo

export class Guia {

  public _id?: String;
  public laboratorio_id?: String;
  public nombre?: String;
  public img?: String;
  public url?: String;


  constructor(id: String, laboratorio_id: String, nombre: String, img: String, url: String) {
    this._id = id;
    this.laboratorio_id = laboratorio_id;
    this.nombre = nombre;
    this.img = img;
    this.url = url;
  }

}
