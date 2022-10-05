import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistaComponent } from './pages/artista/artista.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { HomeComponent } from './pages/home/home.component';
import { PrincipalComponent } from './pages/principal/principal.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      { path: "principal", component: PrincipalComponent },
      { path: "buscar", component: BuscarComponent },
      { path: "artista/:id", component: ArtistaComponent },
      { path: "**", redirectTo: "principal" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpotifyRoutingModule { }
