import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IArtist, Artist } from 'app/shared/model/artist.model';
import { ArtistService } from './artist.service';

@Component({
  selector: 'jhi-artist-update',
  templateUrl: './artist-update.component.html'
})
export class ArtistUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]]
  });

  constructor(protected artistService: ArtistService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ artist }) => {
      this.updateForm(artist);
    });
  }

  updateForm(artist: IArtist): void {
    this.editForm.patchValue({
      id: artist.id,
      name: artist.name
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const artist = this.createFromForm();
    if (artist.id !== undefined) {
      this.subscribeToSaveResponse(this.artistService.update(artist));
    } else {
      this.subscribeToSaveResponse(this.artistService.create(artist));
    }
  }

  private createFromForm(): IArtist {
    return {
      ...new Artist(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IArtist>>): void {
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
}
