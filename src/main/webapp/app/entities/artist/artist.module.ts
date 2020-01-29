import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NeoSharedModule } from 'app/shared/shared.module';
import { ArtistComponent } from './artist.component';
import { ArtistDetailComponent } from './artist-detail.component';
import { ArtistUpdateComponent } from './artist-update.component';
import { ArtistDeleteDialogComponent } from './artist-delete-dialog.component';
import { artistRoute } from './artist.route';

@NgModule({
  imports: [NeoSharedModule, RouterModule.forChild(artistRoute)],
  declarations: [ArtistComponent, ArtistDetailComponent, ArtistUpdateComponent, ArtistDeleteDialogComponent],
  entryComponents: [ArtistDeleteDialogComponent]
})
export class NeoArtistModule {}
