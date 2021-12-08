import { FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Guia } from 'src/app/modelos/guias.model';
import { GuiaService } from 'src/app/servicios/guias-service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-guia-editar',
  templateUrl: './guia-editar.component.html',
  styleUrls: ['./guia-editar.component.css']
})
export class GuiaEditarComponent implements OnInit {

  guia: Guia = {
    _id: '',
    nombre: ''
  }
  id: string;

  @ViewChild("guiaForm")
  guiaForm: NgForm;

  constructor(private guiaService: GuiaService,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['_id'];
    this.guiaService.getGuiaId(this.id)
      .subscribe(data => {
        this.guia = data;
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
      this.guiaService.modificarGuia(this.id, value)
        .subscribe(() => {
          this.regresar();
        }, error => {
          console.log(error);
        });
    }
  }

  regresar(){
    let lab = this.route.snapshot.params['lab'];
    this.router.navigate(['/guias/' + lab]);
  }

}
