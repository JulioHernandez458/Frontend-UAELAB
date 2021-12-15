import { BibliotecaEditarComponent } from './componentes/biblioteca-editar/biblioteca-editar.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlashMessagesModule } from 'angular2-flash-messages';


import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { BibliotecaComponent } from './componentes/biblioteca/biblioteca.component';
import { LaboratoriosComponent } from './componentes/laboratorios/laboratorios.component';
import { GuiasComponent } from './componentes/guias/guias.component';
import { LaboratorioService } from 'src/app/servicios/laboratorio-service';
import { BibliotecaService } from './servicios/biblioteca-service';
import { GuiaService } from './servicios/guias-service';
import { BibliotecaBuscarComponent } from './componentes/biblioteca-buscar/biblioteca-buscar.component';
import { LaboratoriosEditarComponent } from './componentes/laboratorios-editar/laboratorios-editar.component';
import { LaboratoriosBuscarComponent } from './componentes/laboratorios-buscar/laboratorios-buscar.component';
import { GuiasBuscarComponent } from './componentes/guias-buscar/guias-buscar.component';
import { GuiaEditarComponent } from './componentes/guia-editar/guia-editar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InicioComponent,
    BibliotecaComponent,
    LaboratoriosComponent,
    GuiasComponent,
    BibliotecaEditarComponent,
    BibliotecaBuscarComponent,
    LaboratoriosEditarComponent,
    LaboratoriosBuscarComponent,
    GuiasBuscarComponent,
    GuiaEditarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [LaboratorioService, BibliotecaService, GuiaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
