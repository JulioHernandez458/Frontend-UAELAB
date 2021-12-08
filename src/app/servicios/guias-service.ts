//Clase de servicio que se conectara con la api rest uaelab

import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Guia } from "../modelos/guias.model";
import { Observable } from "rxjs";

@Injectable()
export class GuiaService {

  constructor(private httpClient: HttpClient) { }

  guias: Guia[] = [];

  // Se usa para modificar el valor del arreglo debido a la llamada asincrona
  setGuias(guias: Guia[]) {
    this.guias = guias;
  }

  //PATH de la seccion de guias en la API
  urlBase = 'http://localhost:4000/api/guias';

  //GET
  getGuias() {
    return this.httpClient.get<Guia[]>(this.urlBase);
  }



  getBuscarGuias(contenido: string, lab: String) {
    let url: string;
    url = this.urlBase + '/' + contenido + '/laboratorio/' + lab;
    return this.httpClient.get<Guia[]>(url);
  }



  getGuiasLabsId(id: string): Observable<Guia[]> {
    let url: string;
    url = this.urlBase + '/search/id/' + id;
    return this.httpClient.get<Guia[]>(url);
  }

  getGuiaId(id: string): Observable<Guia> {
    let url: string;
    url = this.urlBase + '/id/' + id;
    return this.httpClient.get<Guia>(url);
  }



  //POST
  agregarGuia(guia: Guia) {
    return this.httpClient.post(this.urlBase, guia);
  }

  //POST DEL ARCHIVO
  agregarMaterialDrive(file: any): Observable<any> {
    let url = this.urlBase + '/files/add';
    const endpoint = url;
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.httpClient.post(endpoint, formData);
  }

  //PUT
  modificarGuia(idGuia: String, guia: Guia) {
    let url: string;
    url = this.urlBase + '/' + idGuia;
    return this.httpClient.put(url, guia);
  }

  //DELETE
  eliminarGuia(idGuia: String) {
    let url: string;
    url = this.urlBase + '/' + idGuia;
    return this.httpClient.delete(url);
  }

}
