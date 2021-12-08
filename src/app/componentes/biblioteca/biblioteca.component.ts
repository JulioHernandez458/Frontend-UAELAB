import { BibliotecaService } from './../../servicios/biblioteca-service';
import { Component, ElementRef, OnInit, ViewChild, NgModule } from '@angular/core';
import { Biblioteca } from 'src/app/modelos/bilioteca.model';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.css']
})
export class BibliotecaComponent implements OnInit {

  biblioteca : Biblioteca[] = [];

  biblio : Biblioteca = {
    nombre: '',
    categoria:'',
    anio:'',
    img:'',
    url:'',
  }

  contenido : string;

  filebiblioteca: File | null = null;

  @ViewChild("bibliotecaForm")
  bibliotecaForm : NgForm;

  @ViewChild("botonCerrar")
  botonCerrar : ElementRef;

  constructor(private bibliotecaService : BibliotecaService,
              private flashMessages: FlashMessagesService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void{
    this.bibliotecaService.getMaterialBiblio()
      .subscribe( (MaterialObtenido : Biblioteca[]) => {
          //cargamos los datos de los laboratorios obtenidos en el arreglo local
          this.biblioteca = MaterialObtenido;
          this.bibliotecaService.setBiblioteca(this.biblioteca);
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

      this.bibliotecaService.agregarMaterialDrive(this.filebiblioteca)
        .subscribe(data => {
          // do something, if upload success

          //Se agrega la url del archivo en drive y la imagem de referencia al objeto que se guardara en la BDD
          value.url = data.webViewLink;
          value.img = 'https://drive.google.com/uc?export=view&id=1aFQ6gguLL4U3Hb70QFpzEzZbGk6amdKw';

          //Agregar el nuevo material
          this.bibliotecaService.agregarMaterialBiblio(value)
            .subscribe( () => {
              this.bibliotecaForm.resetForm();
              this.cerrarModal();
              this.ngOnInit();
            });

        }, error => {
          console.log(error);
        });
    }
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
      this.router.navigate(['/biblioteca/buscar/' + value.contenido]);
    }
  }

  abrirDocumento(url : string){
    window.open(url,'_blank');
  }

  fileInputbiblioteca(event : any) {
    if (event.target.files.length > 0) {
      this.filebiblioteca = event.target.files[0];
    }
  }

  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }

}
