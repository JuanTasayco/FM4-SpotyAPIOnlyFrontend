import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SpotifyModule } from '../spotify/spotify.module';
import { SgvIconsComponent } from '../spotify/components/sgv-icons/sgv-icons.component';

@NgModule({
  declarations: [NavbarComponent, SgvIconsComponent],
  imports: [RouterModule, CommonModule],
  exports: [NavbarComponent],
})
export class SharedModule {}
