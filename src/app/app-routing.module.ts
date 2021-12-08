import { GuiasComponent } from './componentes/guias/guias.component';
import { LaboratoriosComponent } from './componentes/laboratorios/laboratorios.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { BibliotecaComponent } from './componentes/biblioteca/biblioteca.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BibliotecaEditarComponent } from './componentes/biblioteca-editar/biblioteca-editar.component';
import { BibliotecaBuscarComponent } from './componentes/biblioteca-buscar/biblioteca-buscar.component';
import { LaboratoriosEditarComponent } from './componentes/laboratorios-editar/laboratorios-editar.component';
import { LaboratoriosBuscarComponent } from './componentes/laboratorios-buscar/laboratorios-buscar.component';
import { GuiaEditarComponent } from './componentes/guia-editar/guia-editar.component';
import { GuiasBuscarComponent } from './componentes/guias-buscar/guias-buscar.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'biblioteca', component: BibliotecaComponent },
  { path: 'biblioteca/editar/:_id', component: BibliotecaEditarComponent },
  { path: 'biblioteca/buscar/:contenido', component: BibliotecaBuscarComponent },
  { path: 'laboratorios', component: LaboratoriosComponent },
  { path: 'laboratorios/editar/:_id', component: LaboratoriosEditarComponent },
  { path: 'laboratorios/buscar/:contenido', component: LaboratoriosBuscarComponent },
  { path: 'guias/:lab', component: GuiasComponent },
  { path: 'guias/editar/:_id/laboratorio/:lab', component: GuiaEditarComponent },
  { path: 'guias/buscar/:contenido/laboratorio/:lab', component: GuiasBuscarComponent },
  { path: '**', redirectTo: 'inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
