import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IArtist } from 'app/shared/model/artist.model';
import { ArtistService } from './artist.service';

@Component({
  templateUrl: './artist-delete-dialog.component.html'
})
export class ArtistDeleteDialogComponent {
  artist?: IArtist;

  constructor(protected artistService: ArtistService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.artistService.delete(id).subscribe(() => {
      this.eventManager.broadcast('artistListModification');
      this.activeModal.close();
    });
  }
}
