import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IArtist } from 'app/shared/model/artist.model';
import { ArtistService } from './artist.service';
import { ArtistDeleteDialogComponent } from './artist-delete-dialog.component';

@Component({
  selector: 'jhi-artist',
  templateUrl: './artist.component.html'
})
export class ArtistComponent implements OnInit, OnDestroy {
  artists?: IArtist[];
  eventSubscriber?: Subscription;

  constructor(protected artistService: ArtistService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.artistService.query().subscribe((res: HttpResponse<IArtist[]>) => (this.artists = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInArtists();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IArtist): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInArtists(): void {
    this.eventSubscriber = this.eventManager.subscribe('artistListModification', () => this.loadAll());
  }

  delete(artist: IArtist): void {
    const modalRef = this.modalService.open(ArtistDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.artist = artist;
  }
}
