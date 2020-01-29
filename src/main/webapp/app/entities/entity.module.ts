import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'artist',
        loadChildren: () => import('./artist/artist.module').then(m => m.NeoArtistModule)
      },
      {
        path: 'genre',
        loadChildren: () => import('./genre/genre.module').then(m => m.NeoGenreModule)
      },
      {
        path: 'track',
        loadChildren: () => import('./track/track.module').then(m => m.NeoTrackModule)
      },
      {
        path: 'album',
        loadChildren: () => import('./album/album.module').then(m => m.NeoAlbumModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class NeoEntityModule {}
