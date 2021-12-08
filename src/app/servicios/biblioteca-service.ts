//Clase de servicio para conectarse con la api rest uaelab

import { Biblioteca } from './../modelos/bilioteca.model';
import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BibliotecaService {

  constructor(private httpClient: HttpClient) { }

  biblioteca: Biblioteca[] = [];

  // Se usa para modificar el valor del arreglo debido a la llamada asincrona
  setBiblioteca(biblio: Biblioteca[]) {
    this.biblioteca = biblio;
  }

  //PATH de la seccion de biblioteca en la API
  urlBase = 'http://localhost:4000/api/biblioteca';

  //GET
  getMaterialBiblio() {
    return this.httpClient.get<Biblioteca[]>(this.urlBase);
  }

  getBuscarMaterial(contenido: string) {
    let url: string;
    url = this.urlBase + '/' + contenido;
    return this.httpClient.get<Biblioteca[]>(url);
  }


  getMaterialId(id: string): Observable<Biblioteca> {
    let url: string;
    url = this.urlBase + '/search/id/' + id;
    return this.httpClient.get<Biblioteca>(url);
  }

  //POST
  agregarMaterialBiblio(biblio: Biblioteca) {
    return this.httpClient.post(this.urlBase, biblio);
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
  modificarMaterialBiblio(idMaterial: String, biblio: Biblioteca) {
    let url: string;
    url = this.urlBase + '/' + idMaterial;
    return this.httpClient.put(url, biblio);
  }

  //DELETE
  eliminarMaterialBiblio(idMaterial: String) {
    let url: string;
    url = this.urlBase + '/' + idMaterial;
    return this.httpClient.delete(url);
  }

}
