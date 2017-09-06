import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { DrzugTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { StorageMysuffixDetailComponent } from '../../../../../../main/webapp/app/entities/storage/storage-mysuffix-detail.component';
import { StorageMysuffixService } from '../../../../../../main/webapp/app/entities/storage/storage-mysuffix.service';
import { StorageMysuffix } from '../../../../../../main/webapp/app/entities/storage/storage-mysuffix.model';

describe('Component Tests', () => {

    describe('StorageMysuffix Management Detail Component', () => {
        let comp: StorageMysuffixDetailComponent;
        let fixture: ComponentFixture<StorageMysuffixDetailComponent>;
        let service: StorageMysuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DrzugTestModule],
                declarations: [StorageMysuffixDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    StorageMysuffixService,
                    EventManager
                ]
            }).overrideTemplate(StorageMysuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StorageMysuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StorageMysuffixService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new StorageMysuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.storage).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
