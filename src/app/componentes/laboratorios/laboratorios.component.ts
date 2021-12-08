import { Laboratorio } from './../../modelos/laboratorio.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LaboratorioService } from 'src/app/servicios/laboratorio-service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-laboratorios',
  templateUrl: './laboratorios.component.html',
  styleUrls: ['./laboratorios.component.css']
})
export class LaboratoriosComponent implements OnInit {

  laboratorios : Laboratorio[] = [];

  laboratorio : Laboratorio = {
    _id: '',
    nombre: '',
    asignatura: '',
    img: ''
  }

  contenido : string;

  @ViewChild("laboratorioForm")
  laboratorioForm : NgForm;

  @ViewChild("botonCerrar")
  botonCerrar : ElementRef;



  constructor(private laboratorioService : LaboratorioService,
              private flashMessages: FlashMessagesService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void{
    this.laboratorioService.getLaboratorios()
      .subscribe( (laboratoriosObtenidos : Laboratorio[]) => {
          //cargamos los datos de los laboratorios obtenidos en el arreglo local
          this.laboratorios = laboratoriosObtenidos;
          this.laboratorioService.setLaboratorios(this.laboratorios);
        }
      );
  }


  agregar({ value, valid }: NgForm) {
    if (!valid) {
      this.flashMessages.show('Por favor llenar el formulario correctamente', {
        cssClass: 'alert-danger', timeout: 4000
      });
    }
    else {
          value.img = 'https://drive.google.com/uc?export=view&id=1aFQ6gguLL4U3Hb70QFpzEzZbGk6amdKw';

          //Agregar el nuevo material
          this.laboratorioService.agregarLaboratorio(value)
            .subscribe( () => {
              this.laboratorioForm.resetForm();
              this.cerrarModal();
              this.ngOnInit();
            });
          }
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
      this.router.navigate(['/laboratorios/buscar/' + value.contenido]);
    }
  }

  abrirLaboratorio(idLab : string){
    this.router.navigate(['/guias/' + idLab]);
  }


  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }



}
