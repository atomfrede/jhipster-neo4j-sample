import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { NeoTestModule } from '../../../test.module';
import { ArtistUpdateComponent } from 'app/entities/artist/artist-update.component';
import { ArtistService } from 'app/entities/artist/artist.service';
import { Artist } from 'app/shared/model/artist.model';

describe('Component Tests', () => {
  describe('Artist Management Update Component', () => {
    let comp: ArtistUpdateComponent;
    let fixture: ComponentFixture<ArtistUpdateComponent>;
    let service: ArtistService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NeoTestModule],
        declarations: [ArtistUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ArtistUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ArtistUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ArtistService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Artist('123');
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Artist();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
