import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Laboratorio } from 'src/app/modelos/laboratorio.model';
import { LaboratorioService } from 'src/app/servicios/laboratorio-service';

@Component({
  selector: 'app-laboratorios-editar',
  templateUrl: './laboratorios-editar.component.html',
  styleUrls: ['./laboratorios-editar.component.css']
})
export class LaboratoriosEditarComponent implements OnInit {

  laboratorio: Laboratorio = {
    _id: '',
    nombre: '',
    asignatura: '',
    img: ''
  }
  id: string;

  @ViewChild("bibliotecaForm")
  bibliotecaForm: NgForm;

  constructor(private laboratorioService: LaboratorioService,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['_id'];
    this.laboratorioService.getLaboratorioId(this.id)
      .subscribe(data => {
        this.laboratorio = data;
      });
  }

  guardar({ value, valid }: NgForm) {
    if (!valid) {
      this.flashMessages.show('Por favor llenar el formulario correctamente', {
        cssClass: 'alert-danger', timeout: 4000
      });
    }
    else {

      //Agregar el nuevo material
      this.laboratorioService.modificarLaboratorio(this.id, value)
        .subscribe(() => {
          this.router.navigate(['/laboratorios']);
        }, error => {
          console.log(error);
        });
    }
  }

}
