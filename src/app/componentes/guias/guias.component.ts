import { Laboratorio } from './../../modelos/laboratorio.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Guia } from 'src/app/modelos/guias.model';
import { GuiaService } from 'src/app/servicios/guias-service';

@Component({
  selector: 'app-guias',
  templateUrl: './guias.component.html',
  styleUrls: ['./guias.component.css']
})
export class GuiasComponent implements OnInit {

  guias : Guia[] = [];

  guia : Guia = {
    _id: '',
    laboratorio_id: '',
    nombre: '',
    img: '',
    url: ''
  }

  contenido : string;

  fileGuia: File | null = null;

  @ViewChild("guiaForm")
  guiaForm : NgForm;

  @ViewChild("botonCerrar")
  botonCerrar : ElementRef;

  constructor(private guiaService : GuiaService,
              private flashMessages: FlashMessagesService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void{
    let lab = this.route.snapshot.params['lab'];
    this.guiaService.getGuiasLabsId(lab)
      .subscribe( (MaterialObtenido : Guia[]) => {
        this.guias = MaterialObtenido;
      });
  }


  agregar({ value, valid }: NgForm) {
    if (!valid) {
      this.flashMessages.show('Por favor llenar el formulario correctamente', {
        cssClass: 'alert-danger', timeout: 4000
      });
    }
    else {

      this.guiaService.agregarMaterialDrive(this.fileGuia)
        .subscribe(data => {
          // do something, if upload success

          let lab = this.route.snapshot.params['lab'];
          //Se agrega la url del archivo en drive y la imagem de referencia al objeto que se guardara en la BDD
          value.url = data.webViewLink;
          value.img = 'https://drive.google.com/uc?export=view&id=1aFQ6gguLL4U3Hb70QFpzEzZbGk6amdKw';
          value.laboratorio_id = lab;
          //Agregar el nuevo material
          this.guiaService.agregarGuia(value)
            .subscribe( () => {
              this.guiaForm.resetForm();
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
      this.guiaService.eliminarGuia(id)
      .subscribe( () => {
        let lab = this.route.snapshot.params['lab'];
        this.router.navigate(['/guias/' + lab]);
        this.ngOnInit();
      });
    }
  }


  buscar({ value, valid }: NgForm) {
    if (valid) {
      let lab = this.route.snapshot.params['lab'];
      this.router.navigate(['/guias/buscar/' + value.contenido + '/laboratorio/' + lab]);
    }
  }

  abrirDocumento(url : string){
    window.open(url,'_blank');
  }

  fileInputGuia(event : any) {
    if (event.target.files.length > 0) {
      this.fileGuia = event.target.files[0];
    }
  }

  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }

}
