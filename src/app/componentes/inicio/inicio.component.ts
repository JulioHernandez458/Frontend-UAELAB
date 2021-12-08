import { Component, OnInit } from '@angular/core';
import { Biblioteca } from 'src/app/modelos/bilioteca.model';
import { BibliotecaService } from 'src/app/servicios/biblioteca-service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  lista : Biblioteca[];

  biblioteca : Biblioteca[];

  constructor(private bibliotecaService : BibliotecaService) { }

  ngOnInit(): void{
    this.bibliotecaService.getMaterialBiblio()
      .subscribe( (MaterialObtenido : Biblioteca[]) => {
          //cargamos los datos de los laboratorios obtenidos en el arreglo local
          this.biblioteca = MaterialObtenido;
          this.lista = this.biblioteca.slice(this.biblioteca.length-3);
          this.bibliotecaService.setBiblioteca(this.biblioteca);
        }
      );
  }

  abrirDocumento(url : string){
    window.open(url,'_blank');
  }

}
