import { NgForm } from '@angular/forms';
import { Guia } from 'src/app/modelos/guias.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GuiaService } from 'src/app/servicios/guias-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-guias-buscar',
  templateUrl: './guias-buscar.component.html',
  styleUrls: ['./guias-buscar.component.css']
})
export class GuiasBuscarComponent implements OnInit {

  guia : Guia[] = [];
  texto: string;
  contenido: string;

  @ViewChild("buscarForm")
  buscarForm : NgForm;

  constructor(private guiaService : GuiaService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void{
    this.texto = this.route.snapshot.params['contenido'];
    let lab = this.route.snapshot.params['lab'];
    this.guiaService.getBuscarGuias(this.texto, lab)
      .subscribe( (MaterialObtenido : Guia[]) => {
        this.guia = MaterialObtenido;
      });
  }

  eliminar(id : string){
    if(confirm('¿Seguro que desea eliminar el Material?')){
      this.guiaService.eliminarGuia(id)
      .subscribe( () => {
        this.regresar();
        this.ngOnInit();
      });
    }
  }

  buscar({ value, valid }: NgForm) {
    if (valid) {
      let lab = this.route.snapshot.params['lab'];
      this.guiaService.getBuscarGuias(value.contenido, lab)
      .subscribe( (MaterialObtenido : Guia[]) => {
        this.guia = MaterialObtenido;
        this.buscarForm.resetForm();
      });

    }
  }

  regresar(){
    let lab = this.route.snapshot.params['lab'];
    this.router.navigate(['/guias/' + lab]);
  }

  abrirDocumento(url : string){
    window.open(url,'_blank');
  }

}
