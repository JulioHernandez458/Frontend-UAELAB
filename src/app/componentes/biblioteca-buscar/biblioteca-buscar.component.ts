import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Biblioteca } from 'src/app/modelos/bilioteca.model';
import { BibliotecaService } from 'src/app/servicios/biblioteca-service';

@Component({
  selector: 'app-biblioteca-buscar',
  templateUrl: './biblioteca-buscar.component.html',
  styleUrls: ['./biblioteca-buscar.component.css']
})
export class BibliotecaBuscarComponent implements OnInit {

  biblioteca : Biblioteca[] = [];
  texto: string;
  contenido: string;

  @ViewChild("buscarForm")
  buscarForm : NgForm;

  constructor(private bibliotecaService : BibliotecaService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void{
    this.texto = this.route.snapshot.params['contenido'];
    this.bibliotecaService.getBuscarMaterial(this.texto)
      .subscribe( (MaterialObtenido : Biblioteca[]) => {
        this.biblioteca = MaterialObtenido;
      });
  }

  eliminar(id : string){
    if(confirm('¿Seguro que desea eliminar el Material?')){
      this.bibliotecaService.eliminarMaterialBiblio(id)
      .subscribe( () => {
        this.router.navigate(['/biblioteca']);
        this.ngOnInit();
      });
    }
  }

  buscar({ value, valid }: NgForm) {
    if (valid) {
      this.bibliotecaService.getBuscarMaterial(value.contenido)
      .subscribe( (MaterialObtenido : Biblioteca[]) => {
        this.biblioteca = MaterialObtenido;
        this.buscarForm.resetForm();
      });

    }
  }

  abrirDocumento(url : string){
    window.open(url,'_blank');
  }

}
