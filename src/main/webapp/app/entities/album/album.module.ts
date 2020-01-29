import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NeoSharedModule } from 'app/shared/shared.module';
import { AlbumComponent } from './album.component';
import { AlbumDetailComponent } from './album-detail.component';
import { AlbumUpdateComponent } from './album-update.component';
import { AlbumDeleteDialogComponent } from './album-delete-dialog.component';
import { albumRoute } from './album.route';

@NgModule({
  imports: [NeoSharedModule, RouterModule.forChild(albumRoute)],
  declarations: [AlbumComponent, AlbumDetailComponent, AlbumUpdateComponent, AlbumDeleteDialogComponent],
  entryComponents: [AlbumDeleteDialogComponent]
})
export class NeoAlbumModule {}
