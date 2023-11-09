import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'spotify',
    loadChildren: () =>
      import('./spotify/spotify.module').then((m) => m.SpotifyModule),
  },
  {
    path: '**',
    redirectTo: 'spotify',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
