//Clase de modelo

export class Biblioteca {

  public _id?: String;
  public nombre?: String;
  public categoria?: String;
  public anio?: String;
  public url?: String;
  public img?: String;


  constructor(id: String, nombre: String, categoria: String,
    anio: String, url: String, img: String) {
    this._id = id;
    this.nombre = nombre;
    this.categoria = categoria;
    this.anio = anio;
    this.url = url;
    this.img = img;
  }

}
