import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITrack, Track } from 'app/shared/model/track.model';
import { TrackService } from './track.service';
import { IAlbum } from 'app/shared/model/album.model';
import { AlbumService } from 'app/entities/album/album.service';

@Component({
  selector: 'jhi-track-update',
  templateUrl: './track-update.component.html'
})
export class TrackUpdateComponent implements OnInit {
  isSaving = false;
  albums: IAlbum[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    album: []
  });

  constructor(
    protected trackService: TrackService,
    protected albumService: AlbumService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ track }) => {
      this.updateForm(track);

      this.albumService.query().subscribe((res: HttpResponse<IAlbum[]>) => (this.albums = res.body || []));
    });
  }

  updateForm(track: ITrack): void {
    this.editForm.patchValue({
      id: track.id,
      name: track.name,
      album: track.album
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const track = this.createFromForm();
    if (track.id !== undefined) {
      this.subscribeToSaveResponse(this.trackService.update(track));
    } else {
      this.subscribeToSaveResponse(this.trackService.create(track));
    }
  }

  private createFromForm(): ITrack {
    return {
      ...new Track(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      album: this.editForm.get(['album'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITrack>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IAlbum): any {
    return item.id;
  }
}
