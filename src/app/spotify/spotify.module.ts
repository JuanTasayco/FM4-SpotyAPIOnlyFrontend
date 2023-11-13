import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SpotifyRoutingModule } from './spotify-routing.module';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './pages/home/home.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { CardsComponent } from './components/cards/cards.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

import { ImgPipe } from './pipes/img.pipe';
import { ArtistaComponent } from './pages/artista/artista.component';
import { DomseguroPipe } from './pipes/domseguro.pipe';
import { CarrouselComponent } from './components/carrousel/carrousel.component';
import { MockupMobileComponent } from './components/mockup-mobile/mockup-mobile.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HomeComponent,
    PrincipalComponent,
    BuscarComponent,
    CardsComponent,
    ImgPipe,
    DomseguroPipe,
    SpinnerComponent,
    ArtistaComponent,
  ],
  imports: [
    SpotifyRoutingModule,
    SharedModule,
    FormsModule,
    CommonModule,
    CarrouselComponent,
    MockupMobileComponent,
    RouterModule,
  ],
})
export class SpotifyModule {}
