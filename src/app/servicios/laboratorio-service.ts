//Clase de servicio que se conectara con la api rest uaelab

import { Laboratorio } from './../modelos/laboratorio.model';
import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LaboratorioService {

  constructor(private httpClient: HttpClient) { }

  laboratorios: Laboratorio[] = [];

  // Se usa para modificar el valor del arreglo debido a la llamada asincrona
  setLaboratorios(labs: Laboratorio[]) {
    this.laboratorios = labs;
  }

  //PATH de la seccion de laboratorios en la API
  urlBase = 'http://localhost:4000/api/laboratorios';

  //GET
  getLaboratorios() {
    return this.httpClient.get<Laboratorio[]>(this.urlBase);
  }

  getBuscarLaboratorio(contenido: string) {
    let url: string;
    url = this.urlBase + '/' + contenido;
    return this.httpClient.get<Laboratorio[]>(url);
  }


  getLaboratorioId(id: string): Observable<Laboratorio> {
    let url: string;
    url = this.urlBase + '/search/id/' + id;
    return this.httpClient.get<Laboratorio>(url);
  }


  //POST
  agregarLaboratorio(lab: Laboratorio) {
    return this.httpClient.post(this.urlBase, lab);
  }

  //PUT
  modificarLaboratorio(idLab: String, lab: Laboratorio) {
    let url: string;
    url = this.urlBase + '/' + idLab;
    return this.httpClient.put(url, lab);
  }

  //DELETE
  eliminarLaboratorio(idLab: String) {
    let url: string;
    url = this.urlBase + '/' + idLab;
    return this.httpClient.delete(url);
  }

}
