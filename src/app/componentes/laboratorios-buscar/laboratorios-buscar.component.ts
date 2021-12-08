import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Laboratorio } from 'src/app/modelos/laboratorio.model';
import { LaboratorioService } from 'src/app/servicios/laboratorio-service';

@Component({
  selector: 'app-laboratorios-buscar',
  templateUrl: './laboratorios-buscar.component.html',
  styleUrls: ['./laboratorios-buscar.component.css']
})
export class LaboratoriosBuscarComponent implements OnInit {

  laboratorios : Laboratorio[] = [];
  texto: string;
  contenido: string;

  @ViewChild("buscarForm")
  buscarForm : NgForm;

  constructor(private laboratorioService : LaboratorioService,
              private router: Router,
              private route: ActivatedRoute) { }



              ngOnInit(): void{
                this.texto = this.route.snapshot.params['contenido'];
                this.laboratorioService.getBuscarLaboratorio(this.texto)
                  .subscribe( (MaterialObtenido : Laboratorio[]) => {
                    this.laboratorios = MaterialObtenido;
                  });
              }

              eliminar(id : string){
                if(confirm('¿Seguro que desea eliminar el Material?')){
                  this.laboratorioService.eliminarLaboratorio(id)
                  .subscribe( () => {
                    this.router.navigate(['/laboratorios']);
                    this.ngOnInit();
                  });
                }
              }

              buscar({ value, valid }: NgForm) {
                if (valid) {
                  this.laboratorioService.getBuscarLaboratorio(value.contenido)
                  .subscribe( (MaterialObtenido : Laboratorio[]) => {
                    this.laboratorios = MaterialObtenido;
                    this.buscarForm.resetForm();
                  });

                }
              }

              abrirLaboratorio(labId : string){
                this.router.navigate(['/guias/' + labId]);
              }


}
