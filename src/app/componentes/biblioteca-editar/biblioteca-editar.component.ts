import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Biblioteca } from 'src/app/modelos/bilioteca.model';
import { BibliotecaService } from 'src/app/servicios/biblioteca-service';

@Component({
  selector: 'app-biblioteca-editar',
  templateUrl: './biblioteca-editar.component.html',
  styleUrls: ['./biblioteca-editar.component.css']
})
export class BibliotecaEditarComponent implements OnInit {

  biblio : Biblioteca = {
    nombre: '',
    categoria:'',
    anio:'',
    img:'',
    url:''
  }

  id : string;

  @ViewChild("bibliotecaForm")
  bibliotecaForm : NgForm;

  @ViewChild("botonCerrar")
  botonCerrar : ElementRef;


  constructor(private bibliotecaService : BibliotecaService,
              private flashMessages: FlashMessagesService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(){
    this.id = this.route.snapshot.params['_id'];
    this.bibliotecaService.getMaterialId(this.id)
      .subscribe( data => {
        this.biblio = data;
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
          this.bibliotecaService.modificarMaterialBiblio(this.id , value)
            .subscribe( () => {
              this.router.navigate(['/biblioteca']);
            }, error => {
          console.log(error);
        });
    }
  }


}
